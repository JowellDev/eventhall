import { ChevronRight, Package } from 'lucide-react'
import { packages, formatPrice } from '@/lib/mock-data'
import type { BookingFormData } from '@/types'

interface BookingStepPackagesProps {
	data: BookingFormData
	onTogglePackage: (id: string) => void
	onNext: () => void
}

export function BookingStepPackages({
	data,
	onTogglePackage,
	onNext,
}: BookingStepPackagesProps) {
	return (
		<div className="space-y-4">
			<p className="text-muted-foreground text-sm font-body">
				Sélectionnez les options supplémentaires pour votre événement
			</p>
			<div className="space-y-3">
				{packages.map(pkg => {
					const isSelected = data.selectedPackages.includes(pkg.id)
					return (
						<button
							key={pkg.id}
							onClick={() => onTogglePackage(pkg.id)}
							className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all"
							style={{
								background: isSelected ? 'rgba(212,175,55,0.08)' : '#111',
								borderColor: isSelected
									? 'rgba(212,175,55,0.5)'
									: 'rgba(212,175,55,0.12)',
							}}
							aria-pressed={isSelected}
						>
							<div
								className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
								style={{
									background: isSelected
										? 'linear-gradient(135deg, #d4af37, #f4c430)'
										: 'rgba(212,175,55,0.1)',
								}}
							>
								<Package
									className="w-4 h-4"
									style={{ color: isSelected ? '#0a0a0a' : '#d4af37' }}
								/>
							</div>
							<div className="flex-1">
								<p
									className="text-sm font-semibold font-body"
									style={{
										color: isSelected ? '#d4af37' : 'var(--foreground)',
									}}
								>
									{pkg.label}
								</p>
								<p className="text-xs text-muted-foreground font-body">
									+{formatPrice(pkg.price)}
								</p>
							</div>
							<div
								className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
								style={{ borderColor: isSelected ? '#d4af37' : '#555' }}
							>
								{isSelected && (
									<div
										className="w-2.5 h-2.5 rounded-full"
										style={{ background: '#d4af37' }}
									/>
								)}
							</div>
						</button>
					)
				})}
			</div>
			<button
				onClick={onNext}
				className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 mt-2"
				style={{
					background: 'linear-gradient(135deg, #d4af37, #f4c430)',
					color: '#0a0a0a',
				}}
			>
				Continuer
				<ChevronRight className="w-4 h-4 inline ml-1" />
			</button>
		</div>
	)
}
