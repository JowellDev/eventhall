'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { HallFilters } from '@/hooks/use-hall-search'

const CAPACITY_OPTIONS: { label: string; value: number | null }[] = [
	{ label: 'Tout', value: null },
	{ label: '100+', value: 100 },
	{ label: '200+', value: 200 },
	{ label: '350+', value: 350 },
	{ label: '500+', value: 500 },
]

const PRICE_OPTIONS: { label: string; value: number | null }[] = [
	{ label: 'Tout', value: null },
	{ label: '≤ 85 000', value: 85000 },
	{ label: '≤ 120 000', value: 120000 },
	{ label: '≤ 150 000', value: 150000 },
]

const SORT_OPTIONS: { label: string; value: HallFilters['sortBy'] }[] = [
	{ label: 'Pertinence', value: 'default' },
	{ label: 'Mieux notés', value: 'rating' },
	{ label: 'Prix ↑', value: 'price_asc' },
	{ label: 'Prix ↓', value: 'price_desc' },
	{ label: 'Capacité ↓', value: 'capacity' },
]

const CHIP_ACTIVE = {
	background: 'linear-gradient(135deg, #d4af37, #f4c430)',
	color: '#0a0a0a',
}
const CHIP_IDLE = {
	background: 'rgba(255,255,255,0.05)',
	color: '#9ca3af',
	border: '1px solid rgba(255,255,255,0.1)',
}

interface HallSearchBarProps {
	value: string
	onChange: (value: string) => void
	filters: HallFilters
	onUpdateFilter: (updates: Partial<HallFilters>) => void
	onResetFilters: () => void
	activeFilterCount: number
	allFeatures: string[]
}

export function HallSearchBar({
	value,
	onChange,
	filters,
	onUpdateFilter,
	onResetFilters,
	activeFilterCount,
	allFeatures,
}: HallSearchBarProps) {
	const [showFilters, setShowFilters] = useState(false)

	const toggleFeature = (feature: string) => {
		const next = filters.features.includes(feature)
			? filters.features.filter(f => f !== feature)
			: [...filters.features, feature]
		onUpdateFilter({ features: next })
	}

	const isActive = showFilters || activeFilterCount > 0

	return (
		<div className="space-y-3">
			{/* Search row */}
			<div
				className="flex items-center gap-3 px-5 py-4 rounded-2xl border"
				style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
			>
				<Search className="w-5 h-5 shrink-0 text-muted-foreground" />
				<input
					type="text"
					placeholder="Rechercher une salle, un quartier..."
					className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none font-body text-sm"
					value={value}
					onChange={e => onChange(e.target.value)}
					aria-label="Rechercher une salle"
				/>
				{value && (
					<button
						onClick={() => onChange('')}
						className="p-1 text-muted-foreground transition-colors hover:text-foreground"
						aria-label="Effacer la recherche"
					>
						<X className="w-4 h-4" />
					</button>
				)}
				<button
					onClick={() => setShowFilters(v => !v)}
					className="relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold font-body transition-all hover:opacity-90"
					style={
						isActive
							? CHIP_ACTIVE
							: {
									background: 'rgba(212,175,55,0.1)',
									color: '#d4af37',
									border: '1px solid rgba(212,175,55,0.3)',
								}
					}
					aria-expanded={showFilters}
				>
					<SlidersHorizontal className="w-4 h-4" />
					Filtrer
					{activeFilterCount > 0 && (
						<span
							className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold"
							style={{
								background: '#0a0a0a',
								color: '#d4af37',
								border: '1px solid #d4af37',
							}}
						>
							{activeFilterCount}
						</span>
					)}
				</button>
			</div>

			{/* Filter panel */}
			{showFilters && (
				<div
					className="space-y-4 rounded-2xl border p-5"
					style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
				>
					{/* Capacity + Price */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Capacité minimale
							</p>
							<div className="flex flex-wrap gap-2">
								{CAPACITY_OPTIONS.map(opt => (
									<button
										key={String(opt.value)}
										onClick={() => onUpdateFilter({ minCapacity: opt.value })}
										className="rounded-lg px-3 py-1.5 text-xs font-semibold font-body transition-all"
										style={
											filters.minCapacity === opt.value
												? CHIP_ACTIVE
												: CHIP_IDLE
										}
									>
										{opt.label}
									</button>
								))}
							</div>
						</div>

						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Budget max / heure
							</p>
							<div className="flex flex-wrap gap-2">
								{PRICE_OPTIONS.map(opt => (
									<button
										key={String(opt.value)}
										onClick={() => onUpdateFilter({ maxPrice: opt.value })}
										className="rounded-lg px-3 py-1.5 text-xs font-semibold font-body transition-all"
										style={
											filters.maxPrice === opt.value ? CHIP_ACTIVE : CHIP_IDLE
										}
									>
										{opt.label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Features */}
					<div>
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Services inclus
						</p>
						<div className="flex flex-wrap gap-2">
							{allFeatures.map(feature => (
								<button
									key={feature}
									onClick={() => toggleFeature(feature)}
									className="rounded-lg px-3 py-1.5 text-xs font-semibold font-body transition-all"
									style={
										filters.features.includes(feature) ? CHIP_ACTIVE : CHIP_IDLE
									}
								>
									{feature}
								</button>
							))}
						</div>
					</div>

					{/* Sort + Reset */}
					<div
						className="flex flex-wrap items-center justify-between gap-3 border-t pt-3"
						style={{ borderColor: 'rgba(212,175,55,0.1)' }}
					>
						<div className="flex flex-wrap items-center gap-2">
							<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Trier par
							</p>
							{SORT_OPTIONS.map(opt => (
								<button
									key={opt.value}
									onClick={() => onUpdateFilter({ sortBy: opt.value })}
									className="rounded-lg px-3 py-1.5 text-xs font-semibold font-body transition-all"
									style={filters.sortBy === opt.value ? CHIP_ACTIVE : CHIP_IDLE}
								>
									{opt.label}
								</button>
							))}
						</div>

						{activeFilterCount > 0 && (
							<button
								onClick={onResetFilters}
								className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
							>
								<X className="w-3 h-3" />
								Réinitialiser
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
