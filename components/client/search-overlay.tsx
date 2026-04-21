'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, MapPin, Users, Star } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'
import type { Hall } from '@/types'

interface SearchOverlayProps {
	onClose: () => void
	onSelect: (hall: Hall) => void
}

export function SearchOverlay({ onClose, onSelect }: SearchOverlayProps) {
	const { halls } = useApp()
	const [query, setQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [onClose])

	const results =
		query.trim().length === 0
			? halls
			: halls.filter(
					h =>
						h.name.toLowerCase().includes(query.toLowerCase()) ||
						h.location.toLowerCase().includes(query.toLowerCase()) ||
						h.features.some(f => f.toLowerCase().includes(query.toLowerCase())),
				)

	const handleSelect = (hall: Hall) => {
		onSelect(hall)
		onClose()
	}

	return (
		<div
			className="fixed inset-0 z-50 flex flex-col"
			style={{
				background: 'rgba(10,10,10,0.97)',
				backdropFilter: 'blur(16px)',
			}}
		>
			{/* Search input */}
			<div
				className="border-b px-4 py-4"
				style={{ borderColor: 'rgba(212,175,55,0.15)' }}
			>
				<div className="max-w-2xl mx-auto flex items-center gap-3">
					<Search
						className="w-5 h-5 flex-shrink-0"
						style={{ color: '#d4af37' }}
					/>
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder="Rechercher une salle, un quartier, une caractéristique…"
						className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-body text-base"
					/>
					{query && (
						<button
							onClick={() => setQuery('')}
							className="p-1 rounded-lg hover:bg-surface-raised transition-colors"
						>
							<X className="w-4 h-4 text-muted-foreground" />
						</button>
					)}
					<button
						onClick={onClose}
						className="px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
						style={{ borderColor: 'rgba(212,175,55,0.2)' }}
					>
						Fermer
					</button>
				</div>
			</div>

			{/* Results */}
			<div className="flex-1 overflow-y-auto py-6 px-4">
				<div className="max-w-2xl mx-auto">
					{query.trim() && (
						<p className="text-xs font-body text-muted-foreground mb-4">
							{results.length} résultat{results.length !== 1 ? 's' : ''} pour
							&ldquo;{query}&rdquo;
						</p>
					)}
					{results.length === 0 ? (
						<div className="text-center py-16">
							<p className="font-display font-semibold text-foreground mb-1">
								Aucun résultat
							</p>
							<p className="text-muted-foreground font-body text-sm">
								Essayez un autre terme de recherche.
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{results.map(hall => (
								<button
									key={hall.id}
									onClick={() => handleSelect(hall)}
									className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all hover:border-gold/40"
									style={{
										background: '#1a1a1a',
										borderColor: 'rgba(212,175,55,0.12)',
									}}
								>
									<img
										src={hall.image}
										alt={hall.name}
										className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-display text-sm font-bold text-foreground truncate">
												{hall.name}
											</h3>
											{hall.rating > 0 && (
												<div
													className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold text-black flex-shrink-0"
													style={{
														background:
															'linear-gradient(135deg, #d4af37, #f4c430)',
													}}
												>
													<Star className="w-2.5 h-2.5 fill-current" />
													{hall.rating}
												</div>
											)}
										</div>
										<div className="flex items-center gap-3 text-xs font-body text-muted-foreground">
											<span className="flex items-center gap-1">
												<MapPin className="w-3 h-3" /> {hall.location}
											</span>
											<span className="flex items-center gap-1">
												<Users className="w-3 h-3" /> {hall.capacity} pers.
											</span>
										</div>
										{hall.features.length > 0 && (
											<p className="text-xs font-body text-muted-foreground mt-1 truncate">
												{hall.features.join(' · ')}
											</p>
										)}
									</div>
									<p
										className="font-display text-sm font-bold flex-shrink-0"
										style={{ color: '#d4af37' }}
									>
										{formatPrice(hall.pricePerHour)}/h
									</p>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
