'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import { X, Plus, Upload, ImageIcon, AlertCircle } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { useLanguage } from '@/context/language-context'
import type { Hall } from '@/types'

interface HallFormModalProps {
	hall?: Hall
	onClose: () => void
}

export function AddHallModal({
	hall: initialHall,
	onClose,
}: HallFormModalProps) {
	const { addHall, updateHall } = useApp()
	const { t } = useLanguage()
	const isEdit = !!initialHall
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const fileRef = useRef<HTMLInputElement>(null)

	const [name, setName] = useState(initialHall?.name ?? '')
	const [location, setLocation] = useState(initialHall?.location ?? '')
	const [capacity, setCapacity] = useState(
		initialHall?.capacity ? String(initialHall.capacity) : '',
	)
	const [pricePerHour, setPricePerHour] = useState(
		initialHall?.pricePerHour ? String(initialHall.pricePerHour) : '',
	)
	const [hours, setHours] = useState(initialHall?.hours ?? '')
	const [imageUrl, setImageUrl] = useState(initialHall?.image ?? '')
	const [imagePreview, setImagePreview] = useState(
		initialHall?.image && !initialHall.image.includes('placeholder')
			? initialHall.image
			: '',
	)
	const [featureInput, setFeatureInput] = useState('')
	const [features, setFeatures] = useState<string[]>(
		initialHall?.features ?? [],
	)
	const [serviceInput, setServiceInput] = useState('')
	const [services, setServices] = useState<string[]>(
		initialHall?.services ?? [],
	)

	const inputClass =
		'w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm'
	const inputStyle = { borderColor: 'rgba(212,175,55,0.2)' }
	const focus = (e: React.FocusEvent<HTMLInputElement>) =>
		(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
	const blur = (e: React.FocusEvent<HTMLInputElement>) =>
		(e.target.style.borderColor = 'rgba(212,175,55,0.2)')

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = ev => {
			const result = ev.target?.result as string
			setImagePreview(result)
			setImageUrl(result)
		}
		reader.readAsDataURL(file)
	}

	const addTag = (
		input: string,
		list: string[],
		setList: (v: string[]) => void,
		setInput: (v: string) => void,
	) => {
		const val = input.trim()
		if (val && !list.includes(val)) setList([...list, val])
		setInput('')
	}

	const removeTag = (
		val: string,
		list: string[],
		setList: (v: string[]) => void,
	) => setList(list.filter(t => t !== val))

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (!name || !location || !capacity || !pricePerHour || !hours) {
			setError(t('addHall.requiredFields'))
			return
		}
		setLoading(true)
		await new Promise(r => setTimeout(r, 500))
		const data = {
			name,
			location,
			capacity: parseInt(capacity),
			pricePerHour: parseInt(pricePerHour),
			hours,
			image: imageUrl || '/placeholder.svg?height=400&width=600',
			features,
			services,
		}
		if (isEdit && initialHall) {
			updateHall(initialHall.id, data)
		} else {
			addHall(data)
		}
		setLoading(false)
		onClose()
	}

	const TagInput = ({
		label,
		value,
		onChange,
		tags,
		onAdd,
		onRemove,
		placeholder,
	}: {
		label: string
		value: string
		onChange: (v: string) => void
		tags: string[]
		onAdd: () => void
		onRemove: (v: string) => void
		placeholder: string
	}) => (
		<div>
			<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
				{label}
			</label>
			<div className="flex gap-2 mb-2">
				<input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault()
							onAdd()
						}
					}}
					placeholder={placeholder}
					className={inputClass}
					style={inputStyle}
					onFocus={focus}
					onBlur={blur}
				/>
				<button
					type="button"
					onClick={onAdd}
					className="p-3 rounded-xl transition-colors flex-shrink-0"
					style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37' }}
				>
					<Plus className="w-4 h-4" />
				</button>
			</div>
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{tags.map(tag => (
						<span
							key={tag}
							className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium"
							style={{
								background: 'rgba(212,175,55,0.12)',
								color: '#d4af37',
								border: '1px solid rgba(212,175,55,0.25)',
							}}
						>
							{tag}
							<button
								type="button"
								onClick={() => onRemove(tag)}
								className="hover:opacity-70 transition-opacity"
							>
								<X className="w-3 h-3" />
							</button>
						</span>
					))}
				</div>
			)}
		</div>
	)

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-xl rounded-2xl border overflow-hidden"
				style={{
					background: 'var(--card)',
					borderColor: 'rgba(212,175,55,0.2)',
					maxHeight: '90vh',
				}}
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div
					className="flex items-center justify-between px-6 py-5 border-b"
					style={{ borderColor: 'rgba(212,175,55,0.1)' }}
				>
					<h2 className="font-display text-lg font-bold text-foreground">
						{isEdit ? t('addHall.editTitle') : t('addHall.addTitle')}
					</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
					>
						<X className="w-5 h-5 text-muted-foreground" />
					</button>
				</div>

				{/* Scrollable body */}
				<div
					className="overflow-y-auto"
					style={{ maxHeight: 'calc(90vh - 80px)' }}
				>
					<form onSubmit={handleSubmit} className="p-6 space-y-5">
						{/* Image upload */}
						<div>
							<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
								{t('addHall.image')}
							</label>
							<div
								className="relative h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors"
								style={{
									borderColor: imagePreview
										? 'rgba(212,175,55,0.4)'
										: 'rgba(212,175,55,0.2)',
									background: imagePreview
										? 'transparent'
										: 'rgba(212,175,55,0.03)',
									overflow: 'hidden',
								}}
								onClick={() => fileRef.current?.click()}
							>
								{imagePreview ? (
									<img
										src={imagePreview}
										alt="Aperçu"
										className="absolute inset-0 w-full h-full object-cover"
									/>
								) : (
									<>
										<ImageIcon
											className="w-8 h-8 mb-2"
											style={{ color: 'rgba(212,175,55,0.4)' }}
										/>
										<p className="text-sm text-muted-foreground font-body">
											{isEdit ? t('addHall.clickToChange') : t('addHall.clickToAdd')}
										</p>
										<p className="text-xs text-muted-foreground font-body mt-1">
											{t('addHall.imageFormat')}
										</p>
									</>
								)}
								{imagePreview && (
									<div
										className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
										style={{ background: 'rgba(0,0,0,0.5)' }}
									>
										<Upload className="w-6 h-6 text-white" />
									</div>
								)}
							</div>
							<input
								ref={fileRef}
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>
						</div>

						{/* Name & Location */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									{t('addHall.hallName')} <span style={{ color: '#d4af37' }}>*</span>
								</label>
								<input
									type="text"
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder="Ex: Le Grand Palais"
									className={inputClass}
									style={inputStyle}
									onFocus={focus}
									onBlur={blur}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									{t('addHall.location')} <span style={{ color: '#d4af37' }}>*</span>
								</label>
								<input
									type="text"
									value={location}
									onChange={e => setLocation(e.target.value)}
									placeholder="Ex: Cocody, Abidjan"
									className={inputClass}
									style={inputStyle}
									onFocus={focus}
									onBlur={blur}
								/>
							</div>
						</div>

						{/* Capacity & Price */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									{t('addHall.capacity')}{' '}
									<span style={{ color: '#d4af37' }}>*</span>
								</label>
								<input
									type="number"
									min={1}
									value={capacity}
									onChange={e => setCapacity(e.target.value)}
									placeholder="Ex: 200"
									className={inputClass}
									style={inputStyle}
									onFocus={focus}
									onBlur={blur}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									{t('addHall.pricePerHour')} <span style={{ color: '#d4af37' }}>*</span>
								</label>
								<input
									type="number"
									min={1}
									value={pricePerHour}
									onChange={e => setPricePerHour(e.target.value)}
									placeholder="Ex: 100000"
									className={inputClass}
									style={inputStyle}
									onFocus={focus}
									onBlur={blur}
								/>
							</div>
						</div>

						{/* Hours */}
						<div>
							<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
								{t('addHall.openingHours')} <span style={{ color: '#d4af37' }}>*</span>
							</label>
							<input
								type="text"
								value={hours}
								onChange={e => setHours(e.target.value)}
								placeholder="Ex: 08h - 04h"
								className={inputClass}
								style={inputStyle}
								onFocus={focus}
								onBlur={blur}
							/>
						</div>

						{/* Features */}
						<TagInput
							label={t('addHall.features')}
							value={featureInput}
							onChange={setFeatureInput}
							tags={features}
							onAdd={() =>
								addTag(featureInput, features, setFeatures, setFeatureInput)
							}
							onRemove={v => removeTag(v, features, setFeatures)}
							placeholder={t('addHall.featuresPlaceholder')}
						/>

						{/* Services */}
						<TagInput
							label={t('addHall.services')}
							value={serviceInput}
							onChange={setServiceInput}
							tags={services}
							onAdd={() =>
								addTag(serviceInput, services, setServices, setServiceInput)
							}
							onRemove={v => removeTag(v, services, setServices)}
							placeholder={t('addHall.servicesPlaceholder')}
						/>

						{error && (
							<div
								className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body"
								style={{
									background: 'rgba(239,68,68,0.1)',
									color: '#f87171',
									border: '1px solid rgba(239,68,68,0.2)',
								}}
							>
								<AlertCircle className="w-4 h-4 shrink-0" />
								{error}
							</div>
						)}

						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={onClose}
								className="flex-1 py-3 rounded-xl border text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
								style={{ borderColor: 'rgba(212,175,55,0.2)' }}
							>
								{t('common.cancel')}
							</button>
							<button
								type="submit"
								disabled={loading}
								className="flex-1 py-3 rounded-xl text-sm font-body font-semibold transition-opacity hover:opacity-90"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
									color: '#000',
									opacity: loading ? 0.7 : 1,
								}}
							>
								{loading
									? t('addHall.saving')
									: isEdit
										? t('addHall.saveChanges')
										: t('owner.addHall')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
