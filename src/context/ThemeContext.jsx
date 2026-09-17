import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('meridian-theme')
    return stored || 'dark'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    const resolvedTheme = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : theme
    root.classList.add(resolvedTheme)
    localStorage.setItem('meridian-theme', theme)
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: light)')
      const update = () => {
        root.classList.remove('dark', 'light')
        root.classList.add(media.matches ? 'light' : 'dark')
      }
      media.addEventListener?.('change', update)
      return () => media.removeEventListener?.('change', update)
    }
  }, [theme])

  const toggleTheme = () => {
    setIsTransitioning(true)
    setTheme(t => t === 'dark' ? 'light' : 'dark')
    window.setTimeout(() => setIsTransitioning(false), 520)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {isTransitioning && <div className="theme-wipe" aria-hidden="true" />}
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
