import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router'
import { cn } from '@/lib/utils'
import {
  byName,
  CATEGORIES,
  categoryLabel,
  inCategoryOrder,
  installCommand,
  loadDoc,
  MOZAIK_REPO,
  namespacedCommand,
  REGISTRY_URL,
  type ComponentDoc,
} from '@/site/data'
import { useTitle } from '@/site/meta'
import { PreviewFrame } from '@/site/preview'
import { Badge, CodeBlock, Command, LayerBadge, StatusBadge, Tabs } from '@/site/ui'
import { NotFound } from './NotFound'

export function ComponentPage() {
  const { name = '' } = useParams()
  const entry = byName(name)
  const [doc, setDoc] = useState<ComponentDoc | null>(null)
  const [view, setView] = useState('preview')
  const [install, setInstall] = useState('cli')

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

  const i = inCategoryOrder.findIndex((c) => c.name === name)
  const prev = inCategoryOrder[i - 1]
  const next = inCategoryOrder[i + 1]
  const file = doc?.files[0]
  const deps = entry.dependencies

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-10 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <Sidebar current={name} />

      <article className="min-w-0 space-y-14">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/components" className="hover:text-foreground">
              Components
            </Link>
            <span aria-hidden>/</span>
            <Link to={`/components?category=${entry.category}`} className="hover:text-foreground">
              {categoryLabel(entry.category)}
            </Link>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight">{entry.title}</h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{entry.description}</p>
          <div className="flex flex-wrap gap-1.5">
            <LayerBadge layer={entry.layer} />
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
            <PreviewFrame name={name} />
          ) : file ? (
            <CodeBlock html={file.html} raw={file.raw} title={`components/${file.name}`} />
          ) : (
            <div className="h-96 animate-pulse rounded-2xl border bg-card motion-reduce:animate-none" />
          )}
        </section>

        <section aria-labelledby="install" className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="install" className="text-2xl font-semibold tracking-tight">
              Installation
            </h2>
            <Tabs
              tabs={[
                { id: 'cli', label: 'CLI' },
                { id: 'manual', label: 'Manual' },
              ]}
              value={install}
              onChange={setInstall}
            />
          </div>
          {install === 'cli' ? (
            <div className="space-y-6">
              <Step n={1} title="Run the shadcn CLI in a project that has Tailwind CSS v4.">
                <Command value={installCommand(name)} />
              </Step>
              <Step n={2} title="Prefer short names? Add the registry once to components.json.">
                <CodeBlock
                  html={registriesHtml}
                  raw={registriesSnippet}
                  title="components.json"
                  maxHeight="12rem"
                />
                <Command value={namespacedCommand(name)} className="mt-3" />
              </Step>
            </div>
          ) : (
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
                <p className="text-sm text-muted-foreground">
                  The full file is under the Code tab above, or straight from the registry:{' '}
                  <a className="text-foreground underline underline-offset-4" href={`${REGISTRY_URL}/${name}.json`}>
                    {name}.json
                  </a>
                </p>
              </Step>
            </div>
          )}
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

        <section aria-labelledby="source" className="space-y-3">
          <h2 id="source" className="text-2xl font-semibold tracking-tight">
            Source and license
          </h2>
          {entry.source === 'original' ? (
            <p className="text-muted-foreground">
              Original work, written for Mozaik. MIT licensed.{' '}
              <a className="text-foreground underline underline-offset-4" href={`${MOZAIK_REPO}/tree/main/registry/${entry.category}/${name}`}>
                View on GitHub
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Adapted from{' '}
              <a className="inline-flex items-center gap-1 text-foreground underline underline-offset-4" href={entry.source.url}>
                {entry.source.repo}
                <ExternalLink className="size-3" aria-hidden />
              </a>{' '}
              ({entry.source.license}). Rebuilt on Mozaik tokens with reduced motion and keyboard support.
              {entry.source.note ? ` ${entry.source.note}` : ''} Upstream notice in{' '}
              <a className="text-foreground underline underline-offset-4" href={`${MOZAIK_REPO}/blob/main/CREDITS.md`}>
                CREDITS.md
              </a>
              .
            </p>
          )}
        </section>

        <nav aria-label="Previous and next" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/components/${prev.name}`} className="group rounded-xl border p-4 hover:bg-card">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden /> Previous
              </span>
              <span className="mt-1 block font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/components/${next.name}`} className="group rounded-xl border p-4 text-right hover:bg-card">
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

const registriesSnippet = `{
  "registries": {
    "@mozaik": "${REGISTRY_URL}/{name}.json"
  }
}`

// Küçük JSON, elle renklendirildi (shiki çıktısıyla aynı sınıf yapısı).
const esc = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
const registriesHtml = `<pre class="shiki"><code>${registriesSnippet
  .split('\n')
  .map(
    (l) =>
      `<span class="line">${esc(l).replace(
        /("[^"]*")(:?)/g,
        (_, str, colon) =>
          `<span style="--shiki-light:${colon ? '#005cc5' : '#032f62'};--shiki-dark:${colon ? '#79c0ff' : '#a5d6ff'}">${str}</span>${colon}`,
      )}</span>`,
  )
  .join('\n')}</code></pre>`

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

function Sidebar({ current }: { current: string }) {
  return (
    <aside className="hidden lg:block">
      <nav aria-label="All components" className="sticky top-24 max-h-[calc(100svh-7rem)] space-y-6 overflow-y-auto pr-2 pb-10 text-sm [scrollbar-width:thin]">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <p className="mb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{cat.label}</p>
            <ul className="space-y-0.5">
              {inCategoryOrder
                .filter((c) => c.category === cat.id)
                .map((c) => (
                  <li key={c.name}>
                    <NavLink
                      to={`/components/${c.name}`}
                      className={cn(
                        '-ml-2 block rounded-md px-2 py-1 transition-colors',
                        c.name === current ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {c.title}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

