"use client"

import { useState } from "react"
import { ClientInterface } from "@/components/client-interface"
import { OwnerDashboard } from "@/components/owner-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LoginModal } from "@/components/login-modal"

type Role = "client" | "owner" | "admin" | null

export default function Home() {
  const [role, setRole] = useState<Role>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  const handleLogin = (r: "client" | "owner" | "admin") => {
    setLoginOpen(false)
    setRole(r)
  }

  const handleLogout = () => setRole(null)

  if (role === "owner") {
    return <OwnerDashboard onLogout={handleLogout} />
  }

  if (role === "admin") {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <>
      <ClientInterface
        isAuthenticated={role === "client"}
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
