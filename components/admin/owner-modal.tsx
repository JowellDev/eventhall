'use client'

import { useState } from 'react'
import { X, Building2, Mail, Phone, Calendar } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useLanguage } from '@/context/language-context'
import type { Owner, OwnerStatus } from '@/types'

type ModalMode = 'view' | 'create' | 'edit'

interface OwnerModalProps {
	mode: ModalMode
	owner?: Owner | null
	onClose: () => void
	onSave: (data: Omit<Owner, 'id'> & { id?: string }) => void
}

type StatusOption = { value: OwnerStatus; labelKey: 'ownerModal.active' | 'ownerModal.pending' | 'ownerModal.suspended' }

const STATUS_OPTIONS: StatusOption[] = [
	{ value: 'active', labelKey: 'ownerModal.active' },
	{ value: 'pending', labelKey: 'ownerModal.pending' },
	{ value: 'suspended', labelKey: 'ownerModal.suspended' },
]

const inputClass =
	'w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm'
const inputStyle = { borderColor: 'rgba(212,175,55,0.2)' }

const focusStyle = 'rgba(212,175,55,0.6)'
const blurStyle = 'rgba(212,175,55,0.2)'

const labelClass =
	'block text-xs font-semibold text-muted-foreground font-body mb-1.5 uppercase tracking-wide'

