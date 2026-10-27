// Galeri kartlarının statik önizlemeleri: her öğe ve varyant için açık + koyu WebP
// (public/thumbs/<ad>[--<varyant>]-<tema>.webp). Vite geliştirme sunucusunda /thumb/<demo>
// sayfasını Playwright ile açar, kartın kutusunu çeker, PNG'yi tarayıcıda WebP'ye çevirir.
// Artımlı: public/thumbs/manifest.json'daki sync hash'i değişmeyen öğe atlanır. --full hepsini çeker.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'public/thumbs')
const manifestPath = path.join(out, 'manifest.json')
const full = process.argv.includes('--full')
const port = Number(process.env.THUMBS_PORT ?? 5281)

const index = JSON.parse(readFileSync(path.join(root, 'src/data/index.json'), 'utf8'))
const state = JSON.parse(readFileSync(path.join(root, 'src/data/sync-state.json'), 'utf8'))
mkdirSync(out, { recursive: true })
const manifest = existsSync(manifestPath) && !full ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}

const jobs = index.flatMap((c) => [c.name, ...c.variants.map((v) => `${c.name}~${v.name}`)])
const todo = jobs.filter((key) => {
  const name = key.split('~')[0]
  const file = key.replace('~', '--')
  return manifest[key] !== state[name]?.hash || !['dark', 'light'].every((t) => existsSync(path.join(out, `${file}-${t}.webp`)))
})
console.log(`thumbs: ${jobs.length} önizleme, ${todo.length} çekilecek`)

if (todo.length) {
  const server = spawn('npx', ['vite', '--port', String(port), '--strictPort'], { cwd: root, shell: true, stdio: 'ignore' })
  try {
    // Sunucu hazır olana kadar yokla.
    for (let i = 0; ; i++) {
      if (i > 120) throw new Error('vite açılmadı')
      const ok = await fetch(`http://localhost:${port}/`).then((r) => r.ok, () => false)
      if (ok) break
      await new Promise((r) => setTimeout(r, 500))
    }
    const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
    const context = await browser.newContext({ viewport: { width: 400, height: 224 }, deviceScaleFactor: 1.5, reducedMotion: 'no-preference' })
    let done = 0
    for (const key of todo) {
      const file = key.replace('~', '--')
      for (const theme of ['dark', 'light']) {
        const page = await context.newPage()
        // Tema sağlayıcısı kayıtlı temayı okur; sınıfı elle değiştirmek yetmiyor.
        await page.addInitScript((t) => localStorage.setItem('mozaik-theme', t), theme)
        await page.goto(`http://localhost:${port}/thumb/${encodeURIComponent(key)}?theme=${theme}`)
        const frame = page.locator('[data-thumb]')
        await frame.waitFor()
        await page.waitForFunction(() => !document.body.textContent?.includes('Loading preview'), null, { timeout: 15_000 }).catch(() => {})
        // Giriş animasyonları otursun.
        await page.waitForTimeout(1800)
        const png = (await frame.screenshot()).toString('base64')
        const webp = await page.evaluate(async (data) => {
          const blob = await (await fetch(`data:image/png;base64,${data}`)).blob()
          const bitmap = await createImageBitmap(blob)
          const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
          canvas.getContext('2d').drawImage(bitmap, 0, 0)
          const out = await canvas.convertToBlob({ type: 'image/webp', quality: 0.72 })
          const bytes = new Uint8Array(await out.arrayBuffer())
          let s = ''
          for (const b of bytes) s += String.fromCharCode(b)
          return btoa(s)
        }, png)
        writeFileSync(path.join(out, `${file}-${theme}.webp`), Buffer.from(webp, 'base64'))
        await page.close()
      }
      manifest[key] = state[key.split('~')[0]]?.hash
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
      if (++done % 10 === 0) console.log(`thumbs: ${done}/${todo.length}`)
    }
    await browser.close()
  } finally {
    server.kill()
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { shell: true })
  }
}
console.log('thumbs: tamam')
