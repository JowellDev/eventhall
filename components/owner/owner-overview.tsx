import { BarChart3, Activity, Star } from 'lucide-react'
import { BarChart } from '@/components/shared/bar-chart'
import { halls } from '@/lib/mock-data'

const revenueData = [
	{ label: 'Lun', value: 65 },
	{ label: 'Mar', value: 82 },
	{ label: 'Mer', value: 45 },
	{ label: 'Jeu', value: 91 },
	{ label: 'Ven', value: 78 },
	{ label: 'Sam', value: 95 },
	{ label: 'Dim', value: 60 },
]

const recentActivity = [
	{ text: 'Nouvelle réservation pour Le Grand Palais', time: 'Il y a 2h' },
	{ text: 'Paiement reçu de Bamba Seydou — 900,000 FCFA', time: 'Il y a 5h' },
	{ text: 'Avis 5 étoiles sur Espace Royal', time: 'Hier' },
	{ text: 'Réservation annulée — Villa Lumière', time: 'Hier' },
]

const RANK_COLORS = ['#f4c430', '#c0c0c0', '#cd7f32']

export function OwnerOverview() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Revenue Chart */}
			<div
				className="lg:col-span-2 rounded-2xl p-6 border"
				style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-6">
					<BarChart3 className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						Revenus — 7 derniers jours
					</h2>
				</div>
				<BarChart data={revenueData} height={140} />
			</div>

			{/* Activity Feed */}
			<div
				className="rounded-2xl p-6 border"
				style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<div className="flex items-center gap-2 mb-5">
					<Activity className="w-5 h-5" style={{ color: '#d4af37' }} />
					<h2 className="font-display text-base font-semibold text-foreground">
						Activité récente
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
									{item.text}
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
				style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
			>
				<h2 className="font-display text-base font-semibold text-foreground mb-4">
					Top Salles
				</h2>
				<div className="space-y-3">
					{halls.map((hall, i) => (
						<div
							key={hall.id}
							className="flex items-center gap-4 p-3 rounded-xl"
							style={{ background: '#111' }}
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
