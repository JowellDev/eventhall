'use client'

import { useState } from 'react'
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'

interface CalendarPanelProps {
	onClose: () => void
}

const MONTHS = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
]
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

function getDaysInMonth(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
	const day = new Date(year, month, 1).getDay()
	return day === 0 ? 6 : day - 1
}

export function CalendarPanel({ onClose }: CalendarPanelProps) {
	const { bookings } = useApp()
	const today = new Date()
	const [year, setYear] = useState(today.getFullYear())
	const [month, setMonth] = useState(today.getMonth())
	const [selectedDay, setSelectedDay] = useState<number | null>(null)

	const daysInMonth = getDaysInMonth(year, month)
	const firstDay = getFirstDayOfMonth(year, month)

	const bookingDates = bookings.reduce<Record<string, typeof bookings>>(
		(acc, b) => {
			const [y, m, d] = b.date.split('-').map(Number)
			if (y === year && m - 1 === month) {
				const key = String(d)
				acc[key] = [...(acc[key] ?? []), b]
			}
			return acc
		},
		{},
	)

	const prevMonth = () => {
		if (month === 0) {
			setYear(y => y - 1)
			setMonth(11)
		} else setMonth(m => m - 1)
		setSelectedDay(null)
	}

	const nextMonth = () => {
		if (month === 11) {
			setYear(y => y + 1)
			setMonth(0)
		} else setMonth(m => m + 1)
		setSelectedDay(null)
	}

	const selectedBookings = selectedDay
		? (bookingDates[String(selectedDay)] ?? [])
		: []

	const cells: (number | null)[] = [
		...Array(firstDay).fill(null),
		...Array.from({ length: daysInMonth }, (_, i) => i + 1),
	]

	const isToday = (d: number) =>
		d === today.getDate() &&
		month === today.getMonth() &&
		year === today.getFullYear()

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			onClick={onClose}
		>
			<div
				className="w-full max-w-lg rounded-2xl border overflow-hidden"
				style={{
					background: '#1a1a1a',
					borderColor: 'rgba(212,175,55,0.2)',
					maxHeight: '90vh',
				}}
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div
					className="flex items-center justify-between px-5 py-4 border-b"
					style={{ borderColor: 'rgba(212,175,55,0.12)' }}
				>
					<div className="flex items-center gap-2">
						<Calendar className="w-5 h-5" style={{ color: '#d4af37' }} />
						<h2 className="font-display text-lg font-bold text-foreground">
							Calendrier
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
					>
						<X className="w-5 h-5 text-muted-foreground" />
					</button>
				</div>

				<div
					className="p-5 overflow-y-auto"
					style={{ maxHeight: 'calc(90vh - 68px)' }}
				>
					{/* Month nav */}
					<div className="flex items-center justify-between mb-4">
						<button
							onClick={prevMonth}
							className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
						>
							<ChevronLeft className="w-5 h-5 text-muted-foreground" />
						</button>
						<span className="font-display font-semibold text-foreground">
							{MONTHS[month]} {year}
						</span>
						<button
							onClick={nextMonth}
							className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
						>
							<ChevronRight className="w-5 h-5 text-muted-foreground" />
						</button>
					</div>

					{/* Day labels */}
					<div className="grid grid-cols-7 mb-2">
						{DAYS.map(d => (
							<div
								key={d}
								className="text-center text-xs font-body text-muted-foreground py-1"
							>
								{d}
							</div>
						))}
					</div>

					{/* Calendar grid */}
					<div className="grid grid-cols-7 gap-1">
						{cells.map((day, i) => {
							if (day === null) return <div key={`empty-${i}`} />
							const hasBookings = !!bookingDates[String(day)]
							const isSelected = selectedDay === day
							const todayDay = isToday(day)
							return (
								<button
									key={day}
									onClick={() => setSelectedDay(isSelected ? null : day)}
									className="aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-sm font-body"
									style={{
										background: isSelected
											? 'linear-gradient(135deg, #d4af37, #f4c430)'
											: hasBookings
												? 'rgba(212,175,55,0.12)'
												: 'transparent',
										color: isSelected
											? '#000'
											: todayDay
												? '#d4af37'
												: 'var(--foreground)',
										border:
											todayDay && !isSelected
												? '1px solid rgba(212,175,55,0.4)'
												: '1px solid transparent',
										fontWeight: todayDay ? 700 : 400,
									}}
								>
									{day}
									{hasBookings && !isSelected && (
										<span
											className="w-1 h-1 rounded-full"
											style={{ background: '#d4af37' }}
										/>
									)}
								</button>
							)
						})}
					</div>

					{/* Selected day bookings */}
					{selectedDay && (
						<div
							className="mt-5 pt-4 border-t"
							style={{ borderColor: 'rgba(212,175,55,0.12)' }}
						>
							<p className="font-display text-sm font-semibold text-foreground mb-3">
								{selectedDay} {MONTHS[month]} {year}
							</p>
							{selectedBookings.length === 0 ? (
								<p className="text-muted-foreground font-body text-sm text-center py-4">
									Aucune réservation ce jour.
								</p>
							) : (
								<div className="space-y-3">
									{selectedBookings.map(b => (
										<div
											key={b.id}
											className="rounded-xl p-3 border"
											style={{
												background: '#111',
												borderColor: 'rgba(212,175,55,0.12)',
											}}
										>
											<div className="flex items-center justify-between gap-2 mb-1">
												<p className="font-display text-sm font-bold text-foreground">
													{b.hallName}
												</p>
												<StatusBadge status={b.status} />
											</div>
											<p className="text-xs font-body text-muted-foreground">
												{b.time}
											</p>
											<p
												className="text-xs font-semibold font-body mt-1"
												style={{ color: '#d4af37' }}
											>
												{formatPrice(b.total)}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Summary */}
					{Object.keys(bookingDates).length > 0 && !selectedDay && (
						<div
							className="mt-5 pt-4 border-t"
							style={{ borderColor: 'rgba(212,175,55,0.12)' }}
						>
							<p className="font-display text-sm font-semibold text-foreground mb-3">
								Ce mois-ci — {Object.values(bookingDates).flat().length}{' '}
								réservation(s)
							</p>
							<div className="space-y-2">
								{Object.entries(bookingDates)
									.sort(([a], [b]) => Number(a) - Number(b))
									.flatMap(([, bks]) => bks)
									.map(b => (
										<div
											key={b.id}
											className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border"
											style={{
												background: '#111',
												borderColor: 'rgba(212,175,55,0.1)',
											}}
										>
											<div>
												<p className="font-body text-xs font-semibold text-foreground">
													{b.hallName}
												</p>
												<p className="font-body text-xs text-muted-foreground">
													{b.date} · {b.time}
												</p>
											</div>
											<StatusBadge status={b.status} />
										</div>
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
