import { useLayoutEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { ThumbFrame } from '@/site/preview'

/** scripts/thumbs.mjs bu sayfayı açar: kartla aynı kutuda tek demo, istenen temada. */
export function Thumb() {
  const { demo = '' } = useParams()
  const [search] = useSearchParams()
  const light = search.get('theme') === 'light'
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', !light)
  }, [light])
  return (
    <main className="bg-background p-0">
      <ThumbFrame demo={demo} />
    </main>
  )
}
