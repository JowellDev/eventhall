'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/theme-context'
import { useLocale } from '@/context/locale-context'

const btnStyle = {
  borderColor: 'rgba(212,175,55,0.2)',
  color: 'var(--muted-foreground)',
}

export function ThemeLocaleControls() {
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleTheme}
        className="p-1.5 rounded-lg border transition-colors hover:text-foreground"
        style={btnStyle}
        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
        className="px-2 py-1 rounded-lg border text-xs font-body font-semibold transition-colors hover:text-foreground"
        style={btnStyle}
        aria-label="Changer la langue"
      >
        {locale === 'fr' ? 'EN' : 'FR'}
      </button>
    </div>
  )
}
