import { ArrowUpRight, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { MOZAIK_REPO, SITE_REPO, stats } from '@/site/data'
import { useTitle } from '@/site/meta'
import { profile } from '@/site/profile'
import { GithubIcon } from '@/site/ui'

const SKILLS = [
  { title: 'Motion design in code', text: 'Springs, staggers, scroll and pointer-driven effects with Motion, CSS and raw WebGL.' },
  { title: 'Accessibility', text: 'Reduced-motion fallbacks tested in CI, keyboard support, live regions and real text for screen readers.' },
  { title: 'Design systems', text: 'One token layer for colour, radius and type, shared by every component and both themes.' },
  { title: 'Performance', text: 'Lazy previews, render loops that pause off screen, code highlighted at build time.' },
  { title: 'Testing and CI', text: 'Strict TypeScript, Vitest, Playwright smoke tests and a quality gate that labels each component.' },
  { title: 'Distribution', text: 'A shadcn registry: one command installs a component as source into any React project.' },
]

export function About() {
  useTitle('About', `${profile.name}, ${profile.role}. The person behind Mozaik.`)
  const links: { label: string; href: string; icon: ReactNode }[] = [
    { label: 'GitHub', href: profile.github, icon: <GithubIcon className="size-4" /> },
  ]
  if (profile.linkedin) links.push({ label: 'LinkedIn', href: profile.linkedin, icon: <ArrowUpRight className="size-4" aria-hidden /> })
  if (profile.website) links.push({ label: 'Website', href: profile.website, icon: <ArrowUpRight className="size-4" aria-hidden /> })
  if (profile.email) links.push({ label: profile.email, href: `mailto:${profile.email}`, icon: <Mail className="size-4" aria-hidden /> })

  return (
    <div className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
      <header className="space-y-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">About</p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Hi, I&rsquo;m {profile.name.split(' ')[0]}.{' '}
          <span className="font-serif font-normal text-muted-foreground italic">I build interfaces that feel considered.</span>
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
          {profile.role}
          {profile.location ? ` based in ${profile.location}` : ''}. Mozaik is my open-source showcase: {stats.total} animated
          React components, a registry that installs them, and this site that documents them. Everything here, from the
          tokens to the test pipeline, was designed and built as one system.
        </p>
        <ul className="flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors hover:bg-accent"
              >
                {l.icon}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="shows" className="mt-20 space-y-8">
        <h2 id="shows" className="text-2xl font-semibold tracking-tight">
          What this project shows
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-card p-6">
              <dt className="font-medium">{s.title}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="stack" className="mt-20 space-y-6">
        <h2 id="stack" className="text-2xl font-semibold tracking-tight">
          Under the hood
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <RepoCard href={MOZAIK_REPO} name="mozaik">
            Component source, tests, the quality gate and the registry build. React 19, TypeScript, Tailwind CSS v4, Motion,
            Vitest, Playwright, GitHub Actions.
          </RepoCard>
          <RepoCard href={SITE_REPO} name="mozaik-site">
            This website. It installs every component from the registry with the shadcn CLI, so the gallery doubles as an
            end-to-end test of the install path.
          </RepoCard>
        </div>
      </section>
    </div>
  )
}

function RepoCard({ href, name, children }: { href: string; name: string; children: ReactNode }) {
  return (
    <a href={href} className="group rounded-2xl border p-6 transition-colors hover:bg-card">
      <p className="flex items-center justify-between font-mono text-sm font-medium">
        {name}
        <ArrowUpRight
          className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </a>
  )
}
