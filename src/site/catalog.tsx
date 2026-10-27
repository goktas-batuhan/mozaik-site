// Öğe kataloğu (index.json + taxonomy.json): yalnız galeri, öğe sayfası ve ana sayfanın alt bölümü
// yükler; ana pakete girmez. Başlık ve sayaçlar data.ts'teki özetle yetinir.
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import index from '@/data/index.json'
import taxonomyJson from '@/data/taxonomy.json'

export type Layer = 'component' | 'block'
export type Status = 'stable' | 'beta'

export interface Source {
  repo: string
  license: string
  url: string
  note?: string
}

export interface VariantEntry {
  name: string
  title: string
  description: string
  props: Record<string, unknown>
  status: Status
}

export interface ComponentEntry {
  name: string
  title: string
  description: string
  group: string
  shelf: string
  layer: Layer
  status: Status
  tags: string[]
  keywords: string[]
  source: 'original' | Source
  dependencies: string[]
  registryDependencies: string[]
  added: string
  variants: VariantEntry[]
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
  variants: { name: string; html: string; raw: string }[]
}

export interface Shelf {
  id: string
  label: string
}

export interface Group {
  id: string
  label: string
  blurb: string
  shelves: Shelf[]
}

interface Taxonomy {
  groups: Group[]
  blocks: Group[]
  tags: Record<'trigger' | 'tech' | 'weight' | 'theme', string[]>
}

/** Ağaç sırasında (build-registry sıralar): grup → raf → başlık. */
export const components = index as ComponentEntry[]
export const taxonomy = taxonomyJson as Taxonomy

export type Section = 'components' | 'blocks'
export const sectionOf = (layer: Layer): Section => (layer === 'block' ? 'blocks' : 'components')

const inTree = (section: Section) => (section === 'blocks' ? taxonomy.blocks : taxonomy.groups)
const itemsOf = (section: Section) => components.filter((c) => sectionOf(c.layer) === section)

/** Boş raf ve boş grup gizlenir. */
export function tree(section: Section) {
  const items = itemsOf(section)
  return inTree(section)
    .map((g) => ({
      ...g,
      shelves: g.shelves.filter((s) => items.some((c) => c.group === g.id && c.shelf === s.id)),
      count: items.filter((c) => c.group === g.id).length,
      variants: items.filter((c) => c.group === g.id).reduce((n, c) => n + c.variants.length, 0),
    }))
    .filter((g) => g.count > 0)
}

export const findGroup = (section: Section, id: string) => inTree(section).find((g) => g.id === id)
export const groupLabel = (section: Section, id: string) => findGroup(section, id)?.label ?? id
export const shelfLabel = (section: Section, group: string, shelf: string) =>
  findGroup(section, group)?.shelves.find((s) => s.id === shelf)?.label ?? shelf

export const byName = (name: string) => components.find((c) => c.name === name)
export const itemPath = (c: Pick<ComponentEntry, 'name' | 'layer'>) => `/${sectionOf(c.layer)}/${c.name}`

export function itemsIn(section: Section, group?: string, shelf?: string) {
  return itemsOf(section).filter((c) => (!group || c.group === group) && (!shelf || c.shelf === shelf))
}

const demoModules = import.meta.glob<{ default: ComponentType; VariantPreview?: ComponentType<Record<string, unknown>> }>(
  '../demos/*.tsx',
)
const docModules = import.meta.glob<{ default: ComponentDoc }>('../data/docs/*.json')
const componentModules = import.meta.glob<Record<string, ComponentType<Record<string, unknown>>>>('../components/mozaik/*.tsx')

const demoCache = new Map<string, LazyExoticComponent<ComponentType>>()

/** Demo'yu ilk istendiğinde yükler; aynı demo için aynı lazy nesnesi döner. `name~variant` varyantı açar. */
export function getDemo(key: string) {
  let demo = demoCache.get(key)
  if (demo) return demo
  const [name, variant] = key.split('~')
  if (variant) {
    const props = byName(name)?.variants.find((v) => v.name === variant)?.props
    const load = componentModules[`../components/mozaik/${name}.tsx`]
    if (!props || !load) return null
    const exportName = name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase())
    // İçeriği JSX olan component'te demo dosyası VariantPreview verir (prop setini alır, içeriği ekler).
    const loadDemo = demoModules[`../demos/${name}.tsx`]
    demo = lazy(async () => {
      const Preview = (await loadDemo?.())?.VariantPreview ?? (await load())[exportName]
      return { default: () => <Preview {...props} /> }
    })
  } else {
    const load = demoModules[`../demos/${name}.tsx`]
    if (!load) return null
    demo = lazy(load)
  }
  demoCache.set(key, demo)
  return demo
}

export async function loadDoc(name: string) {
  const load = docModules[`../data/docs/${name}.json`]
  return load ? (await load()).default : null
}
