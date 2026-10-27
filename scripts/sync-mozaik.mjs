// Mozaik registry'sini siteye kurar: her öğe `shadcn add` ile src/components/mozaik/'e,
// demolar src/demos/'a, meta + vurgulanmış kod src/data/'ya, arama indeksi public/'e.
// Artımlı: öğenin registry JSON'u + demosu + varyantları src/data/sync-state.json'daki
// hash'le aynıysa yeniden kurulmaz. `npm run sync -- --full` hepsini kurar.
// Kaynak: MOZAIK_REGISTRY (URL, ör. https://raw.githubusercontent.com/goktas-batuhan/mozaik/main/public)
// yoksa ../mozaik/public yerel sunucuyla açılır.
import { exec } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { createHighlighter } from 'shiki'
import { serveRegistry } from './serve-registry.mjs'

const root = path.resolve(import.meta.dirname, '..')
const full = process.argv.includes('--full')
const remote = process.env.MOZAIK_REGISTRY
let server
let base = remote
if (!remote) {
  server = await serveRegistry(path.resolve(root, '../mozaik/public'))
  base = 'http://localhost:4599'
}

const dataDir = path.join(root, 'src/data')
const demosDir = path.join(root, 'src/demos')
const docsDir = path.join(root, 'src/data/docs')
const componentsDir = path.join(root, 'src/components/mozaik')
const statePath = path.join(dataDir, 'sync-state.json')

const exportName = (name) => name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())

/** Varyantın kullanım satırı: prop seti JSX özniteliklerine çevrilir. Demo VariantPreview veriyorsa
 * component içerik bekler (`content`); kullanımda yeri yorumla gösterilir. */
