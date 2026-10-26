import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages alt dizini için BASE_PATH=/mozaik-site/; Vercel'de kök.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  // Prerender HTML ilk boyamayı taşıyor; JS parçaları head'de öne çekilip ilk boyamayla yarışmasın.
  build: { modulePreload: false },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
