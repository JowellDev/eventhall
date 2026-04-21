'use client'

import { useRouter } from 'next/navigation'
import { useApp } from '@/context/app-context'
import { ClientPage } from '@/components/client/client-page'

const DASHBOARD_HREF: Record<string, string> = {
  owner: '/owner',
  admin: '/admin',
}

export default function Home() {
  const { role, isHydrated, logout } = useApp()
  const router = useRouter()

  if (!isHydrated) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <ClientPage
      isAuthenticated={!!role}
      dashboardHref={role ? DASHBOARD_HREF[role] : undefined}
      onLogin={() => router.push('/login')}
      onLogout={role ? handleLogout : undefined}
    />
  )
}
