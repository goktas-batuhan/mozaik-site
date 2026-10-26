import { Search, X } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import { CATEGORIES, categoryLabel, inCategoryOrder, stats } from '@/site/data'
import { useTitle } from '@/site/meta'
import { MiniPreview } from '@/site/preview'
import { LayerBadge, StatusBadge } from '@/site/ui'

const LAYERS = [
  { id: '', label: 'All' },
  { id: 'A', label: 'Original' },
  { id: 'B', label: 'Adapted' },
]

export function Gallery() {
  useTitle('Components')
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const layer = params.get('layer') ?? ''
  const q = params.get('q') ?? ''

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return inCategoryOrder.filter(
      (c) =>
        (!category || c.category === category) &&
        (!layer || c.layer === layer) &&
        (!needle || [c.name, c.title, c.description, ...c.tags].some((s) => s.toLowerCase().includes(needle))),
    )
  }, [category, layer, q])

  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
      <header className="max-w-2xl space-y-4">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">Gallery</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Components</h1>
        <p className="text-lg text-muted-foreground">
          {stats.total} components across {CATEGORIES.length} categories. {stats.original} are original, {stats.adapted}{' '}
          are rebuilt from MIT-licensed projects and credited.
        </p>
      </header>

      <div className="sticky top-16 z-30 -mx-4 mt-10 border-b bg-background/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => set('q', e.target.value)}
              placeholder="Search components"
              aria-label="Search components"
              className="h-10 w-full rounded-full border bg-card pr-9 pl-10 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => set('q', '')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-accent"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div role="group" aria-label="Category" className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] [mask-image:linear-gradient(90deg,black_92%,transparent)]">
            <Chip active={!category} onClick={() => set('category', '')}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.id} active={category === c.id} onClick={() => set('category', category === c.id ? '' : c.id)}>
                {c.label}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Layer" className="flex shrink-0 gap-1 self-start rounded-full border p-1">
            {LAYERS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={layer === l.id}
                onClick={() => set('layer', l.id)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  layer === l.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} components shown
      </p>

      {results.length === 0 ? (
        <div className="py-32 text-center text-muted-foreground">
          <p>No component matches “{q}”.</p>
          <button type="button" className="mt-3 text-sm text-foreground underline underline-offset-4" onClick={() => setParams({})}>
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((c) => (
            <li key={c.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/20">
                <MiniPreview name={c.name} className="border-b" />
                <div className="relative flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-medium">
                      <Link to={`/components/${c.name}`} className="after:absolute after:inset-0">
                        {c.title}
                      </Link>
                    </h2>
                    <span className="font-mono text-[11px] text-muted-foreground uppercase">{categoryLabel(c.category)}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-auto flex gap-1.5 pt-3">
                    <LayerBadge layer={c.layer} />
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
        active ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
