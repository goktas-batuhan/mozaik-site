import type { RouteObject } from 'react-router'
import { Home } from './pages/Home'
import { Layout } from './site/layout'

const gallery = (section: 'components' | 'blocks') => () =>
  import('./pages/Gallery').then((m) => ({ Component: () => <m.Gallery section={section} /> }))
// /components/<x>: x bir grupsa galeri, değilse component sayfası (adlar grup adlarıyla çakışmaz; sync denetler).
const slug = (section: 'components' | 'blocks') => () =>
  import('./pages/Slug').then((m) => ({ Component: () => <m.Slug section={section} /> }))

// Vitrin hemen yüklenir; diğer sayfalar ilk ziyarette ayrı parça olarak gelir.
export const routes: RouteObject[] = [
  // Statik önizleme çekimi (scripts/thumbs.mjs); sitenin kabuğu olmadan.
  { path: '/thumb/:demo', lazy: () => import('./pages/Thumb').then((m) => ({ Component: m.Thumb })) },
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/components', lazy: gallery('components') },
      { path: '/components/:slug', lazy: slug('components') },
      { path: '/components/:group/:shelf', lazy: gallery('components') },
      { path: '/blocks', lazy: gallery('blocks') },
      { path: '/blocks/:slug', lazy: slug('blocks') },
      { path: '/blocks/:group/:shelf', lazy: gallery('blocks') },
      { path: '/about', lazy: () => import('./pages/About').then((m) => ({ Component: m.About })) },
      { path: '*', lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })) },
    ],
  },
]
