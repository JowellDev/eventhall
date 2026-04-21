'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/app-context'
import { LoginModal } from '@/components/auth/login-modal'
import type { Role } from '@/types'

export default function LoginPage() {
	const { role, isHydrated } = useApp()
	const router = useRouter()

	useEffect(() => {
		if (isHydrated && role) {
			router.replace(`/${role}`)
		}
	}, [role, isHydrated, router])

	const handleLogin = (r: Role) => {
		router.push(`/${r}`)
	}

	return (
		<div className="min-h-screen bg-background">
			<LoginModal
				open={true}
				onClose={() => router.push('/')}
				onLogin={handleLogin}
			/>
		</div>
	)
}
