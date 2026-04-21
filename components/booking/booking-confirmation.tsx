import { CheckCircle2 } from 'lucide-react'

interface BookingConfirmationProps {
	hallName: string
	onClose: () => void
}

export function BookingConfirmation({
	hallName,
	onClose,
}: BookingConfirmationProps) {
	return (
		<div className="text-center py-8">
			<div
				className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
				style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
			>
				<CheckCircle2 className="w-8 h-8 text-black" />
			</div>
			<h3 className="font-display text-xl font-bold text-foreground mb-2">
				Demande envoyée !
			</h3>
			<p className="text-muted-foreground font-body text-sm mb-6">
				Votre demande de réservation pour{' '}
				<strong className="text-foreground">{hallName}</strong> a été envoyée.
				Le propriétaire vous contactera sous 24h.
			</p>
			<button
				onClick={onClose}
				className="px-6 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
				style={{
					background: 'linear-gradient(135deg, #d4af37, #f4c430)',
					color: '#0a0a0a',
				}}
			>
				Retour aux salles
			</button>
		</div>
	)
}
