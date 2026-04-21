import { BarChart3 } from 'lucide-react'
import { BarChart } from '@/components/shared/bar-chart'

const platformStats = [
	{ label: 'Jan', value: 62 },
	{ label: 'Fév', value: 75 },
	{ label: 'Mar', value: 68 },
	{ label: 'Avr', value: 91 },
	{ label: 'Mai', value: 84 },
	{ label: 'Jun', value: 97 },
]

const zones = [
	{ zone: 'Cocody', pct: 35 },
	{ zone: 'Plateau', pct: 25 },
	{ zone: 'Marcory', pct: 20 },
	{ zone: 'Yopougon', pct: 12 },
	{ zone: 'Autres', pct: 8 },
]

const eventTypes = [
	{ type: 'Mariage', count: 312, color: '#d4af37' },
	{ type: 'Anniversaire', count: 198, color: '#f4c430' },
	{ type: 'Corporate', count: 156, color: '#b8922a' },
	{ type: 'Baptême', count: 112, color: '#8b6914' },
	{ type: 'Autres', count: 78, color: '#5c4509' },
]

export function AdminAnalyticsTab() {
	return (
		<div className="space-y-6">
			<h2 className="font-display text-xl font-semibold text-foreground">
				Analytiques globales
			</h2>

			<div
				className="rounded-2xl p-6 border"
				style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-6">
					<BarChart3 className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h3 className="font-display text-base font-semibold text-foreground">
						Réservations mensuelles — 2025
					</h3>
				</div>
				<BarChart data={platformStats} height={180} showTopLabel />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				{/* Zone distribution */}
				<div
					className="rounded-2xl p-5 border"
					style={{
						background: '#1a1a1a',
						borderColor: 'rgba(212,175,55,0.12)',
					}}
				>
					<h3 className="font-display text-base font-semibold text-foreground mb-4">
						Répartition par zone
					</h3>
					<div className="space-y-3">
						{zones.map(({ zone, pct }) => (
							<div key={zone} className="space-y-1">
								<div className="flex justify-between text-xs font-body">
									<span className="text-muted-foreground">{zone}</span>
									<span className="text-foreground font-semibold">{pct}%</span>
								</div>
								<div
									className="h-1.5 rounded-full"
									style={{ background: '#111' }}
								>
									<div
										className="h-full rounded-full"
										style={{
											width: `${pct}%`,
											background: 'linear-gradient(90deg, #b8922a, #f4c430)',
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Event types */}
				<div
					className="rounded-2xl p-5 border"
					style={{
						background: '#1a1a1a',
						borderColor: 'rgba(212,175,55,0.12)',
					}}
				>
					<h3 className="font-display text-base font-semibold text-foreground mb-4">
						Types d&apos;événements
					</h3>
					<div className="space-y-3">
						{eventTypes.map(({ type, count, color }) => (
							<div key={type} className="flex items-center gap-3">
								<div
									className="w-3 h-3 rounded-full flex-shrink-0"
									style={{ background: color }}
									aria-hidden="true"
								/>
								<span className="text-sm font-body text-muted-foreground flex-1">
									{type}
								</span>
								<span className="text-sm font-semibold font-body text-foreground">
									{count}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
