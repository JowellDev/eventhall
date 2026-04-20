'use client'

import {
	Building2,
	Search,
	UserCog,
	ChevronRight,
	Sparkles,
} from 'lucide-react'

type Role = 'client' | 'owner' | 'admin' | null

interface LandingPageProps {
	onSelectRole: (role: Role) => void
}

export function LandingPage({ onSelectRole }: LandingPageProps) {
	const roles = [
		{
			key: 'client' as Role,
			icon: Search,
			title: 'Espace Client',
			description:
				"Parcourez et réservez les meilleures salles événementielles d'Abidjan. Trouvez l'endroit parfait pour votre occasion.",
			cta: 'Explorer les salles',
		},
		{
			key: 'owner' as Role,
			icon: Building2,
			title: 'Espace Propriétaire',
			description:
				'Gérez vos salles, suivez vos réservations et maximisez vos revenus depuis un tableau de bord intuitif.',
			cta: 'Gérer mes salles',
		},
		{
			key: 'admin' as Role,
			icon: UserCog,
			title: 'Super Admin',
			description:
				'Administrez la plateforme, gérez les propriétaires et analysez les performances globales en temps réel.',
			cta: 'Accéder au panel',
		},
	]

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
			{/* Ambient background decoration */}
			<div
				className="absolute inset-0 pointer-events-none"
				aria-hidden="true"
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 70%)',
				}}
			/>
			<div
				className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
				aria-hidden="true"
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(212,175,55,0.05) 0%, transparent 70%)',
				}}
			/>

			{/* Logo */}
			<div className="flex flex-col items-center mb-12 z-10">
				<div
					className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
					style={{
						background:
							'linear-gradient(135deg, #d4af37 0%, #f4c430 50%, #b8922a 100%)',
						boxShadow:
							'0 0 40px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.1)',
					}}
				>
					<Building2 className="w-9 h-9 text-black" strokeWidth={2} />
				</div>

				<div className="flex items-center gap-2 mb-3">
					<span className="font-display text-4xl md:text-5xl font-bold tracking-tight gold-gradient-text">
						EventHalls
					</span>
					<Sparkles className="w-5 h-5" style={{ color: '#d4af37' }} />
				</div>

				<p className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center text-balance mb-3">
					Gérez vos événements avec{' '}
					<span className="gold-gradient-text">élégance</span>
				</p>
				<p className="text-muted-foreground text-center text-base md:text-lg max-w-lg font-body leading-relaxed">
					La plateforme premium de réservation de salles événementielles à
					Abidjan. Choisissez votre espace pour commencer.
				</p>
			</div>

			{/* Role Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
				{roles.map((role) => {
					const Icon = role.icon
					return (
						<button
							key={role.key}
							onClick={() => onSelectRole(role.key)}
							className="card-hover-gold group relative rounded-2xl p-8 text-left border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
							style={{
								background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
								borderColor: 'rgba(212,175,55,0.15)',
							}}
							aria-label={`Accéder à ${role.title}`}
						>
							{/* Icon badge */}
							<div
								className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105"
								style={{
									background:
										'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(244,196,48,0.1) 100%)',
									border: '1px solid rgba(212,175,55,0.3)',
								}}
							>
								<Icon
									className="w-9 h-9 transition-all duration-300"
									style={{ color: '#d4af37' }}
									strokeWidth={1.5}
								/>
							</div>

							<h2 className="font-display text-xl font-bold text-foreground mb-3">
								{role.title}
							</h2>
							<p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
								{role.description}
							</p>

							{/* CTA */}
							<div
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-300 group-hover:gap-3"
								style={{
									background:
										'linear-gradient(135deg, #d4af37 0%, #f4c430 100%)',
									color: '#0a0a0a',
								}}
							>
								{role.cta}
								<ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
							</div>

							{/* Subtle top border accent */}
							<div
								className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background:
										'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)',
								}}
								aria-hidden="true"
							/>
						</button>
					)
				})}
			</div>

			{/* Footer note */}
			<p className="mt-12 text-muted-foreground text-xs font-body z-10 text-center">
				&copy; {new Date().getFullYear()} EventHalls &mdash; Abidjan, Côte
				d&apos;Ivoire
			</p>
		</div>
	)
}
