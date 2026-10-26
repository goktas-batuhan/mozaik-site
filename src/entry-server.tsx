import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from './routes'
import { ThemeProvider } from './site/theme'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

/** Derleme anında bir rotanın HTML'ini üretir; lazy parçaları da bekler (scripts/prerender.mjs). */
export async function render(url: string) {
  const handler = createStaticHandler(routes, { basename })
  const context = await handler.query(new Request(`http://localhost${basename === '/' ? '' : basename}${url}`))
  if (context instanceof Response) throw new Error(`${url}: beklenmeyen yönlendirme`)
  const router = createStaticRouter(handler.dataRoutes, context)
  const { prelude } = await prerender(
    <StrictMode>
      <ThemeProvider>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </ThemeProvider>
    </StrictMode>,
  )
  return new Response(prelude).text()
}
