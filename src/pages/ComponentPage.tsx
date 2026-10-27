import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useParams, useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import {
  byName,
  components,
  groupLabel,
  itemPath,
  loadDoc,
  sectionOf,
  shelfLabel,
  tree,
  type ComponentDoc,
} from '@/site/catalog'
import { useTitle } from '@/site/meta'
import { PreviewFrame } from '@/site/preview'
import { Badge, CodeBlock, Command, StatusBadge, Tabs } from '@/site/ui'
import { NotFound } from './NotFound'

export function ComponentPage() {
  const { slug: name = '' } = useParams()
  const entry = byName(name)
  const [search, setSearch] = useSearchParams()
  // Prerender HTML'i varyantsız; ?v= hydrate'ten sonra okunur (React #418).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const variant = mounted ? entry?.variants.find((v) => v.name === search.get('v')) : undefined
  const [doc, setDoc] = useState<ComponentDoc | null>(null)
  const [view, setView] = useState('preview')

  useTitle(entry?.title, entry?.description)

  useEffect(() => {
    let alive = true
    setDoc(null)
    setView('preview')
    loadDoc(name).then((d) => alive && setDoc(d))
    return () => {
      alive = false
    }
  }, [name])

  if (!entry) return <NotFound />

  const section = sectionOf(entry.layer)
  const i = components.findIndex((c) => c.name === name)
  const prev = components[i - 1]
  const next = components[i + 1]
  const variantDoc = variant && doc?.variants?.find((v) => v.name === variant.name)
  const file = doc?.files[0]
  const deps = entry.dependencies

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <Sidebar current={name} group={entry.group} />

      <article className="min-w-0 space-y-14">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/${section}`} className="hover:text-foreground">
              {section === 'blocks' ? 'Blocks' : 'Components'}
            </Link>
            <span aria-hidden>/</span>
            <Link to={`/${section}/${entry.group}`} className="hover:text-foreground">
              {groupLabel(section, entry.group)}
            </Link>
            <span aria-hidden>/</span>
            <Link to={`/${section}/${entry.group}/${entry.shelf}`} className="hover:text-foreground">
              {shelfLabel(section, entry.group, entry.shelf)}
            </Link>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight">{entry.title}</h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{entry.description}</p>
          <div className="flex flex-wrap gap-1.5">
            <StatusBadge status={entry.status} />
            {entry.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </header>

        <section aria-label="Preview and code" className="space-y-4">
          <Tabs
            tabs={[
              { id: 'preview', label: 'Preview' },
              { id: 'code', label: 'Code' },
            ]}
            value={view}
            onChange={setView}
          />
          {view === 'preview' ? (
            <PreviewFrame key={variant?.name ?? ''} name={variant ? `${name}~${variant.name}` : name} />
          ) : file ? (
            <CodeBlock html={file.html} raw={file.raw} title={`components/${file.name}`} />
          ) : (
            <div className="h-96 animate-pulse rounded-2xl border bg-card motion-reduce:animate-none" />
          )}
        </section>

        {entry.variants.length > 0 && (
          <section aria-labelledby="variants" className="space-y-5">
            <h2 id="variants" className="text-2xl font-semibold tracking-tight">
              Variants
            </h2>
            <p className="text-muted-foreground">
              The same component with a named set of props. Pick one to preview it above and see its props.
            </p>
            <div role="group" aria-label="Variants" className="flex flex-wrap gap-2">
              {[{ name: '', title: 'Demo' }, ...entry.variants].map((v) => {
                const on = (variant?.name ?? '') === v.name
                return (
                  <button
                    key={v.name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      const p = new URLSearchParams(search)
                      if (v.name) p.set('v', v.name)
                      else p.delete('v')
                      setSearch(p, { replace: true, preventScrollReset: true })
                      setView('preview')
                    }}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                      on ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {v.title}
                  </button>
                )
              })}
            </div>
            {variant && <p className="text-sm text-muted-foreground">{variant.description}</p>}
            {variantDoc && <CodeBlock html={variantDoc.html} raw={variantDoc.raw} title={`${variant.name}.tsx`} maxHeight="16rem" />}
          </section>
        )}

        <section aria-labelledby="install" className="space-y-5">
          <h2 id="install" className="text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <div className="space-y-6">
            {deps.length > 0 && (
              <Step n={1} title="Install the dependencies.">
                <Command value={`npm install ${deps.join(' ')}`} />
              </Step>
            )}
            <Step n={deps.length > 0 ? 2 : 1} title="Make sure you have the cn helper at lib/utils.ts.">
              <Command value="npm install clsx tailwind-merge" />
            </Step>
            <Step
              n={deps.length > 0 ? 3 : 2}
              title={`Copy the source into components/${file?.name ?? `${name}.tsx`}.`}
            >
              {file ? (
                <CodeBlock html={file.html} raw={file.raw} title={`components/${file.name}`} maxHeight="16rem" />
              ) : (
                <div className="h-64 animate-pulse rounded-xl border bg-card motion-reduce:animate-none" />
              )}
            </Step>
          </div>
        </section>

        <section aria-labelledby="usage" className="space-y-5">
          <h2 id="usage" className="text-2xl font-semibold tracking-tight">
            Usage
          </h2>
          {doc ? (
            <CodeBlock html={doc.usage} raw={doc.usageRaw.replaceAll('@/components/mozaik/', '@/components/')} title="example.tsx" />
          ) : (
            <div className="h-64 animate-pulse rounded-xl border bg-card motion-reduce:animate-none" />
          )}
        </section>

        <section aria-labelledby="props" className="space-y-5">
          <h2 id="props" className="text-2xl font-semibold tracking-tight">
            Props
          </h2>
          {doc && <PropsTable props={doc.props} />}
        </section>

        <nav aria-label="Previous and next" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={itemPath(prev)} className="group rounded-xl border p-4 hover:bg-card">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden /> Previous
              </span>
              <span className="mt-1 block font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={itemPath(next)} className="group rounded-xl border p-4 text-right hover:bg-card">
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1 block font-medium">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3">
      <span className="grid size-7 place-items-center rounded-full border font-mono text-xs text-muted-foreground">{n}</span>
      <div className="space-y-3">
        <p className="pt-0.5 text-sm font-medium">{title}</p>
        {children}
      </div>
    </div>
  )
}

function PropsTable({ props }: { props: ComponentDoc['props'] }) {
  if (props.length === 0) return <p className="text-muted-foreground">This component takes no props.</p>
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Prop
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Type
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Default
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((p) => (
            <tr key={p.name} className="align-top">
              <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap">
                {p.name}
                {p.required && (
                  <span className="text-primary" title="Required">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">{p.type}</code>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.default ?? '—'}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Sidebar({ current, group }: { current: string; group: string }) {
  // 1000 öğede hepsini listelemek ağır: gruplar listelenir, yalnız açık grubun öğeleri görünür.
  const sections = [
    { id: 'components' as const, label: 'Components', groups: tree('components') },
    { id: 'blocks' as const, label: 'Blocks', groups: tree('blocks') },
  ]
  return (
    <aside className="hidden lg:block">
      <nav aria-label="All components" className="sticky top-24 max-h-[calc(100svh-7rem)] space-y-6 overflow-y-auto pr-2 pb-10 text-sm [scrollbar-width:thin]">
        {sections.map((sec) => (
          <div key={sec.id}>
            <p className="mb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{sec.label}</p>
            <ul className="space-y-0.5">
              {sec.groups.map((g) => (
                <li key={g.id}>
                  <NavLink
                    to={`/${sec.id}/${g.id}`}
                    className="-ml-2 flex items-baseline justify-between rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {g.label}
                    <span className="font-mono text-[11px] tabular-nums">{g.count}</span>
                  </NavLink>
                  {g.id === group && (
                    <ul className="mt-0.5 mb-2 ml-1 space-y-0.5 border-l pl-2">
                      {components
                        .filter((c) => sectionOf(c.layer) === sec.id && c.group === g.id)
                        .map((c) => (
                          <li key={c.name}>
                            <NavLink
                              to={itemPath(c)}
                              className={cn(
                                'block rounded-md px-2 py-1 transition-colors',
                                c.name === current ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
                              )}
                            >
                              {c.title}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
