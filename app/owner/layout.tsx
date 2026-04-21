'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, CalendarDays, TrendingUp, Users } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { useLocale } from '@/context/locale-context'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { role, isHydrated, logout } = useApp()
	const { t } = useLocale()
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

	const TABS = [
		{ key: 'overview', label: t.ownerTabOverview },
		{ key: 'halls', label: t.ownerTabHalls },
		{ key: 'bookings', label: t.ownerTabBookings },
		{ key: 'stats', label: t.ownerTabStats },
	]

	const KPIS = [
		{ label: t.kpiActiveHalls, value: '3', icon: Building2, change: '+12%', positive: true },
		{ label: t.kpiMonthlyBookings, value: '28', icon: CalendarDays, change: '-5%', positive: false },
		{ label: t.kpiTotalRevenue, value: '8.5M FCFA', icon: TrendingUp, change: '+23%', positive: true },
		{ label: t.kpiOccupancyRate, value: '76%', icon: Users, change: '+8%', positive: true },
	]

	return (
		<div className="min-h-screen bg-background">
			<DashboardHeader
				subtitle={t.ownerSpace}
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
