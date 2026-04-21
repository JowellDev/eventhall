'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, CalendarDays, TrendingUp, Users } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'

const TABS = [
	{ key: 'overview', label: "Vue d'ensemble" },
	{ key: 'halls', label: 'Mes Salles' },
	{ key: 'bookings', label: 'Réservations' },
	{ key: 'stats', label: 'Statistiques' },
]

const KPIS = [
	{
		label: 'Salles actives',
		value: '3',
		icon: Building2,
		change: '+12%',
		positive: true,
	},
	{
		label: 'Réservations ce mois',
		value: '28',
		icon: CalendarDays,
		change: '-5%',
		positive: false,
	},
	{
		label: 'Revenu total',
		value: '8.5M FCFA',
		icon: TrendingUp,
		change: '+23%',
		positive: true,
	},
	{
		label: "Taux d'occupation",
		value: '76%',
		icon: Users,
		change: '+8%',
		positive: true,
	},
]

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { role, isHydrated, logout } = useApp()
	const router = useRouter()

	useEffect(() => {
		if (!isHydrated) return
		if (!role) router.replace('/login')
		else if (role !== 'owner') router.replace(`/${role}`)
	}, [role, isHydrated, router])

	const handleLogout = () => {
		logout()
		router.push('/')
	}

	if (!isHydrated || !role) return null

	return (
		<div className="min-h-screen bg-background">
			<DashboardHeader
				subtitle="Espace Propriétaire"
				tabs={TABS}
				basePath="/owner"
				onLogout={handleLogout}
			/>
			<main className="max-w-7xl mx-auto px-4 py-4 md:py-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{KPIS.map(kpi => (
						<KpiCard key={kpi.label} {...kpi} />
					))}
				</div>
				{children}
			</main>
		</div>
	)
}
