'use client'

import { Users, Globe, Star } from 'lucide-react'
import { halls } from '@/lib/mock-data'
import { useLocale } from '@/context/locale-context'

const owners = [
	{ id: 'o1', name: 'Kouamé Jean-Paul', halls: 3, revenue: '8.5M FCFA', status: 'active' as const },
	{ id: 'o2', name: 'Traoré Fatou', halls: 2, revenue: '5.2M FCFA', status: 'active' as const },
	{ id: 'o3', name: 'Koffi Akissi', halls: 1, revenue: '2.1M FCFA', status: 'pending' as const },
	{ id: 'o4', name: 'Bah Mohamed', halls: 4, revenue: '12.4M FCFA', status: 'active' as const },
]

const RANK_COLORS = ['#f4c430', '#c0c0c0', '#cd7f32']

export function AdminOverview() {
	const { t } = useLocale()

	const quickStats = [
		{ label: t.approvalRate, value: '94%', color: '#34d399' },
		{ label: t.avgResponseTime, value: '2.4h', color: '#60a5fa' },
		{ label: t.customerSatisfaction, value: '4.8/5', color: '#d4af37' },
		{ label: t.openDisputes, value: '3', color: '#f87171' },
	]

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Recent Owners */}
			<div
				className="rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-5">
					<Users className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						{t.recentOwners}
					</h2>
				</div>
				<ul className="space-y-3">
					{owners.map(owner => (
						<li key={owner.id} className="flex items-center gap-3">
							<div
								className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm text-black"
								style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
								aria-hidden="true"
							>
								{owner.name.charAt(0)}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-body font-semibold text-foreground truncate">{owner.name}</p>
								<p className="text-xs text-muted-foreground font-body">
									{owner.halls} {owner.halls > 1 ? t.hallPlural : t.hallSingular} · {owner.revenue}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Top Halls */}
			<div
				className="rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-5">
					<Globe className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						{t.topPerformingHalls}
					</h2>
				</div>
				<ul className="space-y-3">
					{halls.map((hall, i) => (
						<li key={hall.id} className="flex items-center gap-3">
							<span
								className="font-display text-lg font-bold w-7 text-center shrink-0"
								style={{ color: RANK_COLORS[i] ?? '#888' }}
							>
								{i + 1}
							</span>
							<img src={hall.image} alt={hall.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
							<div className="flex-1 min-w-0">
								<p className="text-sm font-body font-semibold text-foreground truncate">{hall.name}</p>
								<p className="text-xs text-muted-foreground font-body">{hall.location}</p>
							</div>
							<div
								className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-black"
								style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
							>
								<Star className="w-3 h-3 fill-current" />
								{hall.rating}
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Quick stats */}
			<div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
				{quickStats.map(({ label, value, color }) => (
					<div
						key={label}
						className="rounded-xl p-4 border text-center"
						style={{ background: 'var(--surface)', borderColor: 'rgba(212,175,55,0.1)' }}
					>
						<p className="font-display text-2xl font-bold mb-1" style={{ color }}>{value}</p>
						<p className="text-xs text-muted-foreground font-body">{label}</p>
					</div>
				))}
			</div>
		</div>
	)
}
