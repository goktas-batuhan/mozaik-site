// GitHub Pages derlemesi: site /mozaik-site/ alt dizininde yayınlanır.
import { execSync } from 'node:child_process'

execSync('npm run build', { stdio: 'inherit', env: { ...process.env, BASE_PATH: '/mozaik-site/' } })
