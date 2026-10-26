import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import index from '@/data/index.json'

export type Layer = 'A' | 'B'
export type Status = 'stable' | 'beta'

export interface Source {
  repo: string
  license: string
  url: string
  note?: string
}

export interface ComponentEntry {
  name: string
  title: string
  description: string
  category: string
  layer: Layer
  status: Status
  tags: string[]
  source: 'original' | Source
  dependencies: string[]
}

export interface PropDoc {
  name: string
  type: string
  default?: string
  required?: boolean
  description?: string
}

export interface ComponentDoc {
  props: PropDoc[]
  files: { name: string; lines: number; html: string; raw: string }[]
  usage: string
  usageRaw: string
}

export const components = index as ComponentEntry[]

/** Router dışı düz <a> bağlantıları için taban yol (GitHub Pages alt dizini). */
export const withBase = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path

export const REGISTRY_URL = 'https://raw.githubusercontent.com/goktas-batuhan/mozaik/main/public/r'
export const GITHUB_URL = 'https://github.com/goktas-batuhan'
export const MOZAIK_REPO = 'https://github.com/goktas-batuhan/mozaik'
export const SITE_REPO = 'https://github.com/goktas-batuhan/mozaik-site'
export const LIVE_URL = 'https://goktas-batuhan.github.io/mozaik-site/'

export const CATEGORIES: { id: string; label: string; blurb: string }[] = [
  { id: 'text', label: 'Text', blurb: 'Letters that roll, scramble, reveal and shine.' },
  { id: 'background', label: 'Backgrounds', blurb: 'Quiet fields of light, grids and shaders behind your content.' },
  { id: 'cursor', label: 'Cursor', blurb: 'Pointer-aware pull and light. Off on touch screens.' },
  { id: 'interactive', label: 'Interactive', blurb: 'Buttons, cards and tabs with a bit of physics.' },
  { id: 'layout', label: 'Layout', blurb: 'Marquees, carousels, accordions and lists in motion.' },
  { id: 'feedback', label: 'Feedback', blurb: 'Loaders, skeletons and progress that say what is happening.' },
  { id: 'blocks', label: 'Blocks', blurb: 'Whole sections: hero and bento, slot-driven.' },
  { id: 'onchain', label: 'On-chain', blurb: 'Prices, addresses and transaction states. Data in, no RPC.' },
]

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id

export const byName = (name: string) => components.find((c) => c.name === name)

export const inCategoryOrder = [...components].sort(
  (a, b) =>
    CATEGORIES.findIndex((c) => c.id === a.category) - CATEGORIES.findIndex((c) => c.id === b.category) ||
    a.layer.localeCompare(b.layer) ||
    a.title.localeCompare(b.title),
)

const demoModules = import.meta.glob<{ default: ComponentType }>('../demos/*.tsx')
const docModules = import.meta.glob<{ default: ComponentDoc }>('../data/docs/*.json')

const demoCache = new Map<string, LazyExoticComponent<ComponentType>>()

/** Demo'yu ilk istendiğinde yükler; aynı component için aynı lazy nesnesi döner. */
export function getDemo(name: string) {
  let demo = demoCache.get(name)
  if (!demo) {
    const load = demoModules[`../demos/${name}.tsx`]
    if (!load) return null
    demo = lazy(load)
    demoCache.set(name, demo)
  }
  return demo
}

export async function loadDoc(name: string) {
  const load = docModules[`../data/docs/${name}.json`]
  return load ? (await load()).default : null
}

export const stats = {
  total: components.length,
  original: components.filter((c) => c.layer === 'A').length,
  adapted: components.filter((c) => c.layer === 'B').length,
  stable: components.filter((c) => c.status === 'stable').length,
  sources: new Set(components.flatMap((c) => (c.source === 'original' ? [] : [c.source.repo]))).size,
}
