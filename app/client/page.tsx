'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/app-context'
import { ClientPage } from '@/components/client/client-page'

export default function ClientDashboard() {
  const { role, isHydrated, logout } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return
    if (!role) router.replace('/login')
  }, [role, isHydrated, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isHydrated || !role) return null

  return (
    <ClientPage
      isAuthenticated={true}
      onLogin={() => router.push('/login')}
      onLogout={handleLogout}
    />
  )
}
