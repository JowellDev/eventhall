'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, CalendarDays, TrendingUp, UserCog, ShieldCheck } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { useLocale } from '@/context/locale-context'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'

const AdminBadge = ({ label }: { label: string }) => (
	<div
		className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-body font-semibold"
		style={{
			background: 'rgba(212,175,55,0.15)',
			border: '1px solid rgba(212,175,55,0.3)',
			color: '#d4af37',
		}}
	>
		<ShieldCheck className="w-3 h-3" />
		{label}
	</div>
)

export default function AdminLayout({
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
		else if (role !== 'admin') router.replace(`/${role}`)
	}, [role, isHydrated, router])

	const handleLogout = () => {
		logout()
		router.push('/')
	}

	if (!isHydrated || !role) return null

	const TABS = [
		{ key: 'overview', label: t.adminTabOverview },
		{ key: 'owners', label: t.adminTabOwners },
		{ key: 'halls', label: t.adminTabHalls },
		{ key: 'analytics', label: t.adminTabAnalytics },
	]

	const KPIS = [
		{ label: t.kpiActiveOwners, value: '45', icon: UserCog, change: '+8%', positive: true },
		{ label: t.kpiTotalHalls, value: '128', icon: Building2, change: '+15%', positive: true },
		{ label: t.kpiBookings30d, value: '856', icon: CalendarDays, change: '+32%', positive: true },
		{ label: t.kpiPlatformRevenue, value: '42.8M FCFA', icon: TrendingUp, change: '+19%', positive: true },
	]

	return (
		<div className="min-h-screen bg-background">
			<DashboardHeader
				badge={<AdminBadge label={t.superAdmin} />}
				tabs={TABS}
				basePath="/admin"
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
