'use client'

import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/language-context'
import type { ReactNode } from 'react'

interface ConfirmDialogProps {
	title: string
	message: ReactNode
	confirmLabel: string
	variant?: 'danger' | 'success'
	onClose: () => void
	onConfirm: () => void
}

export function ConfirmDialog({
	title,
	message,
	confirmLabel,
	variant = 'danger',
	onClose,
	onConfirm,
}: ConfirmDialogProps) {
	const isDanger = variant === 'danger'
	const { t } = useLanguage()

	return (
		<div
			className="fixed inset-0 z-[60] flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			onClick={onClose}
		>
			<div
				className="w-full max-w-sm rounded-2xl p-6 border"
				style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.2)' }}
				onClick={e => e.stopPropagation()}
			>
				<div
					className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
					style={{
						background: isDanger
							? 'rgba(248,113,113,0.15)'
							: 'rgba(52,211,153,0.15)',
					}}
				>
					{isDanger ? (
						<AlertTriangle className="w-6 h-6" style={{ color: '#f87171' }} />
					) : (
						<CheckCircle2 className="w-6 h-6" style={{ color: '#34d399' }} />
					)}
				</div>
				<h3 className="font-display font-bold text-lg text-foreground text-center mb-2">
					{title}
				</h3>
				<p className="text-muted-foreground text-sm font-body text-center mb-6">
					{message}
				</p>
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 py-3 rounded-xl border text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
						style={{ borderColor: 'rgba(212,175,55,0.2)' }}
					>
						{t('common.cancel')}
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 py-3 rounded-xl text-sm font-body font-semibold transition-opacity hover:opacity-90"
						style={
							isDanger
								? { background: 'rgba(248,113,113,0.9)', color: '#fff' }
								: {
										background: 'linear-gradient(135deg, #34d399, #10b981)',
										color: '#fff',
									}
						}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	)
}
