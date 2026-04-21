'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/app-context'
import { ClientPage } from '@/components/client/client-page'

export default function Home() {
  const { role, isHydrated } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (isHydrated && role) {
      router.replace(`/${role}`)
    }
  }, [role, isHydrated, router])

  return (
    <ClientPage
      isAuthenticated={false}
      onLogin={() => router.push('/login')}
    />
  )
}
