'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

export function SettingsToggles() {
  const { resolvedTheme, setTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex items-center gap-1.5">
      {/* Theme toggle */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="p-1.5 rounded-lg border text-muted-foreground hover:text-foreground transition-colors"
        style={{ borderColor: 'rgba(212,175,55,0.2)' }}
        aria-label={t('settings.toggleTheme')}
        title={isDark ? t('settings.light') : t('settings.dark')}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Language toggle */}
      <button
        onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
        className="px-2 py-1 rounded-lg border text-xs font-semibold font-body text-muted-foreground hover:text-foreground transition-colors"
        style={{ borderColor: 'rgba(212,175,55,0.2)' }}
        aria-label={t('settings.toggleLang')}
        title={t('settings.toggleLang')}
      >
        {locale === 'fr' ? t('settings.en') : t('settings.fr')}
      </button>
    </div>
  )
}
