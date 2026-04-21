'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'
import type { Booking } from '@/types'

const PAGE_SIZE_OPTIONS = [5, 10, 25]

type PendingAction = {
	booking: Booking
	action: 'confirmed' | 'refused'
} | null

export function OwnerBookingsTab() {
	const { bookings, updateBookingStatus } = useApp()
	const [pendingAction, setPendingAction] = useState<PendingAction>(null)

	const {
		page,
		setPage,
		pageSize,
		setPageSize,
		paginatedItems,
		totalPages,
		total,
		from,
		to,
	} = usePagination(bookings, 5)

	const confirmAction = () => {
		if (pendingAction) {
			updateBookingStatus(pendingAction.booking.id, pendingAction.action)
			setPendingAction(null)
		}
	}

	return (
		<div>
			<h2 className="font-display text-xl font-semibold text-foreground mb-6">
				Réservations
			</h2>
			<div className="space-y-4">
				{paginatedItems.map(booking => (
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
									<StatusBadge status={booking.status} />
								</div>
								<p className="text-sm font-body text-muted-foreground">
									<strong className="text-foreground">{booking.client}</strong>{' '}
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
								{booking.status === 'pending' && (
									<div className="flex gap-2">
										<button
											onClick={() =>
												setPendingAction({ booking, action: 'confirmed' })
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
												setPendingAction({ booking, action: 'refused' })
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
				))}
			</div>
			<Pagination
				page={page}
				totalPages={totalPages}
				from={from}
				to={to}
				total={total}
				pageSize={pageSize}
				pageSizeOptions={PAGE_SIZE_OPTIONS}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
			/>

			{pendingAction && (
				<ConfirmDialog
					title={
						pendingAction.action === 'confirmed'
							? 'Confirmer la réservation ?'
							: 'Refuser la réservation ?'
					}
					message={
						<>
							{pendingAction.action === 'confirmed' ? (
								<>
									Vous êtes sur le point de confirmer la réservation de{' '}
									<strong className="text-foreground">
										{pendingAction.booking.client}
									</strong>{' '}
									pour{' '}
									<strong className="text-foreground">
										{pendingAction.booking.hallName}
									</strong>{' '}
									le{' '}
									<strong className="text-foreground">
										{pendingAction.booking.date}
									</strong>
									.
								</>
							) : (
								<>
									Vous êtes sur le point de refuser la réservation de{' '}
									<strong className="text-foreground">
										{pendingAction.booking.client}
									</strong>{' '}
									pour{' '}
									<strong className="text-foreground">
										{pendingAction.booking.hallName}
									</strong>{' '}
									le{' '}
									<strong className="text-foreground">
										{pendingAction.booking.date}
									</strong>
									. Le client en sera notifié.
								</>
							)}
						</>
					}
					confirmLabel={
						pendingAction.action === 'confirmed' ? 'Confirmer' : 'Refuser'
					}
					variant={pendingAction.action === 'confirmed' ? 'success' : 'danger'}
					onClose={() => setPendingAction(null)}
					onConfirm={confirmAction}
				/>
			)}
		</div>
	)
}
