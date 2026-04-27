'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { fr } from '@/lib/i18n/fr'
import { en } from '@/lib/i18n/en'
import type { TranslationKey } from '@/lib/i18n/fr'

type Locale = 'fr' | 'en'

const DICTIONARIES = { fr, en } as const

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const stored = localStorage.getItem('eventhall-locale') as Locale | null
    if (stored === 'fr' || stored === 'en') setLocaleState(stored)
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    localStorage.setItem('eventhall-locale', next)
  }

  const t = (key: TranslationKey): string => DICTIONARIES[locale][key] as string

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
