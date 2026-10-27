import summary from '@/data/summary.json'

/** Router dışı düz <a> bağlantıları için taban yol (GitHub Pages alt dizini). */
export const withBase = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path

export const REGISTRY_URL = 'https://raw.githubusercontent.com/goktas-batuhan/mozaik/main/public/r'
export const GITHUB_URL = 'https://github.com/goktas-batuhan'
export const MOZAIK_REPO = 'https://github.com/goktas-batuhan/mozaik'
export const SITE_REPO = 'https://github.com/goktas-batuhan/mozaik-site'
export const LIVE_URL = 'https://goktas-batuhan.github.io/mozaik-site/'

/** Sayaçlar; sync üretir (src/data/summary.json), katalog ana pakete girmesin diye ayrı. */
export const stats = summary

/** "70 components · 3 variants · 1 block" */
export const countLine = (n: { components: number; variants: number; blocks: number }) =>
  [
    `${n.components} component${n.components === 1 ? '' : 's'}`,
    `${n.variants} variant${n.variants === 1 ? '' : 's'}`,
    `${n.blocks} block${n.blocks === 1 ? '' : 's'}`,
  ].join(' · ')
