import { Building2 } from 'lucide-react'

interface AppLogoProps {
	size?: 'sm' | 'md'
}

export function AppLogo({ size = 'md' }: AppLogoProps) {
	const iconSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
	const iconInner = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
	const textSize = size === 'sm' ? 'text-base' : 'text-lg'

	return (
		<div className="flex items-center gap-2">
			<div
				className={`${iconSize} rounded-lg flex items-center justify-center`}
				style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
			>
				<Building2 className={`${iconInner} text-black`} />
			</div>
			<span className={`font-display font-bold ${textSize} gold-gradient-text`}>
				EventHalls
			</span>
		</div>
	)
}
