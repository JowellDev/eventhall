'use client'

import { useState } from 'react'
import {
	Building2,
	CalendarDays,
	TrendingUp,
	UserCog,
	LogOut,
	Star,
	Eye,
	Pencil,
	ShieldCheck,
	Globe,
	BarChart3,
	Users,
} from 'lucide-react'
import { halls, formatPrice } from '@/lib/mock-data'

interface AdminDashboardProps {
	onLogout: () => void
}

type Tab = 'overview' | 'owners' | 'halls' | 'analytics'

const kpis = [
	{
		label: 'Propriétaires actifs',
		value: '45',
		icon: UserCog,
		change: '+8%',
		positive: true,
	},
	{
		label: 'Salles totales',
		value: '128',
		icon: Building2,
		change: '+15%',
		positive: true,
	},
	{
		label: 'Réservations 30j',
		value: '856',
		icon: CalendarDays,
		change: '+32%',
		positive: true,
	},
	{
		label: 'Revenu plateforme',
		value: '42.8M FCFA',
		icon: TrendingUp,
		change: '+19%',
		positive: true,
	},
]

const owners = [
	{
		id: 'o1',
		name: 'Kouamé Jean-Paul',
		email: 'jp.kouame@mail.ci',
		halls: 3,
		revenue: '8.5M FCFA',
		status: 'active',
	},
	{
		id: 'o2',
		name: 'Traoré Fatou',
		email: 'f.traore@mail.ci',
		halls: 2,
		revenue: '5.2M FCFA',
		status: 'active',
	},
	{
		id: 'o3',
		name: 'Koffi Akissi',
		email: 'a.koffi@mail.ci',
		halls: 1,
		revenue: '2.1M FCFA',
		status: 'pending',
	},
	{
		id: 'o4',
		name: 'Bah Mohamed',
		email: 'm.bah@mail.ci',
		halls: 4,
		revenue: '12.4M FCFA',
		status: 'active',
	},
	{
		id: 'o5',
		name: 'Assi Christiane',
		email: 'c.assi@mail.ci',
		halls: 2,
		revenue: '6.8M FCFA',
		status: 'active',
	},
]

