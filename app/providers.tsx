'use client'

import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/context/app-context'
import { LanguageProvider } from '@/context/language-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={['dark', 'light']}
    >
      <AppProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </AppProvider>
    </ThemeProvider>
  )
}
