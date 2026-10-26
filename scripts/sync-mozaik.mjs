// Mozaik registry'sini siteye kurar: her component `shadcn add` ile src/components/mozaik/'e,
// demolar src/demos/'a, meta + vurgulanmış kod src/data/'ya.
// Kaynak: MOZAIK_REGISTRY (URL, ör. https://raw.githubusercontent.com/goktas-batuhan/mozaik/main/public)
// yoksa ../mozaik/public yerel sunucuyla açılır.
import { exec } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { createHighlighter } from 'shiki'
import { serveRegistry } from './serve-registry.mjs'

const root = path.resolve(import.meta.dirname, '..')
const remote = process.env.MOZAIK_REGISTRY
let server
let base = remote
if (!remote) {
  server = await serveRegistry(path.resolve(root, '../mozaik/public'))
  base = 'http://localhost:4599'
}

try {
  const index = await (await fetch(`${base}/r/index.json`)).json()
  console.log(`sync: ${index.length} component, kaynak ${base}`)

  // Asenkron: yerel sunucu bu süreçte, execSync onu kilitler.
  const run = promisify(exec)
  for (let i = 0; i < index.length; i += 12) {
    const urls = index.slice(i, i + 12).map((m) => `${base}/r/${m.name}.json`).join(' ')
    await run(`npx shadcn add ${urls} --yes --overwrite`, { cwd: root, timeout: 300_000 })
    console.log(`sync: ${Math.min(i + 12, index.length)}/${index.length} kuruldu`)
  }

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

  const demosDir = path.join(root, 'src/demos')
  const docsDir = path.join(root, 'src/data/docs')
  rmSync(demosDir, { recursive: true, force: true })
  rmSync(docsDir, { recursive: true, force: true })
  mkdirSync(demosDir, { recursive: true })
  mkdirSync(docsDir, { recursive: true })

  const list = []
  for (const m of index) {
    // Demo, component'i ./<ad> ile çağırır; sitede kurulu kopyaya yönlendir.
    const demo = m.demo.replace(/from '\.\/([\w-]+)'/g, "from '@/components/mozaik/$1'")
    writeFileSync(path.join(demosDir, `${m.name}.tsx`), demo)

    const files = m.files.map((f) => {
      const file = path.basename(f)
      const code = readFileSync(path.join(root, 'src/components/mozaik', file), 'utf8')
      return { name: file, lines: code.split('\n').length, html: highlight(code), raw: code }
    })
    const usage = demo.replace(/@\/components\/mozaik\//g, '@/components/')
    writeFileSync(
      path.join(docsDir, `${m.name}.json`),
      JSON.stringify({ props: m.props ?? [], files, usage: highlight(usage), usageRaw: usage }),
    )

    list.push({
      name: m.name,
      title: m.title,
      description: m.description,
      category: m.category,
      layer: m.layer,
      status: m.status,
      tags: m.tags ?? [],
      source: m.source,
      dependencies: m.dependencies ?? [],
    })
  }
  writeFileSync(path.join(root, 'src/data/index.json'), JSON.stringify(list, null, 2) + '\n')
  console.log(`sync: ${list.length} demo ve doküman yazıldı`)
} finally {
  server?.close()
}
