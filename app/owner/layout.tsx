'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, CalendarDays, TrendingUp, Users } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { useLanguage } from '@/context/language-context'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'

export default function OwnerLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { role, isHydrated, logout } = useApp()
	const { t } = useLanguage()
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
		{ key: 'overview', label: t('owner.overview') },
		{ key: 'halls', label: t('owner.halls') },
		{ key: 'bookings', label: t('owner.bookings') },
		{ key: 'stats', label: t('owner.stats') },
	]

	const KPIS = [
		{
			label: t('owner.kpi.activeHalls'),
			value: '3',
			icon: Building2,
			change: '+12%',
			positive: true,
		},
		{
			label: t('owner.kpi.monthlyBookings'),
			value: '28',
			icon: CalendarDays,
			change: '-5%',
			positive: false,
		},
		{
			label: t('owner.kpi.totalRevenue'),
			value: '8.5M FCFA',
			icon: TrendingUp,
			change: '+23%',
			positive: true,
		},
		{
			label: t('owner.kpi.occupancyRate'),
			value: '76%',
			icon: Users,
			change: '+8%',
			positive: true,
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<DashboardHeader
				subtitle={t('owner.dashboard')}
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
