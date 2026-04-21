'use client'

import { useState } from 'react'
import { X, Star, Users, Clock, CreditCard, CheckCircle2, Pencil, Tag } from 'lucide-react'
import { AddHallModal } from './add-hall-modal'
import { useLocale } from '@/context/locale-context'
import { formatPrice } from '@/lib/mock-data'
import type { Hall } from '@/types'

interface OwnerHallDetailModalProps {
	hall: Hall
	onClose: () => void
}

export function OwnerHallDetailModal({ hall, onClose }: OwnerHallDetailModalProps) {
	const { t } = useLocale()
	const [showEdit, setShowEdit] = useState(false)

	if (showEdit) {
		return <AddHallModal hall={hall} onClose={() => { setShowEdit(false); onClose() }} />
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label={`${hall.name}`}
		>
			<div
				className="relative w-full max-w-xl rounded-2xl border overflow-hidden"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.2)', maxHeight: '90vh', overflowY: 'auto' }}
				onClick={e => e.stopPropagation()}
			>
				{/* Image */}
				<div className="relative h-64">
					<img src={hall.image} alt={hall.name} className="w-full h-full object-cover" />
					<div
						className="absolute inset-0"
						style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)' }}
						aria-hidden="true"
					/>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
						style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
						aria-label={t.close}
					>
						<X className="w-5 h-5 text-white" />
					</button>
					<div className="absolute bottom-4 left-5 right-5">
						<h2 className="font-display text-2xl font-bold text-white">{hall.name}</h2>
						<div className="flex items-center gap-2 mt-1">
							{hall.rating > 0 && (
								<div
									className="flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold text-black"
									style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
								>
									<Star className="w-3.5 h-3.5 fill-current" />
									{hall.rating}
								</div>
							)}
							<span className="text-white/70 text-sm font-body">{hall.location}</span>
						</div>
					</div>
				</div>

				{/* Info cards */}
				<div className="p-5 grid grid-cols-3 gap-3">
					{[
						{ icon: Users, label: t.capacity, value: `${hall.capacity} ${t.persons}` },
						{ icon: Clock, label: t.hours, value: hall.hours },
						{ icon: CreditCard, label: t.pricePerHour, value: formatPrice(hall.pricePerHour) },
					].map(({ icon: Icon, label, value }) => (
						<div
							key={label}
							className="rounded-xl p-3 text-center"
							style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}
						>
							<Icon className="w-5 h-5 mx-auto mb-1" style={{ color: '#d4af37' }} />
							<p className="text-muted-foreground text-xs font-body mb-0.5">{label}</p>
							<p className="text-foreground text-xs font-semibold font-body">{value}</p>
						</div>
					))}
				</div>

				{/* Features */}
				{hall.features.length > 0 && (
					<div className="px-5 pb-4">
						<div className="flex items-center gap-2 mb-3">
							<Tag className="w-4 h-4" style={{ color: '#d4af37' }} />
							<h3 className="font-display text-base font-semibold text-foreground">{t.features}</h3>
						</div>
						<div className="flex flex-wrap gap-2">
							{hall.features.map(f => (
								<span
									key={f}
									className="px-3 py-1 rounded-full text-xs font-body font-medium"
									style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.2)' }}
								>
									{f}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Services */}
				{hall.services.length > 0 && (
					<div className="px-5 pb-5">
						<h3 className="font-display text-base font-semibold text-foreground mb-3">
							{t.servicesIncluded}
						</h3>
						<ul className="grid grid-cols-1 gap-2">
							{hall.services.map(s => (
								<li key={s} className="flex items-center gap-2.5 text-sm font-body text-muted-foreground">
									<CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#d4af37' }} />
									{s}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Actions */}
				<div className="px-5 pb-5 pt-3 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
					<button
						onClick={() => setShowEdit(true)}
						className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
						style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
					>
						<Pencil className="w-4 h-4" />
						{t.editHall}
					</button>
				</div>
			</div>
		</div>
	)
}
