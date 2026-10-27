import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import {
  components,
  findGroup,
  itemPath,
  itemsIn,
  sectionOf,
  shelfLabel,
  taxonomy,
  tree,
  type ComponentEntry,
  type Section,
} from '@/site/catalog'
import { countLine, stats } from '@/site/data'
import { useTitle } from '@/site/meta'
import { CardPreview } from '@/site/preview'
import { StatusBadge } from '@/site/ui'
import { NotFound } from './NotFound'

const PAGE_SIZE = 24
const AXES = ['trigger', 'tech', 'weight', 'theme'] as const

/** Karttaki bir satır: component, blok ya da bir component'in varyantı. */
interface Card {
  key: string
  demo: string
  to: string
  title: string
  description: string
  entry: ComponentEntry
  status: ComponentEntry['status']
}

const count = (items: ComponentEntry[]) => ({
  components: items.filter((c) => c.layer === 'component').length,
  blocks: items.filter((c) => c.layer === 'block').length,
  variants: items.reduce((n, c) => n + c.variants.length, 0),
})

export function Gallery({ section }: { section: Section }) {
  const params = useParams()
  const group = params.group ?? params.slug
  const shelf = params.shelf
  const groupInfo = group ? findGroup(section, group) : undefined
  const [urlParams, setSearch] = useSearchParams()
  // Prerender HTML'i sorgusuz üretilir; sorgu hydrate'ten sonra okunur, yoksa React #418 verir.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const search = mounted ? urlParams : new URLSearchParams()
  const q = search.get('q') ?? ''
  const tags = (search.get('tags') ?? '').split(',').filter(Boolean)
  const sort = search.get('sort') === 'new' ? 'new' : 'az'
  const showVariants = search.get('show') === 'variants'
  const page = Math.max(1, Number(search.get('page')) || 1)

  const label = section === 'blocks' ? 'Blocks' : 'Components'
  const title = groupInfo ? (shelf ? shelfLabel(section, groupInfo.id, shelf) : groupInfo.label) : label
  useTitle(groupInfo ? `${title} · ${label}` : label, groupInfo?.blurb)

  const scope = useMemo(() => itemsIn(section, group, shelf), [section, group, shelf])
  const groups = tree(section)
  const shelves = groups.find((g) => g.id === group)?.shelves ?? []

  const set = (next: Record<string, string>) => {
    const p = new URLSearchParams(search)
    for (const [k, v] of Object.entries(next)) {
      if (v) p.set(k, v)
      else p.delete(k)
    }
    if (!('page' in next)) p.delete('page')
    setSearch(p, { replace: true, preventScrollReset: true })
  }

  const cards = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const items = scope.filter(
      (c) =>
        tags.every((t) => c.tags.includes(t)) &&
        (!needle || [c.name, c.title, c.description, ...c.tags, ...c.keywords].some((s) => s.toLowerCase().includes(needle))),
    )
    const sorted =
      sort === 'new'
        ? [...items].sort((a, b) => b.added.localeCompare(a.added) || a.title.localeCompare(b.title))
        : [...items].sort((a, b) => a.title.localeCompare(b.title))
    return sorted.flatMap<Card>((c) =>
      showVariants
        ? c.variants.map((v) => ({
            key: `${c.name}~${v.name}`,
            demo: `${c.name}~${v.name}`,
            to: `${itemPath(c)}?v=${v.name}`,
            title: `${c.title} · ${v.title}`,
            description: v.description,
            entry: c,
            status: v.status,
          }))
        : [{ key: c.name, demo: c.name, to: itemPath(c), title: c.title, description: c.description, entry: c, status: c.status }],
    )
    // tags dizisi her render'da yeni; içeriği anahtar olarak kullanılır
  }, [scope, q, tags.join(','), sort, showVariants])

  if (group && (!groupInfo || (shelf && !groupInfo.shelves.some((s) => s.id === shelf)))) return <NotFound />

  const pages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = cards.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const tagOptions = AXES.map((axis) => ({
    axis,
    values: taxonomy.tags[axis].filter((t) => scope.some((c) => c.tags.includes(t))),
  })).filter((a) => a.values.length > 0)
  const base = `/${section}`
  const all = section === 'components' ? components.filter((c) => sectionOf(c.layer) === 'components') : scope
  const counts = groupInfo ? count(scope) : { components: stats.components, variants: stats.variants, blocks: stats.blocks }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
      <header className="max-w-2xl space-y-4">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase">
          <Link to={base} className="hover:text-foreground">
            {label}
          </Link>
          {groupInfo && shelf && (
            <>
              <span aria-hidden>/</span>
              <Link to={`${base}/${groupInfo.id}`} className="hover:text-foreground">
                {groupInfo.label}
              </Link>
            </>
          )}
        </nav>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="text-lg text-muted-foreground">{groupInfo?.blurb ?? 'Animated React components, their variants and ready-made blocks.'}</p>
        <p className="font-mono text-sm text-muted-foreground tabular-nums">{countLine(counts)}</p>
      </header>

      <nav aria-label={`${label} groups`} className="mt-8 flex flex-wrap gap-1.5">
        <ChipLink to={base} active={!group}>
          All
        </ChipLink>
        {groups.map((g) => (
          <ChipLink key={g.id} to={`${base}/${g.id}`} active={g.id === group}>
            {g.label}
            <span className="ml-1.5 font-mono text-[11px] tabular-nums">{g.count}</span>
          </ChipLink>
        ))}
        <ChipLink to={section === 'components' ? '/blocks' : '/components'} active={false} className="border-dashed">
          {section === 'components' ? 'Blocks' : 'Components'}
        </ChipLink>
      </nav>
      {groupInfo && shelves.length > 1 && (
        <nav aria-label={`${groupInfo.label} shelves`} className="mt-3 flex flex-wrap gap-1.5">
          <ChipLink to={`${base}/${groupInfo.id}`} active={!shelf} size="sm">
            All {groupInfo.label.toLowerCase()}
          </ChipLink>
          {shelves.map((s) => (
            <ChipLink key={s.id} to={`${base}/${groupInfo.id}/${s.id}`} active={s.id === shelf} size="sm">
              {s.label}
            </ChipLink>
          ))}
        </nav>
      )}

      <div className="sticky top-16 z-30 -mx-4 mt-8 border-b bg-background/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder={`Filter ${title.toLowerCase()}`}
              aria-label={`Filter ${title.toLowerCase()}`}
              className="h-10 w-full rounded-full border bg-card pr-9 pl-10 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => set({ q: '' })}
                aria-label="Clear filter"
                className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-accent"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            {stats.variants > 0 && section === 'components' && (
              <Toggle
                label="Show"
                value={showVariants ? 'variants' : ''}
                options={[
                  { id: '', label: 'Components' },
                  { id: 'variants', label: 'Variants' },
                ]}
                onChange={(v) => set({ show: v })}
              />
            )}
            <Toggle
              label="Sort"
              value={sort === 'new' ? 'new' : ''}
              options={[
                { id: '', label: 'A-Z' },
                { id: 'new', label: 'Newest' },
              ]}
              onChange={(v) => set({ sort: v })}
            />
          </div>
        </div>
        {tagOptions.length > 0 && (
          <div role="group" aria-label="Tags" className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {tagOptions.map(({ axis, values }) => (
              <span key={axis} className="flex shrink-0 items-center gap-1.5">
                <span className="pl-1 font-mono text-[11px] text-muted-foreground uppercase">{axis}</span>
                {values.map((t) => {
                  const on = tags.includes(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set({ tags: (on ? tags.filter((x) => x !== t) : [...tags, t]).join(',') })}
                      className={cn(
                        'shrink-0 rounded-full border px-2.5 py-0.5 text-xs transition-colors',
                        on ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {t}
                    </button>
                  )
                })}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {cards.length} results
      </p>

      {cards.length === 0 ? (
        <div className="py-32 text-center text-muted-foreground">
          <p>Nothing matches these filters.</p>
          <button type="button" className="mt-3 text-sm text-foreground underline underline-offset-4" onClick={() => setSearch({})}>
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((c, i) => (
            <li key={c.key}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/20">
                <CardPreview demo={c.demo} label={c.title} priority={i === 0} className="border-b" />
                <div className="relative flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-medium">
                      <Link to={c.to} className="after:absolute after:inset-0">
                        {c.title}
                      </Link>
                    </h2>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground uppercase">
                      {shelfLabel(sectionOf(c.entry.layer), c.entry.group, c.entry.shelf)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <StatusBadge status={c.status} />
                    {!showVariants && c.entry.variants.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {c.entry.variants.length} variant{c.entry.variants.length === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-10 flex items-center justify-center gap-1">
          <PageLink page={current - 1} disabled={current === 1} set={set} label="Previous page">
            <ChevronLeft className="size-4" aria-hidden />
          </PageLink>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <PageLink key={n} page={n} current={n === current} set={set} label={`Page ${n}`}>
              {n}
            </PageLink>
          ))}
          <PageLink page={current + 1} disabled={current === pages} set={set} label="Next page">
            <ChevronRight className="size-4" aria-hidden />
          </PageLink>
        </nav>
      )}
      {/* Tüm öğeler arama motorları ve JS'siz okurlar için: sayfalanmış ızgara yalnız 24 tane gösteriyor. */}
      {!group && all.length > PAGE_SIZE && (
        <details className="mt-12 text-sm text-muted-foreground">
          <summary className="cursor-pointer">All {all.length} {label.toLowerCase()} by name</summary>
          <ul className="mt-3 columns-2 gap-6 sm:columns-3 lg:columns-4">
            {[...all].sort((a, b) => a.title.localeCompare(b.title)).map((c) => (
              <li key={c.name}>
                <Link to={itemPath(c)} className="hover:text-foreground">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

function ChipLink({
  to,
  active,
  size = 'md',
  className,
  children,
}: {
  to: string
  active: boolean
  size?: 'sm' | 'md'
  className?: string
  children: ReactNode
}) {
  return (
    <Link
      to={to}
      preventScrollReset
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border transition-colors',
        size === 'md' ? 'px-3.5 py-1.5 text-sm' : 'px-3 py-1 text-xs',
        active ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {children}
    </Link>
  )
}

function Toggle({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { id: string; label: string }[]
  onChange: (id: string) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex shrink-0 gap-1 rounded-full border p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            value === o.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function PageLink({
  page,
  current = false,
  disabled = false,
  label,
  set,
  children,
}: {
  page: number
  current?: boolean
  disabled?: boolean
  label: string
  set: (next: Record<string, string>) => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      onClick={() => {
        set({ page: page > 1 ? String(page) : '' })
        window.scrollTo({ top: 0 })
      }}
      className={cn(
        'grid h-9 min-w-9 place-items-center rounded-full px-3 text-sm tabular-nums transition-colors disabled:opacity-40',
        current ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
