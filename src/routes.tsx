import type { RouteObject } from 'react-router'
import { Home } from './pages/Home'
import { Layout } from './site/layout'

// Vitrin hemen yüklenir; diğer sayfalar ilk ziyarette ayrı parça olarak gelir.
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/components', lazy: () => import('./pages/Gallery').then((m) => ({ Component: m.Gallery })) },
      {
        path: '/components/:name',
        lazy: () => import('./pages/ComponentPage').then((m) => ({ Component: m.ComponentPage })),
      },
      { path: '/credits', lazy: () => import('./pages/Credits').then((m) => ({ Component: m.Credits })) },
      { path: '/about', lazy: () => import('./pages/About').then((m) => ({ Component: m.About })) },
      { path: '*', lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })) },
    ],
  },
]
