// Her rotayı derleme anında HTML'e çevirir: ilk boyama JS'i beklemez, her sayfanın kendi
// başlığı ve açıklaması olur. İstemci aynı içeriği createRoot ile devralır.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const index = JSON.parse(readFileSync(path.join(root, 'src/data/index.json'), 'utf8'))
const taxonomy = JSON.parse(readFileSync(path.join(root, 'src/data/taxonomy.json'), 'utf8'))
// İlk ekranın fontları: geç gelip metni yeniden çizmesinler (LCP).
const fonts = readdirSync(path.join(dist, 'assets')).filter((f) =>
  /^(geist-latin-wght-normal|instrument-serif-latin-400-italic)-.*\.woff2$/.test(f),
)
const base = process.env.BASE_PATH ?? '/'
const link = (f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${base}assets/${f}" />`
// Serif yalnız ana sayfanın başlığında; başka sayfada ön yüklemesi LCP görseliyle yarışıyordu.
const serif = fonts.filter((f) => f.startsWith('instrument-serif')).map(link).join('\n    ')
const preload = fonts.filter((f) => !f.startsWith('instrument-serif')).map(link).join('\n    ')
// Stil dosyası satır içine alınır: mobilde ayrı istek ilk boyamayı ~300 ms bekletiyordu (Lighthouse).
// Font adresleri mutlak (base ile), satır içinde de doğru çözülür.
const inlineCss = (html) =>
  html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => {
    const css = readFileSync(path.join(dist, href.slice(base.length)), 'utf8')
    return `<style>${css}</style>`
  })
const template = inlineCss(readFileSync(path.join(dist, 'index.html'), 'utf8').replace('</title>', `</title>\n    ${preload}`))

const DEFAULT = 'Animated React components in one design language. Accessible, reduced-motion safe, copied as plain source.'
const sectionOf = (c) => (c.layer === 'block' ? 'blocks' : 'components')
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`
// Boş grup ve raf sayfası üretilmez (sitede de gizli).
const treePages = ['components', 'blocks'].flatMap((section) => {
  const items = index.filter((c) => sectionOf(c) === section)
  return (section === 'blocks' ? taxonomy.blocks : taxonomy.groups).flatMap((g) => {
    const inGroup = items.filter((c) => c.group === g.id)
    if (!inGroup.length) return []
    return [
      { url: `/${section}/${g.id}`, title: `${g.label} · Mozaik`, description: `${g.blurb} ${plural(inGroup.length, section === 'blocks' ? 'block' : 'component')}.` },
      ...g.shelves
        .filter((s) => inGroup.some((c) => c.shelf === s.id))
        .map((s) => ({ url: `/${section}/${g.id}/${s.id}`, title: `${s.label} · ${g.label} · Mozaik`, description: g.blurb })),
    ]
  })
})
const counts = `${plural(index.filter((c) => c.layer === 'component').length, 'component')}, ${plural(index.reduce((n, c) => n + c.variants.length, 0), 'variant')} and ${plural(index.filter((c) => c.layer === 'block').length, 'block')}`
const pages = [
  { url: '/', title: 'Mozaik · Animated React components', description: DEFAULT },
  { url: '/components', title: 'Components · Mozaik', description: `${counts}, sorted into ${taxonomy.groups.filter((g) => index.some((c) => c.layer === 'component' && c.group === g.id)).length} groups. Accessible and reduced-motion safe.` },
  { url: '/blocks', title: 'Blocks · Mozaik', description: 'Page sections built from Mozaik components: heroes, features, pricing and more.' },
  { url: '/about', title: 'About · Mozaik', description: 'The person behind Mozaik and what the project shows.' },
  ...treePages,
  ...index.map((c) => ({ url: `/${sectionOf(c)}/${c.name}`, title: `${c.title} · Mozaik`, description: c.description })),
]

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

for (const page of pages) {
  const html = await render(page.url)
  const out = (page.url === '/' ? template.replace(preload, `${preload}\n    ${serif}`) : template)
    .replace(/<title>.*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const file = page.url === '/' ? path.join(dist, 'index.html') : path.join(dist, page.url, 'index.html')
  mkdirSync(path.dirname(file), { recursive: true })
  writeFileSync(file, out)
}

// GitHub Pages bilinmeyen yolda 404.html döner: boş kabuk, istemci yönlendirici sayfayı çizer.
writeFileSync(path.join(dist, '404.html'), template)
writeFileSync(path.join(dist, '.nojekyll'), '')

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${pages.length} sayfa`)
