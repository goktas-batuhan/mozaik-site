import { useEffect } from 'react'

const BASE = 'Mozaik'
const DEFAULT_DESCRIPTION =
  'Animated React components in one design language. Accessible, reduced-motion safe, copy-paste source code.'

/** Sayfa başlığı ve açıklamasını ayarlar. */
export function useTitle(title?: string, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} · Animated React components`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
