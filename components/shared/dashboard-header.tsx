'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Home } from 'lucide-react'
import { AppLogo } from './app-logo'

interface Tab {
	key: string
	label: string
}

interface DashboardHeaderProps {
	subtitle?: string
	badge?: React.ReactNode
	tabs: Tab[]
	basePath: string
	onLogout: () => void
}

export function DashboardHeader({
	subtitle,
	badge,
	tabs,
	basePath,
	onLogout,
}: DashboardHeaderProps) {
	const pathname = usePathname()

	const isActive = (key: string) => pathname === `${basePath}/${key}`

	const tabStyle = (key: string) => ({
		background: isActive(key) ? 'rgba(212,175,55,0.12)' : 'transparent',
		color: isActive(key) ? '#d4af37' : 'var(--muted-foreground)',
		border: isActive(key)
			? '1px solid rgba(212,175,55,0.2)'
			: '1px solid transparent',
	})

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
						<Link
							key={tab.key}
							href={`${basePath}/${tab.key}`}
							className="px-4 py-2 rounded-xl text-sm font-body font-medium transition-all"
							style={tabStyle(tab.key)}
						>
							{tab.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<Link
						href="/"
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
						style={{ borderColor: 'rgba(212,175,55,0.2)' }}
					>
						<Home className="w-4 h-4" />
						<span className="hidden md:inline">Accueil</span>
					</Link>
					<button
						onClick={onLogout}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
						style={{ borderColor: 'rgba(212,175,55,0.2)' }}
					>
						<LogOut className="w-4 h-4" />
						<span className="hidden md:inline">Déconnexion</span>
					</button>
				</div>
			</div>

			{/* Mobile tab nav */}
			<div className="md:hidden flex overflow-x-auto px-4 pb-3 gap-1">
				{tabs.map(tab => (
					<Link
						key={tab.key}
						href={`${basePath}/${tab.key}`}
						className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all"
						style={tabStyle(tab.key)}
					>
						{tab.label}
					</Link>
				))}
			</div>
		</header>
	)
}
