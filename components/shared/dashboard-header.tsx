import { LogOut } from 'lucide-react'
import { AppLogo } from './app-logo'

interface Tab {
	key: string
	label: string
}

interface DashboardHeaderProps {
	subtitle?: string
	badge?: React.ReactNode
	tabs: Tab[]
	activeTab: string
	onTabChange: (key: string) => void
	onLogout: () => void
}

export function DashboardHeader({
	subtitle,
	badge,
	tabs,
	activeTab,
	onTabChange,
	onLogout,
}: DashboardHeaderProps) {
	return (
		<header
			className="sticky top-0 z-40 border-b"
			style={{
				background: 'rgba(10,10,10,0.95)',
				backdropFilter: 'blur(20px)',
				borderColor: 'rgba(212,175,55,0.15)',
			}}
		>
			<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<AppLogo />
					{subtitle && (
						<span className="hidden md:block text-muted-foreground text-sm font-body">
							/ {subtitle}
						</span>
					)}
					{badge}
				</div>

				<nav className="hidden md:flex items-center gap-1">
					{tabs.map(tab => (
						<button
							key={tab.key}
							onClick={() => onTabChange(tab.key)}
							className="px-4 py-2 rounded-xl text-sm font-body font-medium transition-all"
							style={{
								background:
									activeTab === tab.key
										? 'rgba(212,175,55,0.12)'
										: 'transparent',
								color:
									activeTab === tab.key ? '#d4af37' : 'var(--muted-foreground)',
								border:
									activeTab === tab.key
										? '1px solid rgba(212,175,55,0.2)'
										: '1px solid transparent',
							}}
						>
							{tab.label}
						</button>
					))}
				</nav>

				<button
					onClick={onLogout}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
					style={{ borderColor: 'rgba(212,175,55,0.2)' }}
				>
					<LogOut className="w-4 h-4" />
					<span className="hidden md:inline">Déconnexion</span>
				</button>
			</div>

			{/* Mobile tab nav */}
			<div className="md:hidden flex overflow-x-auto px-4 pb-3 gap-1">
				{tabs.map(tab => (
					<button
						key={tab.key}
						onClick={() => onTabChange(tab.key)}
						className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all"
						style={{
							background:
								activeTab === tab.key ? 'rgba(212,175,55,0.12)' : 'transparent',
							color:
								activeTab === tab.key ? '#d4af37' : 'var(--muted-foreground)',
							border:
								activeTab === tab.key
									? '1px solid rgba(212,175,55,0.2)'
									: '1px solid transparent',
						}}
					>
						{tab.label}
					</button>
				))}
			</div>
		</header>
	)
}
