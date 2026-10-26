import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { MOZAIK_REPO, stats } from './data'
import { profile } from './profile'
import { useTheme } from './theme'
import { buttonStyles, GithubIcon } from './ui'

const NAV = [
  { to: '/components', label: 'Components' },
  { to: '/about', label: 'About' },
]

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-semibold tracking-tight', className)}>
      <svg viewBox="0 0 24 24" aria-hidden className="size-6">
        <rect x="2" y="2" width="9" height="9" rx="2.5" className="fill-primary" />
        <rect x="13" y="2" width="9" height="9" rx="4.5" className="fill-foreground/80" />
        <rect x="2" y="13" width="9" height="9" rx="4.5" className="fill-foreground/35" />
        <rect x="13" y="13" width="9" height="9" rx="2.5" className="fill-foreground/80" />
      </svg>
      Mozaik
    </span>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonStyles.icon}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        // Blur hep açık: scroll başlarken açılınca yeni katman kuruluyor ve ilk 5-6 kare düşüyordu.
        // Tepede arkası boş olduğundan görünmez.
        'sticky top-0 z-50 border-b backdrop-blur-sm transition-colors',
        scrolled || open ? 'border-border bg-background/90' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="rounded-md" aria-label="Mozaik home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a href={MOZAIK_REPO} className={buttonStyles.icon} aria-label="Mozaik on GitHub" target="_blank" rel="noreferrer">
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className={cn(buttonStyles.icon, 'md:hidden')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-accent">
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-32 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            {stats.total} React components in one design language. Install any of them with one command and own the code.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium">Site</p>
          <ul className="space-y-2 text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium">Source</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href={MOZAIK_REPO} className="hover:text-foreground">
                Component registry
              </a>
            </li>
            <li>
              <a href="https://github.com/goktas-batuhan/mozaik-site" className="hover:text-foreground">
                This website
              </a>
            </li>
            <li>
              <a href={`${MOZAIK_REPO}/blob/main/CREDITS.md`} className="hover:text-foreground">
                Licenses and credits
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-muted-foreground sm:px-6">
        Built by {profile.name} with React, Tailwind CSS and Motion.
      </div>
    </footer>
  )
}

export function Layout() {
  // ScrollRestoration sunucuda inline <script> çizer; hydrate uyumsuzluğu olmasın diye mount sonrası.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {mounted && <ScrollRestoration />}
    </div>
  )
}
