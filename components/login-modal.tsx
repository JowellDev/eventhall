'use client'

import { useState } from 'react'
import { Eye, EyeOff, Building2, LogIn, AlertCircle } from 'lucide-react'

type Role = 'client' | 'owner' | 'admin'

interface LoginModalProps {
	open: boolean
	onClose: () => void
	onLogin: (role: Role) => void
}

const MOCK_USERS: {
	email: string
	password: string
	role: Role
	name: string
}[] = [
	{
		email: 'client@eventhalls.com',
		password: 'Client@123',
		role: 'client',
		name: 'Client',
	},
	{
		email: 'owner@eventhalls.com',
		password: 'Owner@123',
		role: 'owner',
		name: 'Propriétaire',
	},
	{
		email: 'admin@eventhalls.com',
		password: 'Admin@123',
		role: 'admin',
		name: 'Administrateur',
	},
]

export function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	if (!open) return null

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		await new Promise((r) => setTimeout(r, 600))

		const user = MOCK_USERS.find(
			(u) =>
				u.email.toLowerCase() === email.toLowerCase() &&
				u.password === password,
		)

		if (user) {
			onLogin(user.role)
			setEmail('')
			setPassword('')
		} else {
			setError('Email ou mot de passe incorrect.')
		}

		setLoading(false)
	}

	const handleClose = () => {
		setEmail('')
		setPassword('')
		setError('')
		onClose()
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
			onClick={handleClose}
		>
			<div
				className="w-full max-w-md rounded-2xl border p-8"
				style={{
					background: '#111',
					borderColor: 'rgba(212,175,55,0.25)',
					boxShadow: '0 0 60px rgba(212,175,55,0.08)',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Logo */}
				<div className="flex flex-col items-center mb-8">
					<div
						className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
						style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
					>
						<Building2 className="w-6 h-6 text-black" />
					</div>
					<h2 className="font-display font-bold text-2xl gold-gradient-text">
						EventHalls
					</h2>
					<p className="text-muted-foreground text-sm mt-1 font-body">
						Connectez-vous à votre espace
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
							Adresse email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="votre@email.com"
							required
							className="w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm"
							style={{ borderColor: 'rgba(212,175,55,0.2)' }}
							onFocus={(e) =>
								(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
							}
							onBlur={(e) =>
								(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
							}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
							Mot de passe
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								className="w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm pr-12"
								style={{ borderColor: 'rgba(212,175,55,0.2)' }}
								onFocus={(e) =>
									(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
								}
								onBlur={(e) =>
									(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
								}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((v) => !v)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								tabIndex={-1}
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

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

					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm font-body transition-opacity"
						style={{
							background: 'linear-gradient(135deg, #d4af37, #f4c430)',
							color: '#000',
							opacity: loading ? 0.7 : 1,
						}}
					>
						{loading ? (
							<span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
						) : (
							<LogIn className="w-4 h-4" />
						)}
						{loading ? 'Connexion...' : 'Se connecter'}
					</button>
				</form>

				{/* Demo credentials */}
				<div
					className="mt-6 pt-6 border-t"
					style={{ borderColor: 'rgba(212,175,55,0.1)' }}
				>
					<p className="text-xs text-muted-foreground font-body mb-3 text-center">
						Comptes de démonstration
					</p>
					<div className="space-y-1.5">
						{MOCK_USERS.map((u) => (
							<button
								key={u.role}
								type="button"
								onClick={() => {
									setEmail(u.email)
									setPassword(u.password)
								}}
								className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-raised transition-colors text-xs font-body"
								style={{ border: '1px solid rgba(212,175,55,0.1)' }}
							>
								<span className="text-muted-foreground">{u.email}</span>
								<span
									className="px-2 py-0.5 rounded-full font-medium"
									style={{
										background: 'rgba(212,175,55,0.15)',
										color: '#d4af37',
									}}
								>
									{u.name}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
