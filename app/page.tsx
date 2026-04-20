'use client'

import { useState } from 'react'
import { AppProvider, useApp } from '@/context/app-context'
import { ClientPage } from '@/components/client/client-page'
import { OwnerDashboard } from '@/components/owner/owner-dashboard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { LoginModal } from '@/components/auth/login-modal'
import type { Role } from '@/types'

function AppContent() {
  const { role, logout } = useApp()
  const [loginOpen, setLoginOpen] = useState(false)

  const handleLogin = (_r: Role) => setLoginOpen(false)
  const handleLogout = () => logout()

  if (role === 'owner') {
    return <OwnerDashboard onLogout={handleLogout} />
  }

  if (role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <>
      <ClientPage
        isAuthenticated={role === 'client'}
        onLogin={() => setLoginOpen(true)}
        onLogout={handleLogout}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
