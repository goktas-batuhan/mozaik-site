import { CornerDownLeft, Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '@/lib/utils'
import { withBase } from './data'
import { buttonStyles } from './ui'

interface Hit {
  kind: 'component' | 'block' | 'variant' | 'group' | 'shelf'
  name: string
  variant?: string
  title: string
  group: string
  shelf?: string
  text: string
}

const KIND_LABEL: Record<Hit['kind'], string> = {
  component: 'Component',
  block: 'Block',
  variant: 'Variant',
  group: 'Group',
  shelf: 'Shelf',
}

// Dizin (public/search-index.json; öğeler, varyantlar, gruplar, raflar) ilk açılışta bir kez gelir.
let index: Promise<Hit[]> | undefined
const loadIndex = () =>
  (index ??= fetch(withBase('/search-index.json'))
    .then((r) => r.json() as Promise<Hit[]>)
    .catch(() => {
      index = undefined
      return []
    }))

/** Küçük bulanık arama: her kelime başlıkta, adda ya da metinde geçmeli; başlık eşleşmesi önde. */
function rank(hits: Hit[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const scored: { hit: Hit; score: number }[] = []
  for (const hit of hits) {
    const title = hit.title.toLowerCase()
    const name = hit.name.toLowerCase()
    const text = hit.text.toLowerCase()
    let score = 0
    for (const w of words) {
      if (title.startsWith(w)) score += 6
      else if (title.includes(w)) score += 4
      else if (name.includes(w)) score += 3
      else if (text.includes(w)) score += 1
      else if (subsequence(w, title)) score += 0.5
      else {
        score = -1
        break
      }
    }
    if (score > 0) scored.push({ hit, score: score + (hit.kind === 'group' ? 1 : 0) - (hit.kind === 'variant' ? 0.5 : 0) })
  }
  return scored.sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title)).slice(0, 20).map((s) => s.hit)
}

const subsequence = (needle: string, hay: string) => {
  let i = 0
  for (const c of hay) if (c === needle[i]) i++
  return i === needle.length
}

const hrefOf = (hit: Hit) =>
  hit.kind === 'group' || hit.kind === 'shelf'
    ? hit.name
    : `/${hit.kind === 'block' ? 'blocks' : 'components'}/${hit.name}${hit.variant ? `?v=${hit.variant}` : ''}`

/** Başlıktaki arama düğmesi + ⌘K / Ctrl+K / "/" ile açılan arama penceresi. */
export function SearchButton() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={() => void loadIndex()}
        className={cn(buttonStyles.ghost, 'gap-2 border bg-card/60 pr-2 pl-3')}
        aria-label="Search components"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search className="size-4" aria-hidden />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [hits, setHits] = useState<Hit[]>([])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const id = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let alive = true
    loadIndex().then((items) => alive && setHits(items))
    const d = dialog.current
    const restore = document.activeElement as HTMLElement | null
    d?.showModal()
    return () => {
      alive = false
      restore?.focus()
    }
  }, [])

  const results = useMemo(() => rank(hits, query), [hits, query])
  useEffect(() => setActive(0), [query])
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (hit: Hit) => {
    onClose()
    navigate(hrefOf(hit))
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Search"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border bg-background p-0 text-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b px-4">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          autoFocus
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-list`}
          aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
          aria-autocomplete="list"
          aria-label="Search components, variants, blocks and groups"
          placeholder="Search components, variants, blocks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, 0))
            } else if (e.key === 'Enter' && results[active]) {
              e.preventDefault()
              go(results[active])
            }
          }}
          className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
        <kbd className="rounded border px-1.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
      </div>
      <ul ref={list} id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[50vh] overflow-y-auto p-2">
        {query && results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”.</li>}
        {!query && <li className="px-3 py-8 text-center text-sm text-muted-foreground">Type a name, a tag like “hover” or “web3”, or a group.</li>}
        {results.map((hit, i) => (
          <li
            key={`${hit.kind}-${hit.name}-${hit.variant ?? ''}`}
            id={`${id}-${i}`}
            role="option"
            aria-selected={i === active}
            onPointerMove={() => setActive(i)}
            onClick={() => go(hit)}
            className={cn('flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm', i === active && 'bg-accent')}
          >
            <span className="min-w-0 flex-1 truncate">{hit.title}</span>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground uppercase">{KIND_LABEL[hit.kind]}</span>
            {i === active && <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />}
          </li>
        ))}
      </ul>
    </dialog>
  )
}
