'use client'

import { useState } from 'react'
import { X, Bell, CheckCircle2, Clock, Info, Check } from 'lucide-react'

interface Notification {
	id: string
	type: 'confirmed' | 'pending' | 'info' | 'refused'
	title: string
	message: string
	time: string
	read: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: 'n1',
		type: 'confirmed',
		title: 'Réservation confirmée',
		message:
			'Votre réservation à Villa Lumière le 18/05 a été confirmée par le propriétaire.',
		time: 'Il y a 2h',
		read: false,
	},
	{
		id: 'n2',
		type: 'pending',
		title: 'En attente de confirmation',
		message: 'Votre demande pour Le Grand Palais est en cours de traitement.',
		time: 'Il y a 5h',
		read: false,
	},
	{
		id: 'n3',
		type: 'info',
		title: 'Rappel événement',
		message:
			'Rappel : votre événement à Espace Royal est dans 2 jours. Pensez à confirmer les détails.',
		time: 'Hier',
		read: true,
	},
]

const typeConfig = {
	confirmed: {
		icon: CheckCircle2,
		color: '#34d399',
		bg: 'rgba(52,211,153,0.12)',
	},
	pending: {
		icon: Clock,
		color: '#d4af37',
		bg: 'rgba(212,175,55,0.12)',
	},
	info: {
		icon: Info,
		color: '#60a5fa',
		bg: 'rgba(96,165,250,0.12)',
	},
	refused: {
		icon: X,
		color: '#f87171',
		bg: 'rgba(248,113,113,0.12)',
	},
}

interface NotificationsPanelProps {
	onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
	const unreadCount = notifications.filter(n => !n.read).length

	const markAllRead = () =>
		setNotifications(prev => prev.map(n => ({ ...n, read: true })))
	const markRead = (id: string) =>
		setNotifications(prev =>
			prev.map(n => (n.id === id ? { ...n, read: true } : n)),
		)

	return (
		<div
			className="fixed inset-0 z-50 flex"
			style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
			onClick={onClose}
		>
			<div
				className="ml-auto h-full w-full max-w-md flex flex-col"
				style={{
					background: '#111',
					borderLeft: '1px solid rgba(212,175,55,0.15)',
				}}
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div
					className="flex items-center justify-between px-5 py-4 border-b"
					style={{ borderColor: 'rgba(212,175,55,0.12)' }}
				>
					<div className="flex items-center gap-2">
						<Bell className="w-5 h-5" style={{ color: '#d4af37' }} />
						<h2 className="font-display text-lg font-bold text-foreground">
							Notifications
						</h2>
						{unreadCount > 0 && (
							<span
								className="px-2 py-0.5 rounded-full text-xs font-bold font-body text-black"
								style={{ background: '#d4af37' }}
							>
								{unreadCount}
							</span>
						)}
					</div>
					<div className="flex items-center gap-2">
						{unreadCount > 0 && (
							<button
								onClick={markAllRead}
								className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
							>
								<Check className="w-3.5 h-3.5" />
								Tout lire
							</button>
						)}
						<button
							onClick={onClose}
							className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
						>
							<X className="w-5 h-5 text-muted-foreground" />
						</button>
					</div>
				</div>

				{/* List */}
				<div className="flex-1 overflow-y-auto p-4 space-y-3">
					{notifications.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-center py-16">
							<div
								className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
								style={{ background: 'rgba(212,175,55,0.08)' }}
							>
								<Bell
									className="w-8 h-8"
									style={{ color: 'rgba(212,175,55,0.3)' }}
								/>
							</div>
							<p className="text-muted-foreground font-body text-sm">
								Aucune notification
							</p>
						</div>
					) : (
						notifications.map(notif => {
							const cfg = typeConfig[notif.type]
							const Icon = cfg.icon
							return (
								<button
									key={notif.id}
									onClick={() => markRead(notif.id)}
									className="w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all hover:border-gold/30"
									style={{
										background: notif.read
											? 'transparent'
											: 'rgba(212,175,55,0.04)',
										borderColor: notif.read
											? 'rgba(212,175,55,0.08)'
											: 'rgba(212,175,55,0.18)',
									}}
								>
									<div
										className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
										style={{ background: cfg.bg }}
									>
										<Icon
											className="w-4.5 h-4.5"
											style={{ color: cfg.color }}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-2 mb-0.5">
											<p className="font-body text-sm font-semibold text-foreground">
												{notif.title}
											</p>
											{!notif.read && (
												<span
													className="w-2 h-2 rounded-full flex-shrink-0"
													style={{ background: '#d4af37' }}
												/>
											)}
										</div>
										<p className="font-body text-xs text-muted-foreground leading-relaxed">
											{notif.message}
										</p>
										<p
											className="font-body text-xs mt-1.5"
											style={{ color: 'rgba(212,175,55,0.6)' }}
										>
											{notif.time}
										</p>
									</div>
								</button>
							)
						})
					)}
				</div>
			</div>
		</div>
	)
}
