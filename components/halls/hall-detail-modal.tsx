import {
	X,
	Star,
	Users,
	Clock,
	CreditCard,
	CheckCircle2,
	Heart,
} from 'lucide-react'
import { formatPrice } from '@/lib/mock-data'
import type { Hall } from '@/types'

interface HallDetailModalProps {
	hall: Hall
	onClose: () => void
	isFavorite?: boolean
	onToggleFavorite?: (id: string) => void
	onBook?: () => void
}

export function HallDetailModal({
	hall,
	onClose,
	isFavorite,
	onToggleFavorite,
	onBook,
}: HallDetailModalProps) {
	return (
		<div
			className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label={`Détails de ${hall.name}`}
		>
			<div
				className="relative w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl overflow-y-auto border border-b-0 sm:border-b"
				style={{
					background: '#1a1a1a',
					borderColor: 'rgba(212,175,55,0.2)',
					maxHeight: '92dvh',
				}}
				onClick={e => e.stopPropagation()}
			>
				{/* Image */}
				<div className="relative h-72">
					<img
						src={hall.image}
						alt={hall.name}
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
						onClick={onClose}
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
							{hall.name}
						</h2>
						<div className="flex items-center gap-2 mt-1">
							<div
								className="flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold text-black"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
								}}
							>
								<Star className="w-3.5 h-3.5 fill-current" />
								{hall.rating}
							</div>
							<span className="text-white/70 text-sm font-body">
								{hall.location}
							</span>
						</div>
					</div>
				</div>

				{/* Info cards */}
				<div className="p-5 grid grid-cols-3 gap-3 mb-4">
					{[
						{ icon: Users, label: 'Capacité', value: `${hall.capacity} pers.` },
						{ icon: Clock, label: 'Horaires', value: hall.hours },
						{
							icon: CreditCard,
							label: 'Tarif/h',
							value: formatPrice(hall.pricePerHour),
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
						{hall.services.map(s => (
							<li
								key={s}
								className="flex items-center gap-2.5 text-sm font-body text-muted-foreground"
							>
								<CheckCircle2
									className="w-4 h-4 shrink-0"
									style={{ color: '#d4af37' }}
								/>
								{s}
							</li>
						))}
					</ul>
				</div>

				{/* Actions */}
				{(onToggleFavorite || onBook) && (
					<div className="px-5 pb-5 flex gap-3">
						{onToggleFavorite && (
							<button
								onClick={() => onToggleFavorite(hall.id)}
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body border transition-all hover:border-gold"
								style={{
									borderColor: 'rgba(212,175,55,0.3)',
									color: isFavorite ? '#d4af37' : 'var(--muted-foreground)',
								}}
							>
								<Heart
									className="w-4 h-4 inline mr-2"
									style={{ fill: isFavorite ? '#d4af37' : 'transparent' }}
								/>
								{isFavorite ? 'Dans les favoris' : 'Ajouter aux favoris'}
							</button>
						)}
						{onBook && (
							<button
								onClick={onBook}
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								Réserver maintenant
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
