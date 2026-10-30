import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import type { Photo, Video } from '@/data/media'
import { withBase } from '@/site/data'
import { ThemedThumb } from '@/site/ui'

/** Küçük resimler ızgarası; birine basınca yerel <dialog> ile büyür (odak tuzağı ve Esc dahil). */
export function PhotoGallery({ photos, className }: { photos: Photo[]; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const photo = open === null ? null : photos[open]

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open !== null && !el.open) el.showModal()
    if (open === null && el.open) el.close()
  }, [open])

  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length))

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge ${p.title}`}
              className="group relative block aspect-[600/336] w-full overflow-hidden rounded-xl border bg-card"
            >
              <ThemedThumb name={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={photo ? photo.title : 'Photo'}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-auto w-[min(92vw,56rem)] overflow-hidden rounded-2xl border bg-card p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {photo && (
          <figure>
            <ThemedThumb name={photo.name} lazy={false} className="aspect-[600/336] w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-4 p-4">
              <span>
                <span className="block font-medium">{photo.title}</span>
                <span className="block text-sm text-muted-foreground">{photo.caption}</span>
              </span>
              <Link to={photo.href} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                Open component
              </Link>
            </figcaption>
          </figure>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background">
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className="grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background">
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background">
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </dialog>
    </div>
  )
}

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false)
  return (
    <article className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative aspect-video bg-black">
        {playing ? (
          video.youtube ? (
            <iframe
              title={video.title}
              src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <video src={video.src && withBase(video.src)} controls autoPlay playsInline className="absolute inset-0 size-full" />
          )
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${video.title}`} className="group absolute inset-0 grid size-full place-items-center">
            {video.poster && <img src={withBase(video.poster)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />}
            <span className="relative grid size-14 place-items-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-110">
              <Play className="size-6 translate-x-0.5" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium">{video.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
      </div>
    </article>
  )
}

/** Video kartları; dosya ya da YouTube, tıklanana kadar hiçbir şey yüklenmez. */
export function VideoGallery({ videos, className }: { videos: Video[]; className?: string }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}
