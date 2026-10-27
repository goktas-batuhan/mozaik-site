import { MotionConfig } from 'motion/react'
import { LoaderCircle, RotateCcw } from 'lucide-react'
import { Component, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { getDemo } from './catalog'
import { withBase } from './data'
import { buttonStyles } from './ui'

class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <p className="text-sm text-muted-foreground">This preview could not be rendered.</p>
    ) : (
      this.props.children
    )
  }
}

/** Demo'yu görünüme yaklaşınca yükler ve render eder; bir kez kurulunca sökmez. */
export function LazyDemo({ name, eager = false }: { name: string; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(eager)

  useEffect(() => {
    if (visible || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { rootMargin: '200px' },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [visible])

  const Demo = getDemo(name)

  return (
    <div ref={ref} className="flex w-full items-center justify-center">
      {visible && Demo ? (
        <DemoBoundary>
          <Suspense fallback={<PreviewSkeleton />}>
            <Demo />
          </Suspense>
        </DemoBoundary>
      ) : (
        <PreviewSkeleton />
      )}
    </div>
  )
}

/**
 * Demoyu en az `designWidth` genişliğinde yerleştirir, demonun gerçek genişliği alana sığacak
 * kadar küçültür (en çok `max`) ve yüksekliği buna göre ayarlar. Dar ekranda demolar kırpılmaz.
 */
export function Stage({ children, designWidth = 640, max = 1 }: { children: ReactNode; designWidth?: number; max?: number }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ scale: max, width: designWidth, x: 0, height: 0 })

  useLayoutEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const ro = new ResizeObserver(() => update())
    const update = () => {
      const avail = o.clientWidth
      if (!avail) return
      const width = Math.max(designWidth, avail)
      // Stage > LazyDemo sarmalayıcısı > demonun kökü
      const root = i.firstElementChild?.firstElementChild as HTMLElement | null
      if (root) ro.observe(root)
      const content = Math.min(width, root?.offsetWidth || width)
      const scale = Math.min(max, avail / content)
      setBox({ scale, width, x: (avail - width * scale) / 2, height: i.offsetHeight * scale })
    }
    ro.observe(o)
    ro.observe(i)
    update()
    return () => ro.disconnect()
  }, [designWidth, max])

  return (
    <div ref={outer} className="relative w-full" style={{ height: box.height || undefined }}>
      <div
        ref={inner}
        className="absolute top-0 left-0 flex origin-top-left justify-center"
        style={
          box.height
            ? { width: box.width, transform: `translateX(${box.x}px) scale(${box.scale})` }
            : // Ölçülmeden önce (prerender HTML'i, hydration öncesi) CSS ile ortala; yoksa yükleniyor
              // göstergesi sağ alta kayık görünüyordu.
              { width: box.width, left: '50%', transformOrigin: 'center', transform: `translate(-50%, -50%) scale(${box.scale})` }
        }
      >
        {children}
      </div>
    </div>
  )
}

/** Demo kurulana kadar: dönen halka ve kısa yazı. Reduced motion'da halka durur, yazı yeter. */
function PreviewSkeleton() {
  return (
    <div aria-hidden className="flex h-24 w-48 flex-col items-center justify-center gap-2.5 text-muted-foreground">
      <LoaderCircle className="size-7 animate-spin opacity-70 motion-reduce:animate-none" strokeWidth={1.75} />
      <span className="text-sm">Loading preview</span>
    </div>
  )
}

const surface =
  'relative isolate grid place-items-center overflow-hidden bg-background [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px)] [background-size:20px_20px]'

