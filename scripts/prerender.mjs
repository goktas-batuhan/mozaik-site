// Her rotayı derleme anında HTML'e çevirir: ilk boyama JS'i beklemez, her sayfanın kendi
// başlığı ve açıklaması olur. İstemci aynı içeriği createRoot ile devralır.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const index = JSON.parse(readFileSync(path.join(root, 'src/data/index.json'), 'utf8'))
// İlk ekranın fontları: geç gelip metni yeniden çizmesinler (LCP).
const fonts = readdirSync(path.join(dist, 'assets')).filter((f) =>
  /^(geist-latin-wght-normal|instrument-serif-latin-400-italic)-.*\.woff2$/.test(f),
)
const base = process.env.BASE_PATH ?? '/'
const preload = fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${base}assets/${f}" />`).join('\n    ')
const template = readFileSync(path.join(dist, 'index.html'), 'utf8').replace('</title>', `</title>\n    ${preload}`)

const DEFAULT = 'Animated React components in one design language. Accessible, reduced-motion safe, installable with the shadcn CLI.'
const pages = [
  { url: '/', title: 'Mozaik · Animated React components', description: DEFAULT },
  { url: '/components', title: 'Components · Mozaik', description: `${index.length} animated React components across text, backgrounds, cursor, layout, feedback, blocks and on-chain.` },
  { url: '/about', title: 'About · Mozaik', description: 'The person behind Mozaik and what the project shows.' },
  ...index.map((c) => ({ url: `/components/${c.name}`, title: `${c.title} · Mozaik`, description: c.description })),
]

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

for (const page of pages) {
  const html = await render(page.url)
  const out = template
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