const platformStats = [
	{ label: 'Jan', bookings: 62, revenue: 85 },
	{ label: 'Fév', bookings: 75, revenue: 92 },
	{ label: 'Mar', bookings: 68, revenue: 78 },
	{ label: 'Avr', bookings: 91, revenue: 95 },
	{ label: 'Mai', bookings: 84, revenue: 88 },
	{ label: 'Jun', bookings: 97, revenue: 100 },
]

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
	const [activeTab, setActiveTab] = useState<Tab>('overview')

	const tabs: { key: Tab; label: string }[] = [
		{ key: 'overview', label: "Vue d'ensemble" },
		{ key: 'owners', label: 'Propriétaires' },
		{ key: 'halls', label: 'Salles' },
		{ key: 'analytics', label: 'Analytiques' },
	]

	const maxBookings = Math.max(...platformStats.map((d) => d.bookings))

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
						<div
							className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-body font-semibold"
							style={{
								background: 'rgba(212,175,55,0.15)',
								border: '1px solid rgba(212,175,55,0.3)',
								color: '#d4af37',
							}}
						>
							<ShieldCheck className="w-3 h-3" />
							Super Admin
						</div>
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

				{/* Mobile tabs */}
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
				{/* KPI Cards */}
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

				{/* Overview */}
				{activeTab === 'overview' && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Recent Owners */}
						<div
							className="rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<div className="flex items-center gap-2 mb-5">
								<Users className="w-5 h-5" style={{ color: '#d4af37' }} />
								<h2 className="font-display text-base font-semibold text-foreground">
									Propriétaires récents
								</h2>
							</div>
							<ul className="space-y-3">
								{owners.slice(0, 4).map((owner) => (
									<li key={owner.id} className="flex items-center gap-3">
										<div
											className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm text-black"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											}}
											aria-hidden="true"
										>
											{owner.name.charAt(0)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-body font-semibold text-foreground truncate">
												{owner.name}
											</p>
											<p className="text-xs text-muted-foreground font-body">
												{owner.halls} salle{owner.halls > 1 ? 's' : ''} ·{' '}
												{owner.revenue}
											</p>
										</div>
										<div className="flex gap-1.5">
											<button
												className="p-1.5 rounded-lg border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
												aria-label={`Voir ${owner.name}`}
											>
												<Eye className="w-3.5 h-3.5" />
											</button>
											<button
												className="p-1.5 rounded-lg border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
												aria-label={`Modifier ${owner.name}`}
											>
												<Pencil className="w-3.5 h-3.5" />
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Top Performing Halls */}
						<div
							className="rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<div className="flex items-center gap-2 mb-5">
								<Globe className="w-5 h-5" style={{ color: '#d4af37' }} />
								<h2 className="font-display text-base font-semibold text-foreground">
									Salles performantes
								</h2>
							</div>
							<ul className="space-y-3">
								{halls.map((hall, i) => (
									<li key={hall.id} className="flex items-center gap-3">
										<span
											className="font-display text-lg font-bold w-7 text-center flex-shrink-0"
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
											className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-body font-semibold text-foreground truncate">
												{hall.name}
											</p>
											<p className="text-xs text-muted-foreground font-body">
												{hall.location}
											</p>
										</div>
										<div
											className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-black"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											}}
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
							{[
								{ label: "Taux d'approbation", value: '94%', color: '#34d399' },
								{
									label: 'Temps de réponse moyen',
									value: '2.4h',
									color: '#60a5fa',
								},
								{
									label: 'Satisfaction client',
									value: '4.8/5',
									color: '#d4af37',
								},
								{ label: 'Litiges ouverts', value: '3', color: '#f87171' },
							].map(({ label, value, color }) => (
								<div
									key={label}
									className="rounded-xl p-4 border text-center"
									style={{
										background: '#111',
										borderColor: 'rgba(212,175,55,0.1)',
									}}
								>
									<p
										className="font-display text-2xl font-bold mb-1"
										style={{ color }}
									>
										{value}
									</p>
									<p className="text-xs text-muted-foreground font-body">
										{label}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Owners Tab */}
				{activeTab === 'owners' && (
					<div>
						<div className="flex items-center justify-between mb-6">
							<h2 className="font-display text-xl font-semibold text-foreground">
								Tous les propriétaires
							</h2>
							<button
								className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								+ Ajouter
							</button>
						</div>
						<div className="space-y-3">
							{owners.map((owner) => (
								<div
									key={owner.id}
									className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5 border"
									style={{
										background: '#1a1a1a',
										borderColor: 'rgba(212,175,55,0.12)',
									}}
								>
									<div className="flex items-center gap-3 flex-1">
										<div
											className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-base text-black"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											}}
										>
											{owner.name.charAt(0)}
										</div>
										<div>
											<p className="font-body font-semibold text-foreground">
												{owner.name}
											</p>
											<p className="text-xs text-muted-foreground font-body">
												{owner.email}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-6 text-sm font-body">
										<div>
											<p className="text-muted-foreground text-xs mb-0.5">
												Salles
											</p>
											<p className="font-semibold text-foreground">
												{owner.halls}
											</p>
										</div>
										<div>
											<p className="text-muted-foreground text-xs mb-0.5">
												Revenus
											</p>
											<p className="font-semibold gold-gradient-text">
												{owner.revenue}
											</p>
										</div>
										<span
											className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
											style={{
												background:
													owner.status === 'active'
														? 'rgba(52,211,153,0.1)'
														: 'rgba(212,175,55,0.1)',
												color:
													owner.status === 'active' ? '#34d399' : '#d4af37',
												border: `1px solid ${owner.status === 'active' ? 'rgba(52,211,153,0.3)' : 'rgba(212,175,55,0.3)'}`,
											}}
										>
											{owner.status === 'active' ? 'Actif' : 'En attente'}
										</span>
										<div className="flex gap-2 ml-2">
											<button
												className="p-2 rounded-lg border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
												aria-label="Voir"
											>
												<Eye className="w-4 h-4" />
											</button>
											<button
												className="p-2 rounded-lg border transition-all hover:border-gold"
												style={{
													borderColor: 'rgba(212,175,55,0.2)',
													color: 'var(--muted-foreground)',
												}}
												aria-label="Modifier"
											>
												<Pencil className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Halls Tab */}
				{activeTab === 'halls' && (
					<div>
						<h2 className="font-display text-xl font-semibold text-foreground mb-6">
							Toutes les salles
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{[...halls, ...halls].slice(0, 6).map((hall, i) => (
								<div
									key={`${hall.id}-${i}`}
									className="rounded-2xl overflow-hidden border"
									style={{
										background: '#1a1a1a',
										borderColor: 'rgba(212,175,55,0.12)',
									}}
								>
									<div className="relative h-36">
										<img
											src={hall.image}
											alt={hall.name}
											className="w-full h-full object-cover"
										/>
										<div
											className="absolute inset-0"
											style={{
												background:
													'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7))',
											}}
											aria-hidden="true"
										/>
										<div
											className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-black"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											}}
										>
											<Star className="w-3 h-3 fill-current" />
											{hall.rating}
										</div>
										<span className="absolute bottom-2 left-3 text-white text-xs font-body font-semibold">
											{hall.location}
										</span>
									</div>
									<div className="p-3">
										<p className="font-display text-sm font-bold text-foreground mb-0.5">
											{hall.name}
										</p>
										<p className="text-xs text-muted-foreground font-body">
											{hall.capacity} pers. · {formatPrice(hall.pricePerHour)}/h
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Analytics Tab */}
				{activeTab === 'analytics' && (
					<div className="space-y-6">
						<h2 className="font-display text-xl font-semibold text-foreground">
							Analytiques globales
						</h2>
						<div
							className="rounded-2xl p-6 border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.12)',
							}}
						>
							<div className="flex items-center gap-2 mb-6">
								<BarChart3 className="w-5 h-5" style={{ color: '#d4af37' }} />
								<h3 className="font-display text-base font-semibold text-foreground">
									Réservations mensuelles — 2025
								</h3>
							</div>
							<div className="flex items-end gap-3 h-48">
								{platformStats.map((d) => (
									<div
										key={d.label}
										className="flex-1 flex flex-col items-center gap-2"
									>
										<span className="text-xs text-muted-foreground font-body">
											{d.bookings}
										</span>
										<div
											className="w-full rounded-t-lg transition-all hover:opacity-90"
											style={{
												height: `${(d.bookings / maxBookings) * 180}px`,
												background:
													'linear-gradient(to top, #b8922a, #d4af37, #f4c430)',
												boxShadow: '0 -4px 20px rgba(212,175,55,0.15)',
											}}
										/>
										<span className="text-xs text-muted-foreground font-body">
											{d.label}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
									{[
										{ zone: 'Cocody', pct: 35 },
										{ zone: 'Plateau', pct: 25 },
										{ zone: 'Marcory', pct: 20 },
										{ zone: 'Yopougon', pct: 12 },
										{ zone: 'Autres', pct: 8 },
									].map(({ zone, pct }) => (
										<div key={zone} className="space-y-1">
											<div className="flex justify-between text-xs font-body">
												<span className="text-muted-foreground">{zone}</span>
												<span className="text-foreground font-semibold">
													{pct}%
												</span>
											</div>
											<div
												className="h-1.5 rounded-full"
												style={{ background: '#111' }}
											>
												<div
													className="h-full rounded-full"
													style={{
														width: `${pct}%`,
														background:
															'linear-gradient(90deg, #b8922a, #f4c430)',
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
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
									{[
										{ type: 'Mariage', count: 312, color: '#d4af37' },
										{ type: 'Anniversaire', count: 198, color: '#f4c430' },
										{ type: 'Corporate', count: 156, color: '#b8922a' },
										{ type: 'Baptême', count: 112, color: '#8b6914' },
										{ type: 'Autres', count: 78, color: '#5c4509' },
									].map(({ type, count, color }) => (
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
				)}
			</main>
		</div>
	)
}
