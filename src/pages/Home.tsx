import { ArrowRight } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ScrambleText } from '@/components/mozaik/scramble-text'
import { ShaderBackground } from '@/components/mozaik/shader-background'
import { cn } from '@/lib/utils'
import { MOZAIK_REPO, stats } from '@/site/data'
import { useTitle } from '@/site/meta'
import { ButtonLink, buttonStyles, GithubIcon } from '@/site/ui'

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
          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-40 pb-24 text-center sm:px-6">
            <div className="fade-up" style={{ animationDelay: '0.05s' }}>
              <Link
                to="/components"
                className="group inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-1 text-sm text-muted-foreground backdrop-blur hover:text-foreground"
              >
                <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase">
                  {stats.total}
                </span>
                components, copy the code
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
              Interfaces that{' '}
              <span className="font-serif font-normal italic">
                {idle || mounted ? <ScrambleText text="move with intent." duration={1.1} delay={0.2} /> : 'move with intent.'}
              </span>
            </h1>

            {/* LCP öğesi: animasyonsuz, ilk boyamada görünür. */}
            <div>
              <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
                Mozaik is a growing collection of animated React components built on one set of tokens. Each one respects
                reduced motion, works with a keyboard and lands in your project as plain source code you copy.
              </p>
            </div>

            <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.35s' }}>
                <ButtonLink to="/components" className="h-11 px-6">
                  Browse components
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              <a href={MOZAIK_REPO} target="_blank" rel="noreferrer" className={cn(buttonStyles.outline, 'h-11 px-6')}>
                <GithubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[300vh]" />}>
        <HomeSections />
      </Suspense>
    </>
  )
}
