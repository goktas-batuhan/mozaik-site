/**
 * Foto ve video galerilerinin içeriği. Yeni bir öğe eklemek için diziye bir satır yeterli.
 * Fotoğraflar `public/thumbs/<ad>-{dark,light}.webp` önizlemeleridir; videolar boşken bölüm gizlenir.
 */
export type Photo = { name: string; title: string; caption: string; href: string }

export type Video = {
  id: string
  title: string
  description: string
  /** Kendi barındırdığın dosya (mp4/webm); `public/` altına koy, yol `withBase` ile çözülür. */
  src?: string
  /** YouTube video kimliği; nocookie alan adıyla, tıklanınca yüklenir. */
  youtube?: string
  /** `public/` altındaki kapak görseli; yoksa koyu bir zemin gösterilir. */
  poster?: string
}

export const photos: Photo[] = [
  { name: 'aurora-background', title: 'Aurora background', caption: 'Slow light behind your hero.', href: '/components/aurora-background' },
  { name: 'coverflow-carousel', title: 'Coverflow carousel', caption: 'Cards that tilt into focus.', href: '/components/coverflow-carousel' },
  { name: 'dock', title: 'Dock', caption: 'Magnification that only wakes up for a mouse.', href: '/components/dock' },
  { name: 'price-ticker', title: 'Price ticker', caption: 'Digits roll, the change flashes.', href: '/components/price-ticker' },
  { name: 'ai-orb', title: 'AI orb', caption: 'A voice state you can feel.', href: '/components/ai-orb' },
  { name: 'safari-mockup', title: 'Safari mockup', caption: 'Show your product in a real frame.', href: '/components/safari-mockup' },
  { name: 'card-flip', title: 'Card flip', caption: 'Two faces, one smooth turn.', href: '/components/card-flip' },
  { name: 'bento-grid', title: 'Bento grid', caption: 'A layout that explains itself.', href: '/components/bento-grid' },
  { name: 'tx-steps', title: 'Transaction steps', caption: 'Approve, sign, broadcast, confirmed.', href: '/components/tx-steps' },
]

export const videos: Video[] = []
