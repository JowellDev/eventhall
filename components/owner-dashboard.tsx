'use client'

import { useState } from 'react'
import {
	Building2,
	CalendarDays,
	TrendingUp,
	Users,
	LogOut,
	CheckCircle2,
	XCircle,
	Eye,
	Pencil,
	Trash2,
	Star,
	BarChart3,
	Activity,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { halls, bookings, formatPrice } from '@/lib/mock-data'

interface OwnerDashboardProps {
	onLogout: () => void
}

type Tab = 'overview' | 'halls' | 'bookings' | 'stats'

const kpis = [
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

const revenueData = [
	{ day: 'Lun', value: 65 },
	{ day: 'Mar', value: 82 },
	{ day: 'Mer', value: 45 },
	{ day: 'Jeu', value: 91 },
	{ day: 'Ven', value: 78 },
	{ day: 'Sam', value: 95 },
	{ day: 'Dim', value: 60 },
]

const recentActivity = [
	{
		text: 'Nouvelle réservation pour Le Grand Palais',
		time: 'Il y a 2h',
		type: 'booking',
	},
	{
		text: 'Paiement reçu de Bamba Seydou — 900,000 FCFA',
		time: 'Il y a 5h',
		type: 'payment',
	},
	{ text: 'Avis 5 étoiles sur Espace Royal', time: 'Hier', type: 'review' },
	{ text: 'Réservation annulée — Villa Lumière', time: 'Hier', type: 'cancel' },
]

export function OwnerDashboard({ onLogout }: OwnerDashboardProps) {
	const [activeTab, setActiveTab] = useState<Tab>('overview')
	const [bookingStatuses, setBookingStatuses] = useState<
		Record<string, string>
	>(Object.fromEntries(bookings.map((b) => [b.id, b.status])))

	const updateBooking = (id: string, status: 'confirmed' | 'refused') => {
		setBookingStatuses((prev) => ({ ...prev, [id]: status }))
	}

	const tabs: { key: Tab; label: string }[] = [
		{ key: 'overview', label: "Vue d'ensemble" },
		{ key: 'halls', label: 'Mes Salles' },
		{ key: 'bookings', label: 'Réservations' },
		{ key: 'stats', label: 'Statistiques' },
	]

	const maxRevenue = Math.max(...revenueData.map((d) => d.value))

	return (
		<div className="min-h-screen bg-background">
			{/* Top Nav */}
			<header
				className="sticky top-0 z-40 border-b"
				style={{
					background: 'rgba(10,10,10,0.95)',
					backdropFilter: 'blur(20px)',
					borderColor: 'rgba(212,175,55,0.15)',
				}}
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div
							className="w-8 h-8 rounded-lg flex items-center justify-center"
							style={{
								background: 'linear-gradient(135deg, #d4af37, #f4c430)',
							}}
						>
							<Building2 className="w-4 h-4 text-black" />
						</div>
						<span className="font-display font-bold text-lg gold-gradient-text">
							EventHalls
						</span>
						<span className="hidden md:block text-muted-foreground text-sm font-body">
							/ Espace Propriétaire
						</span>
					</div>

					<nav className="hidden md:flex items-center gap-1">
						{tabs.map((tab) => (
							<button
								key={tab.key}
								onClick={() => setActiveTab(tab.key)}
								className="px-4 py-2 rounded-xl text-sm font-body font-medium transition-all"
								style={{
									background:
										activeTab === tab.key
											? 'rgba(212,175,55,0.12)'
											: 'transparent',
									color:
										activeTab === tab.key
											? '#d4af37'
											: 'var(--muted-foreground)',
									border:
										activeTab === tab.key
											? '1px solid rgba(212,175,55,0.2)'
											: '1px solid transparent',
								}}
							>
								{tab.label}
							</button>
						))}
					</nav>

					<button
						onClick={onLogout}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
						style={{ borderColor: 'rgba(212,175,55,0.2)' }}
					>
						<LogOut className="w-4 h-4" />
						<span className="hidden md:inline">Déconnexion</span>
					</button>
				</div>

				{/* Mobile tab nav */}
				<div className="md:hidden flex overflow-x-auto px-4 pb-3 gap-1">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all"
							style={{
								background:
									activeTab === tab.key
										? 'rgba(212,175,55,0.12)'
										: 'transparent',
								color:
									activeTab === tab.key ? '#d4af37' : 'var(--muted-foreground)',
								border:
									activeTab === tab.key
										? '1px solid rgba(212,175,55,0.2)'
										: '1px solid transparent',
							}}
						>
							{tab.label}
						</button>
					))}
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 py-8">
				{/* KPI Cards — always visible */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{kpis.map(({ label, value, icon: Icon, change, positive }) => (
						<div
							key={label}
							className="rounded-2xl p-5 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<div className="flex items-center justify-between mb-3">
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center"
									style={{ background: 'rgba(212,175,55,0.1)' }}
								>
									<Icon className="w-5 h-5" style={{ color: '#d4af37' }} />
								</div>
								<span
									className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full ${positive ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}
								>
									{change}
								</span>
							</div>
							<p className="font-display text-2xl font-bold gold-gradient-text mb-0.5">
								{value}
							</p>
							<p className="text-muted-foreground text-xs font-body">{label}</p>
						</div>
					))}
				</div>

				{/* Overview Tab */}
				{activeTab === 'overview' && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Revenue Chart */}
						<div
							className="lg:col-span-2 rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<div className="flex items-center gap-2 mb-6">
								<BarChart3 className="w-5 h-5" style={{ color: '#d4af37' }} />
								<h2 className="font-display text-base font-semibold text-foreground">
									Revenus — 7 derniers jours
								</h2>
							</div>
							<div className="flex items-end gap-2 h-40">
								{revenueData.map((d) => (
									<div
										key={d.day}
										className="flex-1 flex flex-col items-center gap-2"
									>
										<div
											className="w-full rounded-t-lg transition-all hover:opacity-90"
											style={{
												height: `${(d.value / maxRevenue) * 140}px`,
												background: `linear-gradient(to top, #b8922a, #d4af37, #f4c430)`,
												boxShadow: '0 -4px 20px rgba(212,175,55,0.2)',
											}}
										/>
										<span className="text-xs text-muted-foreground font-body">
											{d.day}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* Activity Feed */}
						<div
							className="rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
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

						{/* Top Halls Ranking */}
						<div
							className="lg:col-span-3 rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
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
											style={{
												color:
													i === 0 ? '#f4c430' : i === 1 ? '#c0c0c0' : '#cd7f32',
											}}
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
				)}

				{/* My Halls Tab */}
				{activeTab === 'halls' && (
					<div>
						<div className="flex items-center justify-between mb-6">
							<h2 className="font-display text-xl font-semibold text-foreground">
								Mes Salles
							</h2>
							<button
								className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								+ Ajouter une salle
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{halls.map((hall) => (
								<div
									key={hall.id}
									className="rounded-2xl overflow-hidden border"
									style={{
										background: '#1a1a1a',
										borderColor: 'rgba(212,175,55,0.12)',
									}}
								>
									<div className="relative h-44">
										<img
											src={hall.image}
											alt={hall.name}
											className="w-full h-full object-cover"
										/>
										<div
											className="absolute inset-0"
											style={{
												background:
													'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))',
											}}
											aria-hidden="true"
										/>
										<div
											className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-black"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											}}
										>
											<Star className="w-3 h-3 fill-current" />
											{hall.rating}
										</div>
									</div>
									<div className="p-4">
										<h3 className="font-display text-base font-bold text-foreground mb-1">
											{hall.name}
										</h3>
										<p className="text-muted-foreground text-sm font-body mb-4">
											{hall.location} · {hall.capacity} personnes
										</p>
										<div className="flex items-center gap-2">
											<button
												className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
											>
												<Eye className="w-3.5 h-3.5" /> Voir
											</button>
											<button
												className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
											>
												<Pencil className="w-3.5 h-3.5" /> Modifier
											</button>
											<button
												className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-red-500/50 hover:text-red-400 ml-auto"
												style={{
													borderColor: 'rgba(212,175,55,0.12)',
													color: 'var(--muted-foreground)',
												}}
											>
												<Trash2 className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Bookings Tab */}
				{activeTab === 'bookings' && (
					<div>
						<h2 className="font-display text-xl font-semibold text-foreground mb-6">
							Réservations
						</h2>
						<div className="space-y-4">
							{bookings.map((booking) => {
								const status = bookingStatuses[booking.id] || booking.status
								return (
									<div
										key={booking.id}
										className="rounded-2xl p-5 border"
										style={{
											background: '#1a1a1a',
											borderColor: 'rgba(212,175,55,0.12)',
										}}
									>
										<div className="flex flex-col md:flex-row md:items-center gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<h3 className="font-display text-base font-bold text-foreground">
														{booking.hallName}
													</h3>
													<span
														className="px-2.5 py-0.5 rounded-full text-xs font-semibold font-body"
														style={{
															background:
																status === 'confirmed'
																	? 'rgba(52,211,153,0.1)'
																	: status === 'refused'
																		? 'rgba(248,113,113,0.1)'
																		: 'rgba(212,175,55,0.1)',
															color:
																status === 'confirmed'
																	? '#34d399'
																	: status === 'refused'
																		? '#f87171'
																		: '#d4af37',
															border: `1px solid ${status === 'confirmed' ? 'rgba(52,211,153,0.3)' : status === 'refused' ? 'rgba(248,113,113,0.3)' : 'rgba(212,175,55,0.3)'}`,
														}}
													>
														{status === 'confirmed'
															? 'Confirmée'
															: status === 'refused'
																? 'Refusée'
																: 'En attente'}
													</span>
												</div>
												<p className="text-sm font-body text-muted-foreground">
													<strong className="text-foreground">
														{booking.client}
													</strong>{' '}
													· {booking.date} · {booking.time}
												</p>
												{booking.packages.length > 0 && (
													<p className="text-xs text-muted-foreground font-body mt-1">
														Options: {booking.packages.join(', ')}
													</p>
												)}
											</div>
											<div className="flex items-center gap-3">
												<span className="font-display text-lg font-bold gold-gradient-text">
													{formatPrice(booking.total)}
												</span>
												{status === 'pending' && (
													<div className="flex gap-2">
														<button
															onClick={() =>
																updateBooking(booking.id, 'confirmed')
															}
															className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all hover:opacity-90"
															style={{
																background: 'rgba(52,211,153,0.15)',
																color: '#34d399',
																border: '1px solid rgba(52,211,153,0.3)',
															}}
														>
															<CheckCircle2 className="w-3.5 h-3.5" /> Accepter
														</button>
														<button
															onClick={() =>
																updateBooking(booking.id, 'refused')
															}
															className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all hover:opacity-90"
															style={{
																background: 'rgba(248,113,113,0.1)',
																color: '#f87171',
																border: '1px solid rgba(248,113,113,0.3)',
															}}
														>
															<XCircle className="w-3.5 h-3.5" /> Refuser
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				)}

				{/* Stats Tab */}
				{activeTab === 'stats' && (
					<div className="space-y-6">
						<h2 className="font-display text-xl font-semibold text-foreground">
							Statistiques
						</h2>
						<div
							className="rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<h3 className="font-display text-base font-semibold text-foreground mb-6">
								Revenus hebdomadaires
							</h3>
							<div className="flex items-end gap-3 h-48">
								{revenueData.map((d) => (
									<div
										key={d.day}
										className="flex-1 flex flex-col items-center gap-2"
									>
										<span className="text-xs text-muted-foreground font-body">
											{Math.round(d.value * 85)}K
										</span>
										<div
											className="w-full rounded-t-lg transition-all hover:opacity-90 cursor-default"
											style={{
												height: `${(d.value / maxRevenue) * 180}px`,
												background:
													'linear-gradient(to top, #b8922a, #d4af37, #f4c430)',
												boxShadow: '0 -4px 20px rgba(212,175,55,0.2)',
											}}
										/>
										<span className="text-xs text-muted-foreground font-body">
											{d.day}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{halls.map((hall) => (
								<div
									key={hall.id}
									className="rounded-2xl p-5 border"
									style={{
										background: '#1a1a1a',
										borderColor: 'rgba(212,175,55,0.12)',
									}}
								>
									<h3 className="font-display text-sm font-bold text-foreground mb-3">
										{hall.name}
									</h3>
									<div className="space-y-2 text-sm font-body">
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Taux d&apos;occupation
											</span>
											<span className="text-foreground font-semibold">
												{70 + (hall.id.charCodeAt(0) % 20)}%
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Réservations
											</span>
											<span className="text-foreground font-semibold">
												{8 + parseInt(hall.id) * 4}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Note moyenne
											</span>
											<span className="gold-gradient-text font-bold">
												{hall.rating}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	)
}
