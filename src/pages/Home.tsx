import { ArrowRight, Keyboard, Play, ScanEye, Scale } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ScrambleText } from '@/components/mozaik/scramble-text'
import { ShaderBackground } from '@/components/mozaik/shader-background'
import { cn } from '@/lib/utils'
import { MOZAIK_REPO, stats } from '@/site/data'
import { useTitle } from '@/site/meta'
import { ButtonLink, buttonStyles, GithubIcon, ThemedThumb } from '@/site/ui'

const PROOF = [
  { icon: Scale, text: 'Free and MIT' },
  { icon: ScanEye, text: 'Reduced-motion safe' },
  { icon: Keyboard, text: 'Keyboard ready' },
]

// Hero'nun altındaki kanıt şeridi: gerçek önizlemeler, ortadaki öne çıkar.
const SHOWCASE = [
  { name: 'dock', title: 'Dock', className: 'md:-rotate-3 md:translate-y-6' },
  { name: 'aurora-background', title: 'Aurora background', className: 'md:z-10 md:scale-110' },
  { name: 'price-ticker', title: 'Price ticker', className: 'md:rotate-3 md:translate-y-6' },
]

const HomeSections = lazy(() => import('./HomeSections').then((m) => ({ default: m.HomeSections })))

/**
 * WebGL shader derlemesi ana thread'i meşgul eder; ilk etkileşime ya da sayfa yerleştikten
 * sonraya ertelenir. O zamana kadar CSS gradyan görünür.
 */
function useIdle() {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    const start = () => setIdle(true)
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }))
    const id = window.setTimeout(start, 6000)
    return () => {
      window.clearTimeout(id)
      events.forEach((e) => window.removeEventListener(e, start))
    }
  }, [])
  return idle
}

export function Home() {
  useTitle()
  const idle = useIdle()
  // Rastgele glifler sunucu HTML'iyle uyuşmaz; efekt hydrate sonrası başlar.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <>
      <section className="relative -mt-16 overflow-hidden border-b">
        <div className="relative isolate min-h-[44rem] bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%),radial-gradient(ellipse_at_80%_60%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_55%)]">
          {idle && <ShaderBackground intensity={0.55} speed={0.6} className="absolute inset-0 -z-10" />}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" aria-hidden />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-36 pb-20 text-center sm:px-6">
            <div className="fade-up" style={{ animationDelay: '0.05s' }}>
              <Link
                to="/components"
                className="group inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-1 text-sm text-muted-foreground backdrop-blur hover:text-foreground"
              >
                <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase">
                  {stats.components}
                </span>
                components, copy the code
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Interfaces people{' '}
              <span className="font-serif font-normal italic">
                {idle || mounted ? <ScrambleText text="remember." duration={1.1} delay={0.2} /> : 'remember.'}
              </span>
            </h1>

            {/* LCP öğesi: animasyonsuz, ilk boyamada görünür. */}
            <div>
              <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
                <strong className="font-medium text-foreground">{stats.components} animated React components</strong> in one
                design language. Copy the source, own every line and ship today. No package to update, nothing to fight.
              </p>
            </div>

            <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.35s' }}>
              <ButtonLink to="/components" className="h-12 px-7 text-base">
                Browse {stats.components} components
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to="/components?tags=motion" variant="outline" className="h-12 px-6 text-base">
                <Play className="size-4" aria-hidden />
                See it move
              </ButtonLink>
              <a href={MOZAIK_REPO} target="_blank" rel="noreferrer" className={cn(buttonStyles.outline, 'h-12 px-6 text-base')}>
                <GithubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>

            <ul className="fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" style={{ animationDelay: '0.45s' }}>
              {PROOF.map((p) => (
                <li key={p.text} className="inline-flex items-center gap-2">
                  <p.icon className="size-4 text-primary" aria-hidden />
                  {p.text}
                </li>
              ))}
            </ul>

            <ul className="fade-up mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5" style={{ animationDelay: '0.55s' }}>
              {SHOWCASE.map((s, i) => (
                <li key={s.name} className={cn(i !== 1 && 'hidden sm:block', s.className)}>
                  <Link
                    to={`/components/${s.name}`}
                    aria-label={`${s.title} component`}
                    className="hero-float block overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10 ring-1 ring-foreground/5 transition-[border-color] hover:border-primary/50"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    <ThemedThumb name={s.name} className="aspect-[600/336] w-full object-cover" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[300vh]" />}>
        <HomeSections />
      </Suspense>
    </>
  )
}