/** Component sayfasındaki büyük önizleme: yeniden oynat + reduced motion anahtarı. */
export function PreviewFrame({ name, className }: { name: string; className?: string }) {
  const [run, setRun] = useState(0)
  const [reduced, setReduced] = useState(false)

  return (
    <div className={cn('overflow-hidden rounded-2xl border bg-card', className)}>
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground select-none">
          <span className="relative inline-flex">
            <input
              type="checkbox"
              role="switch"
              className="peer sr-only"
              checked={reduced}
              onChange={(e) => setReduced(e.target.checked)}
            />
            <span className="h-5 w-9 rounded-full border bg-muted transition-colors peer-checked:border-primary/40 peer-checked:bg-primary/25 peer-focus-visible:ring-2 peer-focus-visible:ring-ring" />
            <span className="absolute top-0.5 left-0.5 size-4 rounded-full bg-foreground/70 transition-transform peer-checked:translate-x-4 peer-checked:bg-primary motion-reduce:transition-none" />
          </span>
          Reduced motion
        </label>
        <button type="button" className={cn(buttonStyles.ghost, 'h-8')} onClick={() => setRun((r) => r + 1)}>
          <RotateCcw className="size-3.5" aria-hidden />
          Replay
        </button>
      </div>
      <div className={cn(surface, 'min-h-[26rem] p-6 sm:p-10')}>
        <MotionConfig reducedMotion={reduced ? 'always' : 'user'}>
          <div key={`${run}-${reduced}`} className="w-full">
            <Stage designWidth={720}>
              <LazyDemo name={name} eager />
            </Stage>
          </div>
        </MotionConfig>
      </div>
    </div>
  )
}

// Aynı anda en fazla bu kadar canlı demo; yenisi açılınca en eskisi statik görsele döner.
const LIVE_LIMIT = 6
const live: { id: number; stop: () => void }[] = []
let liveId = 0

function claimLive(stop: () => void) {
  const id = ++liveId
  live.push({ id, stop })
  while (live.length > LIVE_LIMIT) live.shift()!.stop()
  return () => {
    const i = live.findIndex((l) => l.id === id)
    if (i >= 0) live.splice(i, 1)
  }
}

const finePointer = () => typeof matchMedia === 'function' && matchMedia('(hover: hover) and (pointer: fine)').matches
const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Galeri kartındaki önizleme: varsayılan, derlemede çekilmiş statik görsel (açık/koyu WebP,
 * `npm run thumbs`). Canlı demo yalnız üstüne gelince ya da kart odaklanınca kurulur, görünümden
 * çıkınca sökülür; aynı anda en fazla 6 tane. Reduced motion'da hiç kurulmaz.
 */
export function CardPreview({
  demo,
  label,
  priority = false,
  className,
}: {
  demo: string
  label: string
  /** İlk sıradaki kartlar: görsel tembel yüklenmez (LCP). */
  priority?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const [broken, setBroken] = useState(false)
  const file = demo.replace('~', '--')

  useEffect(() => {
    if (!on) return
    const release = claimLive(() => setOn(false))
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setOn(false)
    })
    if (ref.current) io.observe(ref.current)
    return () => {
      release()
      io.disconnect()
    }
  }, [on])

  useEffect(() => {
    const card = ref.current?.closest('article')
    if (!card) return
    const start = (e: Event) => {
      if (reducedMotion()) return
      if (e.type === 'pointerenter' && !finePointer()) return
      setOn(true)
    }
    card.addEventListener('pointerenter', start)
    card.addEventListener('focusin', start)
    return () => {
      card.removeEventListener('pointerenter', start)
      card.removeEventListener('focusin', start)
    }
  }, [])

  return (
    <div ref={ref} className={cn(surface, 'h-56 [contain-intrinsic-size:auto_14rem] [content-visibility:auto]', className)}>
      {!broken && (
        <>
          <img
            src={withBase(`/thumbs/${file}-dark.webp`)}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            width={600}
            height={336}
            onError={() => setBroken(true)}
            className="absolute inset-0 hidden size-full object-cover dark:block"
          />
          <img
            src={withBase(`/thumbs/${file}-light.webp`)}
            alt=""
            // Varsayılan tema koyu: açık görsel öne alınmaz.
            loading="lazy"
            decoding="async"
            width={600}
            height={336}
            className="absolute inset-0 size-full object-cover dark:hidden"
          />
        </>
      )}
      {broken && !on && <span className="text-sm text-muted-foreground">{label}</span>}
      {on && (
        <div className="absolute inset-0 grid place-items-center bg-background p-4">
          <Stage designWidth={760} max={0.72}>
            <LazyDemo name={demo} eager />
          </Stage>
        </div>
      )}
    </div>
  )
}

/** Statik görsel çekimi için: kartla aynı kutu, demo hemen kurulur (scripts/thumbs.mjs). */
export function ThumbFrame({ demo }: { demo: string }) {
  return (
    <div data-thumb className={cn(surface, 'h-56 w-[400px] p-4')}>
      <MotionConfig reducedMotion="never">
        <Stage designWidth={760} max={0.72}>
          <LazyDemo name={demo} eager />
        </Stage>
      </MotionConfig>
    </div>
  )
}
