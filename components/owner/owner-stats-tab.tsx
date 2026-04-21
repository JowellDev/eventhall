'use client'

import { BarChart } from '@/components/shared/bar-chart'
import { halls } from '@/lib/mock-data'
import { useLocale } from '@/context/locale-context'

const revenueData = [
	{ label: 'Lun', value: 65 },
	{ label: 'Mar', value: 82 },
	{ label: 'Mer', value: 45 },
	{ label: 'Jeu', value: 91 },
	{ label: 'Ven', value: 78 },
	{ label: 'Sam', value: 95 },
	{ label: 'Dim', value: 60 },
]

export function OwnerStatsTab() {
	const { t } = useLocale()

	return (
		<div className="space-y-6">
			<h2 className="font-display text-xl font-semibold text-foreground">
				{t.statistics}
			</h2>

			<div
				className="rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<h3 className="font-display text-base font-semibold text-foreground mb-6">
					{t.weeklyRevenueTitle}
				</h3>
				<BarChart data={revenueData} height={180} showTopLabel />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{halls.map(hall => (
					<div
						key={hall.id}
						className="rounded-2xl p-5 border"
						style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
					>
						<h3 className="font-display text-sm font-bold text-foreground mb-3">
							{hall.name}
						</h3>
						<div className="space-y-2 text-sm font-body">
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t.occupancyRate}</span>
								<span className="text-foreground font-semibold">
									{70 + (hall.id.charCodeAt(0) % 20)}%
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t.bookings}</span>
								<span className="text-foreground font-semibold">
									{8 + parseInt(hall.id) * 4}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">{t.avgRating}</span>
								<span className="gold-gradient-text font-bold">{hall.rating}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