function formatJoinedDate(dateStr: string, locale: string) {
	return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

export function OwnerModal({ mode, owner, onClose, onSave }: OwnerModalProps) {
	const { t, locale } = useLanguage()
	const isView = mode === 'view'
	const isEdit = mode === 'edit'
	const isCreate = mode === 'create'

	const [name, setName] = useState(owner?.name ?? '')
	const [email, setEmail] = useState(owner?.email ?? '')
	const [phone, setPhone] = useState(owner?.phone ?? '')
	const [status, setStatus] = useState<OwnerStatus>(owner?.status ?? 'pending')
	const [error, setError] = useState('')

	const title = isCreate
		? t('ownerModal.newOwner')
		: isEdit
			? t('ownerModal.editOwner')
			: t('ownerModal.ownerProfile')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim() || !email.trim() || !phone.trim()) {
			setError(t('ownerModal.fillRequired'))
			return
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setError(t('ownerModal.invalidEmail'))
			return
		}
		onSave({
			id: owner?.id,
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			status,
			halls: owner?.halls ?? 0,
			revenue: owner?.revenue ?? '0 FCFA',
			joinedAt: owner?.joinedAt ?? new Date().toISOString().split('T')[0],
		})
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
			onClick={e => e.target === e.currentTarget && onClose()}
		>
			<div
				className="relative w-full max-w-md rounded-2xl border p-6 shadow-2xl"
				style={{ background: 'var(--surface)', borderColor: 'rgba(212,175,55,0.2)' }}
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h2 className="font-display text-lg font-bold text-foreground">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="p-1.5 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
						style={{ background: 'rgba(255,255,255,0.05)' }}
						aria-label={t('common.close')}
					>
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* VIEW MODE */}
				{isView && owner && (
					<div className="space-y-5">
						{/* Avatar + name */}
						<div className="flex items-center gap-4">
							<div
								className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-xl text-black"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
								}}
							>
								{owner.name.charAt(0)}
							</div>
							<div>
								<p className="font-display font-bold text-lg text-foreground">
									{owner.name}
								</p>
								<StatusBadge status={owner.status} />
							</div>
						</div>

						{/* Divider */}
						<div style={{ height: 1, background: 'rgba(212,175,55,0.12)' }} />

						{/* Contact info */}
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm font-body">
								<Mail
									className="w-4 h-4 shrink-0"
									style={{ color: '#d4af37' }}
								/>
								<span className="text-muted-foreground">{owner.email}</span>
							</div>
							<div className="flex items-center gap-3 text-sm font-body">
								<Phone
									className="w-4 h-4 shrink-0"
									style={{ color: '#d4af37' }}
								/>
								<span className="text-muted-foreground">{owner.phone}</span>
							</div>
							<div className="flex items-center gap-3 text-sm font-body">
								<Calendar
									className="w-4 h-4 shrink-0"
									style={{ color: '#d4af37' }}
								/>
								<span className="text-muted-foreground">
									{t('ownerModal.memberSince')} {formatJoinedDate(owner.joinedAt, locale)}
								</span>
							</div>
						</div>

						{/* Divider */}
						<div style={{ height: 1, background: 'rgba(212,175,55,0.12)' }} />

						{/* Stats */}
						<div className="grid grid-cols-2 gap-3">
							<div
								className="rounded-xl p-4 text-center border"
								style={{
									background: 'var(--card)',
									borderColor: 'rgba(212,175,55,0.12)',
								}}
							>
								<Building2
									className="w-5 h-5 mx-auto mb-1"
									style={{ color: '#d4af37' }}
								/>
								<p className="font-display font-bold text-xl text-foreground">
									{owner.halls}
								</p>
								<p className="text-xs text-muted-foreground font-body mt-0.5">
									{t('ownerModal.halls')}
								</p>
							</div>
							<div
								className="rounded-xl p-4 text-center border"
								style={{
									background: 'var(--card)',
									borderColor: 'rgba(212,175,55,0.12)',
								}}
							>
								<p
									className="font-display font-bold text-base mt-1"
									style={{ color: '#d4af37' }}
								>
									{owner.revenue}
								</p>
								<p className="text-xs text-muted-foreground font-body mt-0.5">
									{t('ownerModal.totalRevenue')}
								</p>
							</div>
						</div>

						<button
							onClick={onClose}
							className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
							style={{
								background: 'rgba(212,175,55,0.1)',
								color: '#d4af37',
								border: '1px solid rgba(212,175,55,0.3)',
							}}
						>
							{t('common.close')}
						</button>
					</div>
				)}

				{/* CREATE / EDIT MODE */}
				{(isCreate || isEdit) && (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className={labelClass}>{t('ownerModal.fullName')}</label>
							<input
								type="text"
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder="Ex: Kouamé Jean-Paul"
								className={inputClass}
								style={inputStyle}
								onFocus={e => (e.target.style.borderColor = focusStyle)}
								onBlur={e => (e.target.style.borderColor = blurStyle)}
							/>
						</div>

						<div>
							<label className={labelClass}>{t('ownerModal.email')}</label>
							<input
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder="Ex: jp.kouame@mail.ci"
								className={inputClass}
								style={inputStyle}
								onFocus={e => (e.target.style.borderColor = focusStyle)}
								onBlur={e => (e.target.style.borderColor = blurStyle)}
							/>
						</div>

						<div>
							<label className={labelClass}>{t('ownerModal.phone')}</label>
							<input
								type="tel"
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder="Ex: +225 07 01 23 45 67"
								className={inputClass}
								style={inputStyle}
								onFocus={e => (e.target.style.borderColor = focusStyle)}
								onBlur={e => (e.target.style.borderColor = blurStyle)}
							/>
						</div>

						<div>
							<label className={labelClass}>{t('ownerModal.status')}</label>
							<select
								value={status}
								onChange={e => setStatus(e.target.value as OwnerStatus)}
								className={inputClass}
								style={{ ...inputStyle, cursor: 'pointer' }}
								onFocus={e => (e.currentTarget.style.borderColor = focusStyle)}
								onBlur={e => (e.currentTarget.style.borderColor = blurStyle)}
							>
								{STATUS_OPTIONS.map(opt => (
									<option
										key={opt.value}
										value={opt.value}
										style={{ background: 'var(--surface)' }}
									>
										{t(opt.labelKey)}
									</option>
								))}
							</select>
						</div>

						{error && (
							<p className="text-sm font-body" style={{ color: '#f87171' }}>
								{error}
							</p>
						)}

						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-80"
								style={{
									background: 'rgba(255,255,255,0.06)',
									color: 'var(--muted-foreground)',
								}}
							>
								{t('common.cancel')}
							</button>
							<button
								type="submit"
								className="flex-1 py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#0a0a0a',
								}}
							>
								{isCreate ? t('ownerModal.create') : t('common.save')}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}
