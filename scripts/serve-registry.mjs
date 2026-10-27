// ../mozaik/public'i küçük bir statik sunucuyla açar; sync yerelde shadcn add'i buna yönlendirir.
// Bloklar başka öğelere GitHub raw URL'siyle bağlı: yerelde o adresler bu sunucuya çevrilir.
import { existsSync, readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'

const RAW = 'https://raw.githubusercontent.com/goktas-batuhan/mozaik/main/public'

export function serveRegistry(dir, port = 4599) {
  const server = createServer((req, res) => {
    const file = path.join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!file.startsWith(dir) || !existsSync(file)) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(readFileSync(file, 'utf8').replaceAll(RAW, `http://localhost:${port}`))
  })
  return new Promise((resolve) => server.listen(port, () => resolve(server)))
}
