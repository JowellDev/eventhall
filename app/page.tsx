'use client'

import { useState } from 'react'
import { ClientPage } from '@/components/client/client-page'
import { OwnerDashboard } from '@/components/owner/owner-dashboard'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { LoginModal } from '@/components/auth/login-modal'
import type { Role } from '@/types'

export default function Home() {
  const [role, setRole] = useState<Role | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  const handleLogin = (r: Role) => {
    setLoginOpen(false)
    setRole(r)
  }

  const handleLogout = () => setRole(null)

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
