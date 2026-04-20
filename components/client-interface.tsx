'use client'

import { useState } from 'react'
import {
	Search,
	MapPin,
	Star,
	ChevronRight,
	X,
	Users,
	Clock,
	CreditCard,
	CheckCircle2,
	Heart,
	Bell,
	Calendar,
	SlidersHorizontal,
	Package,
	LogOut,
	Building2,
	ArrowLeft,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { halls, packages, formatPrice, type Hall } from '@/lib/mock-data'

interface ClientInterfaceProps {
	isAuthenticated?: boolean
	onLogin?: () => void
	onLogout?: () => void
}

type ModalState = 'hall' | 'booking' | null

export function ClientInterface({
	isAuthenticated = false,
	onLogin,
	onLogout,
}: ClientInterfaceProps) {
	const [selectedHall, setSelectedHall] = useState<Hall | null>(null)
	const [modalState, setModalState] = useState<ModalState>(null)
	const [bookingStep, setBookingStep] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [favorites, setFavorites] = useState<string[]>([])
	const [bookingData, setBookingData] = useState({
		date: '',
		startTime: '',
		endTime: '',
		selectedPackages: [] as string[],
	})
	const [bookingConfirmed, setBookingConfirmed] = useState(false)

	const filteredHalls = halls.filter(
		(h) =>
			h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			h.location.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const toggleFavorite = (id: string) => {
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
		)
	}

	const openHallModal = (hall: Hall) => {
		setSelectedHall(hall)
		setModalState('hall')
		setBookingStep(1)
		setBookingConfirmed(false)
		setBookingData({
			date: '',
			startTime: '',
			endTime: '',
			selectedPackages: [],
		})
	}

	const closeModal = () => {
		setModalState(null)
		setSelectedHall(null)
		setBookingStep(1)
	}

	const openBooking = () => {
		if (!isAuthenticated) {
			onLogin?.()
			return
		}
		setModalState('booking')
		setBookingStep(1)
	}

	const togglePackage = (id: string) => {
		setBookingData((prev) => ({
			...prev,
			selectedPackages: prev.selectedPackages.includes(id)
				? prev.selectedPackages.filter((p) => p !== id)
				: [...prev.selectedPackages, id],
		}))
	}

	const calculateTotal = () => {
		if (!selectedHall) return 0
		const start = parseInt(bookingData.startTime.split(':')[0] || '0')
		const end = parseInt(bookingData.endTime.split(':')[0] || '0')
		const hours = end > start ? end - start : 0
		const hallCost = selectedHall.pricePerHour * hours
		const packagesCost = bookingData.selectedPackages.reduce((sum, pkgId) => {
			const pkg = packages.find((p) => p.id === pkgId)
			return sum + (pkg?.price || 0)
		}, 0)
		return hallCost + packagesCost
	}

	const confirmBooking = () => {
		setBookingConfirmed(true)
		setBookingStep(4)
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation */}
			<header
				className="sticky top-0 z-40 border-b"
				style={{
					background: 'rgba(10,10,10,0.95)',
					backdropFilter: 'blur(20px)',
					borderColor: 'rgba(212,175,55,0.15)',
				}}
			>
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
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
					</div>

					<nav className="hidden md:flex items-center gap-6">
						<button className="text-muted-foreground hover:text-foreground transition-colors font-body text-sm">
							Explorer
						</button>
						<button className="text-muted-foreground hover:text-foreground transition-colors font-body text-sm">
							Mes réservations
						</button>
					</nav>

					<div className="flex items-center gap-3">
						<button
							className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground"
							aria-label="Rechercher"
						>
							<Search className="w-5 h-5" />
						</button>
						<button
							className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground"
							aria-label="Calendrier"
						>
							<Calendar className="w-5 h-5" />
						</button>
						<button
							className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground relative"
							aria-label="Favoris"
						>
							<Heart className="w-5 h-5" />
							{favorites.length > 0 && (
								<span
									className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-black"
									style={{ background: '#d4af37' }}
								>
									{favorites.length}
								</span>
							)}
						</button>
						<button
							className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground relative"
							aria-label="Notifications"
						>
							<Bell className="w-5 h-5" />
							<span
								className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-black"
								style={{ background: '#d4af37' }}
							>
								3
							</span>
						</button>
						{isAuthenticated ? (
							<button
								onClick={onLogout}
								className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
								style={{ borderColor: 'rgba(212,175,55,0.2)' }}
							>
								<LogOut className="w-4 h-4" />
								<span>Déconnexion</span>
							</button>
						) : (
							<button
								onClick={onLogin}
								className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-body font-semibold transition-opacity hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#000',
								}}
							>
								<LogOut className="w-4 h-4 rotate-180" />
								<span>Connexion</span>
							</button>
						)}
					</div>
				</div>
			</header>

			<main>
				{/* Hero */}
				<section className="px-4 pt-16 pb-12 text-center relative">
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(212,175,55,0.06) 0%, transparent 70%)',
						}}
						aria-hidden="true"
					/>
					<h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance relative z-10">
						Trouvez votre salle{' '}
						<span className="gold-gradient-text">d&apos;exception</span>
					</h1>
					<p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto font-body relative z-10">
						Des espaces prestige pour vos événements les plus mémorables à
						Abidjan
					</p>

					{/* Search bar */}
					<div className="max-w-2xl mx-auto relative z-10">
						<div
							className="flex items-center gap-3 px-5 py-4 rounded-2xl border"
							style={{
								background: '#1a1a1a',
								borderColor: 'rgba(212,175,55,0.2)',
							}}
						>
							<Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
							<input
								type="text"
								placeholder="Rechercher une salle, un quartier..."
								className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none font-body text-sm"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								aria-label="Rechercher une salle"
							/>
							<button
								className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								<SlidersHorizontal className="w-4 h-4" />
								Filtrer
							</button>
						</div>
					</div>
				</section>

				{/* Hall Grid */}
				<section className="max-w-7xl mx-auto px-4 pb-16">
					<div className="flex items-center justify-between mb-6">
						<h2 className="font-display text-xl font-semibold text-foreground">
							{filteredHalls.length} salle{filteredHalls.length > 1 ? 's' : ''}{' '}
							disponible{filteredHalls.length > 1 ? 's' : ''}
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredHalls.map((hall) => (
							<article
								key={hall.id}
								className="card-hover-gold rounded-2xl overflow-hidden border cursor-pointer group"
								style={{
									background: '#1a1a1a',
									borderColor: 'rgba(212,175,55,0.12)',
								}}
								onClick={() => openHallModal(hall)}
							>
								{/* Image */}
								<div className="relative h-52 overflow-hidden">
									<img
										src={hall.image}
										alt={hall.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div
										className="absolute inset-0"
										style={{
											background:
												'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
										}}
										aria-hidden="true"
									/>

									{/* Rating badge */}
									<div
										className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold font-body text-black"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
										}}
									>
										<Star className="w-3.5 h-3.5 fill-current" />
										{hall.rating}
									</div>

									{/* Favorite button */}
									<button
										className="absolute top-3 left-3 p-2 rounded-full transition-all hover:scale-110"
										style={{
											background: 'rgba(0,0,0,0.6)',
											backdropFilter: 'blur(8px)',
										}}
										onClick={(e) => {
											e.stopPropagation()
											toggleFavorite(hall.id)
										}}
										aria-label={
											favorites.includes(hall.id)
												? 'Retirer des favoris'
												: 'Ajouter aux favoris'
										}
									>
										<Heart
											className="w-4 h-4 transition-colors"
											style={{
												color: favorites.includes(hall.id)
													? '#d4af37'
													: 'white',
												fill: favorites.includes(hall.id)
													? '#d4af37'
													: 'transparent',
											}}
										/>
									</button>
								</div>

								{/* Content */}
								<div className="p-5">
									<h3 className="font-display text-lg font-bold text-foreground mb-1">
										{hall.name}
									</h3>
									<div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 font-body">
										<MapPin
											className="w-4 h-4 flex-shrink-0"
											style={{ color: '#d4af37' }}
										/>
										{hall.location}
									</div>

									<div className="flex flex-wrap gap-2 mb-4">
										{hall.features.map((f) => (
											<span
												key={f}
												className="px-2.5 py-1 rounded-lg text-xs font-body font-medium"
												style={{
													background: 'rgba(212,175,55,0.1)',
													border: '1px solid rgba(212,175,55,0.2)',
													color: '#d4af37',
												}}
											>
												{f}
											</span>
										))}
									</div>

									<div className="flex items-center justify-between">
										<div>
											<span className="font-display text-2xl font-bold gold-gradient-text">
												{formatPrice(hall.pricePerHour)}
											</span>
											<span className="text-muted-foreground text-xs font-body ml-1">
												/heure
											</span>
										</div>
										<button
											className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 hover:scale-105"
											style={{
												background: 'linear-gradient(135deg, #d4af37, #f4c430)',
												color: '#0a0a0a',
											}}
											onClick={(e) => {
												e.stopPropagation()
												openHallModal(hall)
											}}
										>
											Réserver
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>

			{/* Hall Detail Modal */}
			{modalState === 'hall' && selectedHall && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					style={{
						background: 'rgba(0,0,0,0.85)',
						backdropFilter: 'blur(12px)',
					}}
					onClick={closeModal}
					role="dialog"
					aria-modal="true"
					aria-label={`Détails de ${selectedHall.name}`}
				>
					<div
						className="relative w-full max-w-xl rounded-2xl overflow-hidden border"
						style={{
							background: '#1a1a1a',
							borderColor: 'rgba(212,175,55,0.2)',
							maxHeight: '90vh',
							overflowY: 'auto',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Image */}
						<div className="relative h-72">
							<img
								src={selectedHall.image}
								alt={selectedHall.name}
								className="w-full h-full object-cover"
							/>
							<div
								className="absolute inset-0"
								style={{
									background:
										'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)',
								}}
								aria-hidden="true"
							/>
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
								style={{
									background: 'rgba(0,0,0,0.7)',
									backdropFilter: 'blur(8px)',
								}}
								aria-label="Fermer"
							>
								<X className="w-5 h-5 text-white" />
							</button>
							<div className="absolute bottom-4 left-5 right-5">
								<h2 className="font-display text-2xl font-bold text-white">
									{selectedHall.name}
								</h2>
								<div className="flex items-center gap-2 mt-1">
									<div
										className="flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold text-black"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
										}}
									>
										<Star className="w-3.5 h-3.5 fill-current" />
										{selectedHall.rating}
									</div>
									<span className="text-white/70 text-sm font-body">
										{selectedHall.location}
									</span>
								</div>
							</div>
						</div>

						{/* Info cards */}
						<div className="p-5 grid grid-cols-3 gap-3 mb-4">
							{[
								{
									icon: Users,
									label: 'Capacité',
									value: `${selectedHall.capacity} pers.`,
								},
								{ icon: Clock, label: 'Horaires', value: selectedHall.hours },
								{
									icon: CreditCard,
									label: 'Tarif/h',
									value: formatPrice(selectedHall.pricePerHour),
								},
							].map(({ icon: Icon, label, value }) => (
								<div
									key={label}
									className="rounded-xl p-3 text-center"
									style={{
										background: 'rgba(212,175,55,0.05)',
										border: '1px solid rgba(212,175,55,0.12)',
									}}
								>
									<Icon
										className="w-5 h-5 mx-auto mb-1"
										style={{ color: '#d4af37' }}
									/>
									<p className="text-muted-foreground text-xs font-body mb-0.5">
										{label}
									</p>
									<p className="text-foreground text-xs font-semibold font-body">
										{value}
									</p>
								</div>
							))}
						</div>

						{/* Services */}
						<div className="px-5 mb-6">
							<h3 className="font-display text-base font-semibold text-foreground mb-3">
								Services inclus
							</h3>
							<ul className="grid grid-cols-1 gap-2">
								{selectedHall.services.map((s) => (
									<li
										key={s}
										className="flex items-center gap-2.5 text-sm font-body text-muted-foreground"
									>
										<CheckCircle2
											className="w-4 h-4 flex-shrink-0"
											style={{ color: '#d4af37' }}
										/>
										{s}
									</li>
								))}
							</ul>
						</div>

						{/* Actions */}
						<div className="px-5 pb-5 flex gap-3">
							<button
								onClick={() => toggleFavorite(selectedHall.id)}
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body border transition-all hover:border-gold"
								style={{
									borderColor: 'rgba(212,175,55,0.3)',
									color: favorites.includes(selectedHall.id)
										? '#d4af37'
										: 'var(--muted-foreground)',
								}}
							>
								<Heart
									className="w-4 h-4 inline mr-2"
									style={{
										fill: favorites.includes(selectedHall.id)
											? '#d4af37'
											: 'transparent',
									}}
								/>
								{favorites.includes(selectedHall.id)
									? 'Dans les favoris'
									: 'Ajouter aux favoris'}
							</button>
							<button
								onClick={openBooking}
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								Réserver maintenant
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Booking Modal */}
			{modalState === 'booking' && selectedHall && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					style={{
						background: 'rgba(0,0,0,0.85)',
						backdropFilter: 'blur(12px)',
					}}
					role="dialog"
					aria-modal="true"
					aria-label="Réservation"
				>
					<div
						className="relative w-full max-w-lg rounded-2xl overflow-hidden border"
						style={{
							background: '#1a1a1a',
							borderColor: 'rgba(212,175,55,0.2)',
						}}
					>
						{/* Header */}
						<div
							className="p-5 border-b"
							style={{ borderColor: 'rgba(212,175,55,0.1)' }}
						>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									{bookingStep > 1 && !bookingConfirmed && (
										<button
											onClick={() => setBookingStep((s) => s - 1)}
											className="p-1.5 rounded-lg hover:bg-surface-overlay transition-colors"
											aria-label="Étape précédente"
										>
											<ArrowLeft className="w-4 h-4 text-muted-foreground" />
										</button>
									)}
									<h2 className="font-display text-lg font-bold text-foreground">
										{bookingConfirmed
											? 'Réservation confirmée'
											: `Réserver — ${selectedHall.name}`}
									</h2>
								</div>
								<button
									onClick={closeModal}
									className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
									aria-label="Fermer"
								>
									<X className="w-5 h-5 text-muted-foreground" />
								</button>
							</div>

							{/* Progress indicators */}
							{!bookingConfirmed && (
								<div className="flex items-center gap-2">
									{[1, 2, 3].map((step) => (
										<div key={step} className="flex items-center gap-2">
											<div
												className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all"
												style={{
													background:
														step <= bookingStep
															? 'linear-gradient(135deg, #d4af37, #f4c430)'
															: 'rgba(212,175,55,0.1)',
													color: step <= bookingStep ? '#0a0a0a' : '#888',
													border:
														step === bookingStep ? '2px solid #f4c430' : 'none',
												}}
											>
												{step}
											</div>
											<span
												className="text-xs font-body"
												style={{
													color: step <= bookingStep ? '#d4af37' : '#555',
												}}
											>
												{step === 1
													? 'Date & Heure'
													: step === 2
														? 'Options'
														: 'Récapitulatif'}
											</span>
											{step < 3 && (
												<div
													className="w-6 h-px"
													style={{
														background: step < bookingStep ? '#d4af37' : '#333',
													}}
													aria-hidden="true"
												/>
											)}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Step content */}
						<div className="p-5">
							{bookingConfirmed ? (
								<div className="text-center py-8">
									<div
										className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
										}}
									>
										<CheckCircle2 className="w-8 h-8 text-black" />
									</div>
									<h3 className="font-display text-xl font-bold text-foreground mb-2">
										Demande envoyée !
									</h3>
									<p className="text-muted-foreground font-body text-sm mb-6">
										Votre demande de réservation pour{' '}
										<strong className="text-foreground">
											{selectedHall.name}
										</strong>{' '}
										a été envoyée. Le propriétaire vous contactera sous 24h.
									</p>
									<button
										onClick={closeModal}
										className="px-6 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											color: '#0a0a0a',
										}}
									>
										Retour aux salles
									</button>
								</div>
							) : bookingStep === 1 ? (
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-body font-medium text-foreground mb-2">
											Date de l&apos;événement
										</label>
										<input
											type="date"
											className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
											style={{
												background: '#111',
												borderColor: 'rgba(212,175,55,0.2)',
											}}
											value={bookingData.date}
											onChange={(e) =>
												setBookingData((d) => ({ ...d, date: e.target.value }))
											}
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-body font-medium text-foreground mb-2">
												Heure de début
											</label>
											<input
												type="time"
												className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
												style={{
													background: '#111',
													borderColor: 'rgba(212,175,55,0.2)',
												}}
												value={bookingData.startTime}
												onChange={(e) =>
													setBookingData((d) => ({
														...d,
														startTime: e.target.value,
													}))
												}
											/>
										</div>
										<div>
											<label className="block text-sm font-body font-medium text-foreground mb-2">
												Heure de fin
											</label>
											<input
												type="time"
												className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground outline-none border focus:border-gold transition-colors"
												style={{
													background: '#111',
													borderColor: 'rgba(212,175,55,0.2)',
												}}
												value={bookingData.endTime}
												onChange={(e) =>
													setBookingData((d) => ({
														...d,
														endTime: e.target.value,
													}))
												}
											/>
										</div>
									</div>
									<button
										onClick={() => setBookingStep(2)}
										disabled={
											!bookingData.date ||
											!bookingData.startTime ||
											!bookingData.endTime
										}
										className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											color: '#0a0a0a',
										}}
									>
										Continuer
										<ChevronRight className="w-4 h-4 inline ml-1" />
									</button>
								</div>
							) : bookingStep === 2 ? (
								<div className="space-y-4">
									<p className="text-muted-foreground text-sm font-body">
										Sélectionnez les options supplémentaires pour votre
										événement
									</p>
									<div className="space-y-3">
										{packages.map((pkg) => {
											const isSelected = bookingData.selectedPackages.includes(
												pkg.id,
											)
											return (
												<button
													key={pkg.id}
													onClick={() => togglePackage(pkg.id)}
													className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all"
													style={{
														background: isSelected
															? 'rgba(212,175,55,0.08)'
															: '#111',
														borderColor: isSelected
															? 'rgba(212,175,55,0.5)'
															: 'rgba(212,175,55,0.12)',
													}}
													aria-pressed={isSelected}
												>
													<div
														className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
														style={{
															background: isSelected
																? 'linear-gradient(135deg, #d4af37, #f4c430)'
																: 'rgba(212,175,55,0.1)',
														}}
													>
														<Package
															className="w-4 h-4"
															style={{
																color: isSelected ? '#0a0a0a' : '#d4af37',
															}}
														/>
													</div>
													<div className="flex-1">
														<p
															className="text-sm font-semibold font-body"
															style={{
																color: isSelected
																	? '#d4af37'
																	: 'var(--foreground)',
															}}
														>
															{pkg.label}
														</p>
														<p className="text-xs text-muted-foreground font-body">
															+{formatPrice(pkg.price)}
														</p>
													</div>
													<div
														className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-gold' : 'border-gray-600'}`}
														style={{
															borderColor: isSelected ? '#d4af37' : undefined,
														}}
													>
														{isSelected && (
															<div
																className="w-2.5 h-2.5 rounded-full"
																style={{ background: '#d4af37' }}
															/>
														)}
													</div>
												</button>
											)
										})}
									</div>
									<button
										onClick={() => setBookingStep(3)}
										className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 mt-2"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											color: '#0a0a0a',
										}}
									>
										Continuer
										<ChevronRight className="w-4 h-4 inline ml-1" />
									</button>
								</div>
							) : (
								<div className="space-y-4">
									<div
										className="rounded-xl p-4 space-y-3"
										style={{
											background: '#111',
											border: '1px solid rgba(212,175,55,0.15)',
										}}
									>
										<h3 className="font-display text-base font-semibold text-foreground">
											{selectedHall.name}
										</h3>
										<div className="space-y-2 text-sm font-body">
											<div className="flex justify-between text-muted-foreground">
												<span>Date</span>
												<span className="text-foreground">
													{bookingData.date}
												</span>
											</div>
											<div className="flex justify-between text-muted-foreground">
												<span>Horaire</span>
												<span className="text-foreground">
													{bookingData.startTime} — {bookingData.endTime}
												</span>
											</div>
											{bookingData.selectedPackages.length > 0 && (
												<div className="flex justify-between text-muted-foreground">
													<span>Options</span>
													<span className="text-foreground text-right">
														{bookingData.selectedPackages
															.map(
																(id) =>
																	packages.find((p) => p.id === id)?.label,
															)
															.join(', ')}
													</span>
												</div>
											)}
											<div
												className="h-px my-2"
												style={{ background: 'rgba(212,175,55,0.12)' }}
												aria-hidden="true"
											/>
											<div className="flex justify-between items-center">
												<span className="font-semibold text-foreground">
													Total estimé
												</span>
												<span className="font-display text-xl font-bold gold-gradient-text">
													{formatPrice(calculateTotal())}
												</span>
											</div>
										</div>
									</div>
									<button
										onClick={confirmBooking}
										className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 hover:scale-[1.02]"
										style={{
											background: 'linear-gradient(135deg, #d4af37, #f4c430)',
											color: '#0a0a0a',
										}}
									>
										Confirmer la réservation
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
