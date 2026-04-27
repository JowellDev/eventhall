'use client'

import { BarChart3, Activity, Star } from 'lucide-react'
import { BarChart } from '@/components/shared/bar-chart'
import { useLanguage } from '@/context/language-context'
import { halls } from '@/lib/mock-data'

const recentActivity = [
	{ textKey: 'Nouvelle réservation pour Le Grand Palais', time: 'Il y a 2h' },
	{ textKey: 'Paiement reçu de Bamba Seydou — 900,000 FCFA', time: 'Il y a 5h' },
	{ textKey: 'Avis 5 étoiles sur Espace Royal', time: 'Hier' },
	{ textKey: 'Réservation annulée — Villa Lumière', time: 'Hier' },
]

const REVENUE_VALUES = [65, 82, 45, 91, 78, 95, 60]
const RANK_COLORS = ['#f4c430', '#c0c0c0', '#cd7f32']

export function OwnerOverview() {
	const { t } = useLanguage()

	const revenueData = REVENUE_VALUES.map((value, i) => ({
		label: t(`days.${i}` as Parameters<typeof t>[0]),
		value,
	}))

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Revenue Chart */}
			<div
				className="lg:col-span-2 rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-6">
					<BarChart3 className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						{t('owner.revenue')}
					</h2>
				</div>
				<BarChart data={revenueData} height={140} />
			</div>

			{/* Activity Feed */}
			<div
				className="rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-5">
					<Activity className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						{t('owner.recentActivity')}
					</h2>
				</div>
				<ul className="space-y-4">
					{recentActivity.map((item, i) => (
						<li key={i} className="flex gap-3">
							<div
								className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
								style={{ background: '#d4af37' }}
								aria-hidden="true"
							/>
							<div>
								<p className="text-sm font-body text-foreground leading-snug">
									{item.textKey}
								</p>
								<p className="text-xs text-muted-foreground font-body mt-0.5">
									{item.time}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Top Halls */}
			<div
				className="lg:col-span-3 rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<h2 className="font-display text-base font-semibold text-foreground mb-4">
					{t('owner.topHalls')}
				</h2>
				<div className="space-y-3">
					{halls.map((hall, i) => (
						<div
							key={hall.id}
							className="flex items-center gap-4 p-3 rounded-xl"
							style={{ background: 'var(--surface)' }}
						>
							<span
								className="font-display text-2xl font-bold w-8 text-center"
								style={{ color: RANK_COLORS[i] ?? '#888' }}
							>
								{i + 1}
							</span>
							<img
								src={hall.image}
								alt={hall.name}
								className="w-12 h-12 rounded-lg object-cover"
							/>
							<div className="flex-1">
								<p className="font-body text-sm font-semibold text-foreground">
									{hall.name}
								</p>
								<p className="text-xs text-muted-foreground font-body">
									{hall.location}
								</p>
							</div>
							<div
								className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-black"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
								}}
							>
								<Star className="w-3 h-3 fill-current" />
								{hall.rating}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
