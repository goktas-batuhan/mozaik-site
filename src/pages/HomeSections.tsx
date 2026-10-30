import { Accessibility, ArrowRight, FlaskConical, Gauge, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { BentoCard, BentoGrid } from '@/components/mozaik/bento-grid'
import { Marquee } from '@/components/mozaik/marquee'
import { NumberTicker } from '@/components/mozaik/number-ticker'
import { Spotlight } from '@/components/mozaik/spotlight'
import { photos, videos } from '@/data/media'
import { components, itemPath, tree } from '@/site/catalog'
import { stats, withBase } from '@/site/data'
import { PhotoGallery, VideoGallery } from '@/site/media'
import { LazyDemo, Stage } from '@/site/preview'
import { ButtonLink, SectionHeading } from '@/site/ui'

const HOW = [
  { title: 'Pick a component', text: 'Try it live in the gallery, check its props and the dependencies it lists.' },
  { title: 'Copy the source', text: 'One click copies the whole file. Paste it into components/ in any React project with Tailwind CSS v4.' },
  { title: 'Make it yours', text: 'No package to update, no wrapper to fight. Change the file however you like.' },
]

const FEATURED: { name: string; title: string; description: string; colSpan?: 1 | 2; rowSpan?: 1 | 2 }[] = [
  { name: 'price-ticker', title: 'Price ticker', description: 'Digits roll, the change flashes, screen readers hear it once.', colSpan: 2 },
  { name: 'dock', title: 'Dock', description: 'Magnification that only wakes up for a mouse.', rowSpan: 2 },
  { name: 'tx-steps', title: 'Transaction steps', description: 'Approve, sign, broadcast, confirmed.' },
  { name: 'direction-aware-tabs', title: 'Direction-aware tabs', description: 'Content slides the way you moved.' },
  { name: 'scramble-text', title: 'Scramble text', description: 'Decodes into place without the line jumping.', colSpan: 2 },
  { name: 'radar-badge', title: 'Radar badge', description: 'A live status you can read at a glance.' },
]

const GATE = [
  { icon: ShieldCheck, title: 'Type-safe', text: 'Strict TypeScript across every component and demo.' },
  { icon: FlaskConical, title: 'Unit tested', text: 'Vitest and Testing Library on roles, labels and props.' },
  { icon: Gauge, title: 'Smoke tested', text: 'Playwright renders each demo and fails on runtime errors.' },
  { icon: Accessibility, title: 'Reduced motion', text: 'Two screenshots 0.7s apart must match when motion is off.' },
]

/** Ana sayfanın ilk ekran altı; ayrı parça olarak yüklenir. */
export function HomeSections() {
  const groups = tree('components')

  return (
    <>
      <section aria-label="Numbers" className="border-b">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-border px-4 sm:px-6 md:grid-cols-4 md:divide-x">
          {[
            { value: stats.components, label: 'Components' },
            { value: stats.variants + stats.blocks, label: 'Variants and blocks' },
            { value: stats.sources, label: 'MIT sources credited' },
            { value: Math.round((stats.stable / stats.total) * 100), label: 'Pass the quality gate', suffix: '%' },
          ].map((s) => (
            <div key={s.label} className="px-2 py-10 md:px-8">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">
                <NumberTicker value={s.value} duration={1.6} />
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Component names" className="border-b py-6">
        <Marquee pauseOnHover repeat={2} duration={50} className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          {components.filter((_, i) => i % 2 === 0).map((c) => (
            <Link
              key={c.name}
              to={itemPath(c)}
              className="rounded-full border px-4 py-1.5 font-mono text-sm whitespace-nowrap text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </Marquee>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6">
        <SectionHeading eyebrow="Featured" title="Small details, carefully finished.">
          Every tile below is the real component running live. Hover, click, tab through them.
        </SectionHeading>
        <BentoGrid columns={4} rowHeight="15rem" className="mt-12">
          {FEATURED.map((f) => (
            <BentoCard
              key={f.name}
              title={f.title}
              description={f.description}
              colSpan={f.colSpan}
              rowSpan={f.rowSpan}
              href={withBase(`/components/${f.name}`)}
              visual={
                <div className="flex size-full items-center justify-center overflow-hidden px-3">
                  <Stage designWidth={720} max={0.7}>
                    <LazyDemo name={f.name} />
                  </Stage>
                </div>
              }
            />
          ))}
        </BentoGrid>
      </section>

      <section id="motion" aria-label="Gallery" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-32 sm:px-6">
        <SectionHeading eyebrow="Gallery" title="See what it looks like.">
          Stills from the library. Click one to enlarge it, then open the component to watch it move.
        </SectionHeading>
        <PhotoGallery photos={photos} className="mt-12" />
        {videos.length > 0 && (
          <>
            <h3 id="media-heading" className="mt-16 text-2xl font-semibold tracking-tight">
              Watch it in motion
            </h3>
            <VideoGallery videos={videos} className="mt-6" />
          </>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-32 sm:px-6 lg:grid-cols-2">
        <SectionHeading eyebrow="How it works" title="Copy the code, not a dependency.">
          Mozaik is not a package. Every component page has the full source with a copy button and the npm packages it
          needs. Paste the file into your project and it is yours to change.
        </SectionHeading>
        <ol className="w-full divide-y rounded-2xl border bg-card">
          {HOW.map((h, i) => (
            <li key={h.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 p-6">
              <span className="grid size-7 place-items-center rounded-full border font-mono text-xs text-muted-foreground">
                {i + 1}
              </span>
              <div>
                <p className="pt-0.5 font-medium">{h.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-32 sm:px-6">
        <SectionHeading eyebrow="Quality gate" title={`${stats.stable} of ${stats.total} items pass every check.`}>
          The gate runs on every push. A component that fails still ships, marked beta, so you always know what you are
          getting.
        </SectionHeading>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GATE.map((g) => (
            <Spotlight key={g.title} className="rounded-2xl border bg-card p-6">
              <g.icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-5 font-medium">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.text}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-32 sm:px-6">
        <SectionHeading eyebrow="Categories" title={`${groups.length} groups, one design language.`} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((c) => (
            <li key={c.id} className="bg-background">
              <Link to={`/components/${c.id}`} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-card">
                <span className="flex items-baseline justify-between">
                  <span className="font-medium">{c.label}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">{c.count}</span>
                </span>
                <span className="text-sm text-muted-foreground">{c.blurb}</span>
                <ArrowRight
                  className="mt-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-32 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center sm:px-16">
          <Layers className="mx-auto size-6 text-primary" aria-hidden />
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A portfolio piece you can <span className="font-serif font-normal italic">actually use.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Design tokens, motion, accessibility, testing and a distribution pipeline, all in one open-source project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/about" variant="outline">
              <Sparkles className="size-4" aria-hidden />
              About the author
            </ButtonLink>
            <ButtonLink to="/components">Start browsing</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
