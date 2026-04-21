'use client'

import { AppProvider } from '@/context/app-context'
import { ThemeProvider } from '@/context/theme-context'
import { LocaleProvider } from '@/context/locale-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppProvider>{children}</AppProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
