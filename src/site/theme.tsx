import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })

const read = (): Theme => {
  try {
    const saved = localStorage.getItem('mozaik-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // depolama kapalı olabilir
  }
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Prerender HTML koyu üretilir; hydrate uyumsuzluğu olmasın diye kayıtlı tema mount'ta okunur.
  const [theme, setTheme] = useState<Theme>('dark')
  const loaded = useRef(false)

  useLayoutEffect(() => {
    setTheme(read())
  }, [])

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      return
    }
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('mozaik-theme', theme)
    } catch {
      // yok say
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
