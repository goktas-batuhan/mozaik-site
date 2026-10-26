import { useTitle } from '@/site/meta'
import { ButtonLink } from '@/site/ui'

export function NotFound() {
  useTitle('Not found')
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-40 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">This tile is missing.</h1>
      <p className="mt-4 text-muted-foreground">The page you are looking for does not exist or was renamed.</p>
      <ButtonLink to="/components" className="mt-8">
        Browse components
      </ButtonLink>
    </div>
  )
}
