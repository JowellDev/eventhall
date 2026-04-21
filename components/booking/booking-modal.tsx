'use client'

import { X, ArrowLeft } from 'lucide-react'
import { useBooking } from '@/hooks/use-booking'
import { useApp } from '@/context/app-context'
import { BookingStepDatetime } from './booking-step-datetime'
import { BookingStepPackages } from './booking-step-packages'
import { BookingStepReview } from './booking-step-review'
import { BookingConfirmation } from './booking-confirmation'
import { packages } from '@/lib/mock-data'
import type { Hall } from '@/types'

interface BookingModalProps {
	hall: Hall
	onClose: () => void
}

const STEP_LABELS = ['Date & Heure', 'Options', 'Récapitulatif']

export function BookingModal({ hall, onClose }: BookingModalProps) {
	const { currentUser, addBooking } = useApp()
	const {
		step,
		setStep,
		data,
		setData,
		confirmed,
		togglePackage,
		calculateTotal,
		confirm,
		goBack,
	} = useBooking()

	const handleConfirm = () => {
		const start = parseInt(data.startTime.split(':')[0] ?? '0')
		const end = parseInt(data.endTime.split(':')[0] ?? '0')
		const duration = end > start ? end - start : 0
		addBooking({
			hallId: hall.id,
			hallName: hall.name,
			client: currentUser?.name ?? 'Client',
			date: data.date,
			time: `${data.startTime} - ${data.endTime}`,
			duration,
			status: 'pending',
			total: calculateTotal(hall),
			packages: data.selectedPackages.map(
				id => packages.find(p => p.id === id)?.label ?? id,
			),
		})
		confirm()
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			role="dialog"
			aria-modal="true"
			aria-label="Réservation"
		>
			<div
				className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden border border-b-0 sm:border-b flex flex-col"
				style={{
					background: '#1a1a1a',
					borderColor: 'rgba(212,175,55,0.2)',
					maxHeight: '92dvh',
				}}
			>
				{/* Header */}
				<div
					className="p-5 border-b"
					style={{ borderColor: 'rgba(212,175,55,0.1)' }}
				>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							{step > 1 && !confirmed && (
								<button
									onClick={goBack}
									className="p-1.5 rounded-lg hover:bg-surface-overlay transition-colors"
									aria-label="Étape précédente"
								>
									<ArrowLeft className="w-4 h-4 text-muted-foreground" />
								</button>
							)}
							<h2 className="font-display text-lg font-bold text-foreground">
								{confirmed
									? 'Réservation confirmée'
									: `Réserver — ${hall.name}`}
							</h2>
						</div>
						<button
							onClick={onClose}
							className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
							aria-label="Fermer"
						>
							<X className="w-5 h-5 text-muted-foreground" />
						</button>
					</div>

					{/* Progress */}
					{!confirmed && (
						<div className="flex items-center gap-2">
							{STEP_LABELS.map((label, i) => {
								const s = i + 1
								const active = s <= step
								return (
									<div key={label} className="flex items-center gap-2">
										<div
											className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all"
											style={{
												background: active
													? 'linear-gradient(135deg, #d4af37, #f4c430)'
													: 'rgba(212,175,55,0.1)',
												color: active ? '#0a0a0a' : '#888',
												border: s === step ? '2px solid #f4c430' : 'none',
											}}
										>
											{s}
										</div>
										<span
											className="text-xs font-body"
											style={{ color: active ? '#d4af37' : '#555' }}
										>
											{label}
										</span>
										{s < 3 && (
											<div
												className="w-6 h-px"
												style={{ background: s < step ? '#d4af37' : '#333' }}
												aria-hidden="true"
											/>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>

				{/* Step content */}
				<div className="p-5 overflow-y-auto flex-1">
					{confirmed ? (
						<BookingConfirmation hallName={hall.name} onClose={onClose} />
					) : step === 1 ? (
						<BookingStepDatetime
							data={data}
							onChange={setData}
							onNext={() => setStep(2)}
						/>
					) : step === 2 ? (
						<BookingStepPackages
							data={data}
							onTogglePackage={togglePackage}
							onNext={() => setStep(3)}
						/>
					) : (
						<BookingStepReview
							hall={hall}
							data={data}
							total={calculateTotal(hall)}
							onConfirm={handleConfirm}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
