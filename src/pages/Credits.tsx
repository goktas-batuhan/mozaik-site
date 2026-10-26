import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import { components, stats, type Source } from '@/site/data'
import { useTitle } from '@/site/meta'

const SITE_LIBRARIES = [
  { name: 'React', url: 'https://react.dev', license: 'MIT' },
  { name: 'Motion', url: 'https://motion.dev', license: 'MIT' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com', license: 'MIT' },
  { name: 'React Router', url: 'https://reactrouter.com', license: 'MIT' },
  { name: 'Vite', url: 'https://vite.dev', license: 'MIT' },
  { name: 'shadcn/ui CLI', url: 'https://ui.shadcn.com', license: 'MIT' },
  { name: 'Shiki', url: 'https://shiki.style', license: 'MIT' },
  { name: 'Lucide icons', url: 'https://lucide.dev', license: 'ISC' },
  { name: 'Geist and Geist Mono', url: 'https://vercel.com/font', license: 'OFL-1.1' },
  { name: 'Instrument Serif', url: 'https://fonts.google.com/specimen/Instrument+Serif', license: 'OFL-1.1' },
]

export function Credits() {
  useTitle('Credits', 'Sources and licenses of every adapted Mozaik component and the libraries behind this site.')
  const adapted = components.filter((c) => c.layer === 'B')
  const groups = new Map<string, { source: Source; items: typeof adapted }>()
  for (const c of adapted) {
    const source = c.source as Source
    const g = groups.get(source.repo) ?? { source, items: [] }
    g.items.push(c)
    groups.set(source.repo, g)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
      <header className="space-y-4">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">Credits</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Standing on good shoulders.</h1>
        <p className="text-lg text-pretty text-muted-foreground">
          {stats.original} components are original work. The other {stats.adapted} are rebuilt from {stats.sources}{' '}
          MIT-licensed open-source projects: restyled on Mozaik tokens, given reduced-motion and keyboard support, and
          credited here and at the top of every source file.
        </p>
      </header>

      <section aria-labelledby="adapted" className="mt-16 space-y-6">
        <h2 id="adapted" className="text-2xl font-semibold tracking-tight">
          Adapted components
        </h2>
        <div className="space-y-4">
          {[...groups.values()].map(({ source, items }) => (
            <div key={source.repo} className="rounded-2xl border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a
                  href={`https://github.com/${source.repo}`}
                  className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                >
                  {source.repo}
                  <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden />
                </a>
                <span className="font-mono text-xs text-muted-foreground">{source.license}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((c) => (
                  <li key={c.name}>
                    <Link
                      to={`/components/${c.name}`}
                      className="inline-block rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rules" className="mt-16 space-y-4">
        <h2 id="rules" className="text-2xl font-semibold tracking-tight">
          License rules
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
          <li>
            Only plain MIT, Apache-2.0, ISC or Unlicense sources are adapted. The upstream LICENSE is re-read before every
            port.
          </li>
          <li>
            Projects under Commons Clause (such as React Bits, Rare UI and animate-ui), custom licenses or paid tiers are
            never copied. At most they inspire an idea.
          </li>
          <li>Each adapted file starts with a Source line naming the repository, license and upstream file.</li>
        </ul>
      </section>

      <section aria-labelledby="site" className="mt-16 space-y-6">
        <h2 id="site" className="text-2xl font-semibold tracking-tight">
          This site is built with
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
          {SITE_LIBRARIES.map((l) => (
            <li key={l.name} className="flex items-center justify-between bg-background px-5 py-3.5">
              <a href={l.url} className="text-sm hover:underline hover:underline-offset-4">
                {l.name}
              </a>
              <span className="font-mono text-xs text-muted-foreground">{l.license}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