function variantUsage(name, props, content) {
  const attrs = Object.entries(props).map(([k, v]) =>
    v === true ? k : typeof v === 'string' && !v.includes('"') ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`,
  )
  const tag = exportName(name)
  const open = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`
  const line = content ? `(\n    ${open}>\n      {/* your content, as in the demo */}\n    </${tag}>\n  )` : `${open} />`
  return `import { ${tag} } from '@/components/${name}'\n\nexport function Example() {\n  return ${line}\n}\n`
}

try {
  const [index, taxonomy] = await Promise.all(
    ['index.json', 'taxonomy.json'].map(async (f) => (await fetch(`${base}/r/${f}`)).json()),
  )
  // /components/<grup> ile /components/<ad> aynı yolu paylaşır: adlar çakışmamalı.
  const groupIds = new Set([...taxonomy.groups, ...taxonomy.blocks].map((g) => g.id))
  const clash = index.filter((m) => groupIds.has(m.name)).map((m) => m.name)
  if (clash.length) throw new Error(`öğe adı grup adıyla çakışıyor: ${clash.join(', ')}`)

  const state = existsSync(statePath) && !full ? JSON.parse(readFileSync(statePath, 'utf8')) : {}
  const next = {}
  const changed = []
  for (const m of index) {
    const json = await (await fetch(`${base}/r/${m.name}.json`)).text()
    const hash = createHash('sha1').update(json).update(m.demo).update(JSON.stringify(m.variants ?? [])).digest('hex').slice(0, 16)
    next[m.name] = { hash, files: m.files.map((f) => path.basename(f)) }
    const installed = m.files.every((f) => existsSync(path.join(componentsDir, path.basename(f))))
    if (state[m.name]?.hash !== hash || !installed || !existsSync(path.join(docsDir, `${m.name}.json`))) changed.push(m)
  }
  console.log(`sync: ${index.length} öğe, ${changed.length} değişmiş, kaynak ${base}`)

  // Asenkron: yerel sunucu bu süreçte, execSync onu kilitler.
  const run = promisify(exec)
  for (let i = 0; i < changed.length; i += 12) {
    const urls = changed.slice(i, i + 12).map((m) => `${base}/r/${m.name}.json`).join(' ')
    await run(`npx shadcn add ${urls} --yes --overwrite`, { cwd: root, timeout: 300_000 })
    console.log(`sync: ${Math.min(i + 12, changed.length)}/${changed.length} kuruldu`)
  }

  // Registry'den çıkan öğelerin dosyaları silinir.
  for (const [name, { files = [] }] of Object.entries(state)) {
    if (next[name]) continue
    for (const f of files) rmSync(path.join(componentsDir, f), { force: true })
    rmSync(path.join(demosDir, `${name}.tsx`), { force: true })
    rmSync(path.join(docsDir, `${name}.json`), { force: true })
    console.log(`sync: ${name} kaldırıldı`)
  }

  mkdirSync(demosDir, { recursive: true })
  mkdirSync(docsDir, { recursive: true })
  if (changed.length) {
    const highlighter = await createHighlighter({
      themes: ['github-light', 'github-dark-default'],
      langs: ['tsx', 'bash', 'json'],
    })
    const highlight = (code) =>
      highlighter.codeToHtml(code.trimEnd(), {
        lang: 'tsx',
        themes: { light: 'github-light', dark: 'github-dark-default' },
        defaultColor: false,
      })

    for (const m of changed) {
      // Demo, component'i ./<ad> ile, başka öğeleri @/components/<ad> ile çağırır; sitede kurulu kopyaya yönlendir.
      const demo = m.demo
        .replace(/from '\.\/([\w-]+)'/g, "from '@/components/mozaik/$1'")
        .replace(/from '@\/components\/(?!mozaik\/)([\w-]+)'/g, "from '@/components/mozaik/$1'")
      writeFileSync(path.join(demosDir, `${m.name}.tsx`), demo)

      const files = m.files.map((f) => {
        const file = path.basename(f)
        const code = readFileSync(path.join(componentsDir, file), 'utf8').replaceAll('@/components/mozaik/', '@/components/')
        return { name: file, lines: code.split('\n').length, html: highlight(code), raw: code }
      })
      const usage = demo.replace(/@\/components\/mozaik\//g, '@/components/')
      const variants = (m.variants ?? []).map((v) => {
        const raw = variantUsage(m.name, v.props, /export function VariantPreview\b/.test(m.demo))
        return { name: v.name, html: highlight(raw), raw }
      })
      writeFileSync(
        path.join(docsDir, `${m.name}.json`),
        JSON.stringify({ props: m.props ?? [], files, usage: highlight(usage), usageRaw: usage, variants }),
      )
    }
  }

  const list = index.map((m) => ({
    name: m.name,
    title: m.title,
    description: m.description,
    group: m.group,
    shelf: m.shelf,
    layer: m.layer,
    status: m.status,
    tags: m.tags ?? [],
    keywords: m.keywords ?? [],
    source: m.source,
    dependencies: m.dependencies ?? [],
    registryDependencies: m.registryDependencies ?? [],
    added: m.added,
    variants: (m.variants ?? []).map(({ name, title, description, props, status }) => ({ name, title, description, props, status })),
  }))
  writeFileSync(path.join(dataDir, 'index.json'), JSON.stringify(list, null, 2) + '\n')
  writeFileSync(path.join(dataDir, 'taxonomy.json'), JSON.stringify(taxonomy, null, 2) + '\n')

  // ⌘K araması için küçük indeks: ilk açılışta istenir, ana pakete girmez.
  const search = list.flatMap((m) => [
    { kind: m.layer, name: m.name, title: m.title, group: m.group, shelf: m.shelf, text: [m.description, ...m.tags, ...m.keywords].join(' ') },
    ...m.variants.map((v) => ({ kind: 'variant', name: m.name, variant: v.name, title: `${m.title} · ${v.title}`, group: m.group, shelf: m.shelf, text: v.description })),
  ])
  // Gruplar ve raflar da aranır (boş olanlar sitede gizli, aramada da yok).
  for (const section of ['components', 'blocks']) {
    const items = list.filter((m) => (m.layer === 'block' ? 'blocks' : 'components') === section)
    for (const g of section === 'blocks' ? taxonomy.blocks : taxonomy.groups) {
      if (!items.some((m) => m.group === g.id)) continue
      search.push({ kind: 'group', name: `/${section}/${g.id}`, title: g.label, group: g.id, text: g.blurb })
      for (const s of g.shelves) {
        if (items.some((m) => m.group === g.id && m.shelf === s.id))
          search.push({ kind: 'shelf', name: `/${section}/${g.id}/${s.id}`, title: `${g.label} · ${s.label}`, group: g.id, shelf: s.id, text: '' })
      }
    }
  }
  writeFileSync(path.join(root, 'public/search-index.json'), JSON.stringify(search))
  // Ana paketteki sayaçlar: katalog (index.json) ana pakete girmesin.
  const summary = {
    total: list.length,
    components: list.filter((m) => m.layer === 'component').length,
    blocks: list.filter((m) => m.layer === 'block').length,
    variants: list.reduce((n, m) => n + m.variants.length, 0),
    groups: taxonomy.groups.filter((g) => list.some((m) => m.layer === 'component' && m.group === g.id)).length,
    stable: list.filter((m) => m.status === 'stable').length,
    sources: new Set(list.flatMap((m) => (m.source === 'original' ? [] : [m.source.repo]))).size,
  }
  writeFileSync(path.join(dataDir, 'summary.json'), JSON.stringify(summary, null, 2) + '\n')
  writeFileSync(statePath, JSON.stringify(next, null, 2) + '\n')
  console.log(`sync: ${list.length} öğe yazıldı, ${changed.length} doküman yenilendi`)
} finally {
  server?.close()
}
