import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { routes } from './routes'
import { ThemeProvider } from './site/theme'

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' })

// Önceden üretilmiş HTML, rota parçası yüklenene kadar ekranda kalsın; boş kare görünmesin.
if (!router.state.initialized) {
  await new Promise<void>((resolve) => {
    const stop = router.subscribe((state) => {
      if (state.initialized) {
        stop()
        resolve()
      }
    })
  })
}

const app = (
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
const container = document.getElementById('root')!
// Prerender edilmiş sayfada mevcut HTML devralınır; geliştirme sunucusunda kök boştur.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
