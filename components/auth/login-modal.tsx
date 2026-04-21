'use client'

import { useState } from 'react'
import {
	Eye,
	EyeOff,
	Building2,
	LogIn,
	AlertCircle,
	ArrowLeft,
	UserPlus,
	Mail,
	KeyRound,
	CheckCircle2,
} from 'lucide-react'
import { useApp } from '@/context/app-context'
import type { Role } from '@/types'

type View =
	| 'login'
	| 'register'
	| 'forgot-1'
	| 'forgot-2'
	| 'forgot-3'
	| 'forgot-success'

interface LoginModalProps {
	open: boolean
	onClose: () => void
	onLogin: (role: Role) => void
}

const INPUT_STYLE = {
	borderColor: 'rgba(212,175,55,0.2)',
} as const

function usePasswordToggle() {
	const [show, setShow] = useState(false)
	return { show, toggle: () => setShow(v => !v) }
}

function PasswordInput({
	value,
	onChange,
	placeholder = '••••••••',
	required = true,
}: {
	value: string
	onChange: (v: string) => void
	placeholder?: string
	required?: boolean
}) {
	const { show, toggle } = usePasswordToggle()
	return (
		<div className="relative">
			<input
				type={show ? 'text' : 'password'}
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
				required={required}
				className="w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm pr-12"
				style={INPUT_STYLE}
				onFocus={e => (e.target.style.borderColor = 'rgba(212,175,55,0.6)')}
				onBlur={e => (e.target.style.borderColor = 'rgba(212,175,55,0.2)')}
			/>
			<button
				type="button"
				onClick={toggle}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
				tabIndex={-1}
			>
				{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
			</button>
		</div>
	)
}

function ErrorMsg({ msg }: { msg: string }) {
	return (
		<div
			className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body"
			style={{
				background: 'rgba(239,68,68,0.1)',
				color: '#f87171',
				border: '1px solid rgba(239,68,68,0.2)',
			}}
		>
			<AlertCircle className="w-4 h-4 shrink-0" />
			{msg}
		</div>
	)
}

function GoldButton({
	loading,
	label,
	loadingLabel,
}: {
	loading: boolean
	label: string
	loadingLabel: string
}) {
	return (
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
			) : null}
			{loading ? loadingLabel : label}
		</button>
	)
}

export function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
	const { login, addUser, emailExists, updatePassword } = useApp()
	const [view, setView] = useState<View>('login')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	// Login
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// Register
	const [regName, setRegName] = useState('')
	const [regEmail, setRegEmail] = useState('')
	const [regRole, setRegRole] = useState<'client' | 'owner'>('client')
	const [regPassword, setRegPassword] = useState('')
	const [regConfirm, setRegConfirm] = useState('')

	// Forgot password
	const [fpEmail, setFpEmail] = useState('')
	const [fpCode, setFpCode] = useState('')
	const [fpPassword, setFpPassword] = useState('')
	const [fpConfirm, setFpConfirm] = useState('')

	if (!open) return null

	const resetAll = () => {
		setView('login')
		setError('')
		setEmail('')
		setPassword('')
		setRegName('')
		setRegEmail('')
		setRegPassword('')
		setRegConfirm('')
		setFpEmail('')
		setFpCode('')
		setFpPassword('')
		setFpConfirm('')
	}

	const handleClose = () => {
		resetAll()
		onClose()
	}

	const go = (v: View) => {
		setError('')
		setView(v)
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		await new Promise(r => setTimeout(r, 600))
		const user = login(email, password)
		if (user) {
			onLogin(user.role)
			resetAll()
		} else {
			setError('Email ou mot de passe incorrect.')
		}
		setLoading(false)
	}

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (regPassword.length < 8) {
			setError('Le mot de passe doit contenir au moins 8 caractères.')
			return
		}
		if (regPassword !== regConfirm) {
			setError('Les mots de passe ne correspondent pas.')
			return
		}
		if (emailExists(regEmail)) {
			setError('Un compte existe déjà avec cet email.')
			return
		}
		setLoading(true)
		await new Promise(r => setTimeout(r, 600))
		const user = addUser({
			name: regName,
			email: regEmail,
			password: regPassword,
			role: regRole,
		})
		login(user.email, user.password)
		onLogin(user.role)
		resetAll()
		setLoading(false)
	}

	const handleForgot1 = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (!emailExists(fpEmail)) {
			setError('Aucun compte trouvé avec cet email.')
			return
		}
		setLoading(true)
		await new Promise(r => setTimeout(r, 800))
		setLoading(false)
		go('forgot-2')
	}

	const handleForgot2 = (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (fpCode.length !== 6 || !/^\d{6}$/.test(fpCode)) {
			setError('Entrez le code à 6 chiffres reçu par email.')
			return
		}
		go('forgot-3')
	}

	const handleForgot3 = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (fpPassword.length < 8) {
			setError('Le mot de passe doit contenir au moins 8 caractères.')
			return
		}
		if (fpPassword !== fpConfirm) {
			setError('Les mots de passe ne correspondent pas.')
			return
		}
		setLoading(true)
		await new Promise(r => setTimeout(r, 600))
		updatePassword(fpEmail, fpPassword)
		setLoading(false)
		go('forgot-success')
	}

	const logoSection = (
		<div className="flex flex-col items-center mb-6">
			<div
				className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
				style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
			>
				<Building2 className="w-6 h-6 text-black" />
			</div>
			<h2 className="font-display font-bold text-2xl gold-gradient-text">
				EventHalls
			</h2>
		</div>
	)

	const inputClass =
		'w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm'

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
				onClick={e => e.stopPropagation()}
			>
				{/* ── LOGIN ── */}
				{view === 'login' && (
					<>
						{logoSection}
						<p className="text-muted-foreground text-sm text-center mb-6 font-body">
							Connectez-vous à votre espace
						</p>
						<form onSubmit={handleLogin} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Adresse email
								</label>
								<input
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder="votre@email.com"
									required
									className={inputClass}
									style={INPUT_STYLE}
									onFocus={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
									}
									onBlur={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
									}
								/>
							</div>
							<div>
								<div className="flex items-center justify-between mb-1.5">
									<label className="block text-sm font-medium text-foreground font-body">
										Mot de passe
									</label>
									<button
										type="button"
										onClick={() => go('forgot-1')}
										className="text-xs font-body transition-colors"
										style={{ color: '#d4af37' }}
									>
										Mot de passe oublié ?
									</button>
								</div>
								<PasswordInput value={password} onChange={setPassword} />
							</div>
							{error && <ErrorMsg msg={error} />}
							<GoldButton
								loading={loading}
								label="Se connecter"
								loadingLabel="Connexion..."
							/>
						</form>

						<div
							className="mt-5 pt-5 border-t text-center"
							style={{ borderColor: 'rgba(212,175,55,0.1)' }}
						>
							<p className="text-sm text-muted-foreground font-body">
								Pas encore de compte ?{' '}
								<button
									onClick={() => go('register')}
									className="font-semibold transition-colors"
									style={{ color: '#d4af37' }}
								>
									Créer un compte
								</button>
							</p>
						</div>

						<div
							className="mt-5 pt-5 border-t"
							style={{ borderColor: 'rgba(212,175,55,0.1)' }}
						>
							<p className="text-xs text-muted-foreground font-body mb-3 text-center">
								Comptes de démonstration
							</p>
							<div className="space-y-1.5">
								{[
									{
										email: 'client@eventhalls.com',
										password: 'Client@123',
										label: 'Client',
									},
									{
										email: 'owner@eventhalls.com',
										password: 'Owner@123',
										label: 'Propriétaire',
									},
									{
										email: 'admin@eventhalls.com',
										password: 'Admin@123',
										label: 'Administrateur',
									},
								].map(u => (
									<button
										key={u.label}
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
											{u.label}
										</span>
									</button>
								))}
							</div>
						</div>
					</>
				)}

				{/* ── REGISTER ── */}
				{view === 'register' && (
					<>
						<button
							onClick={() => go('login')}
							className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors font-body"
						>
							<ArrowLeft className="w-4 h-4" /> Retour à la connexion
						</button>
						{logoSection}
						<p className="text-muted-foreground text-sm text-center mb-6 font-body">
							Créez votre compte EventHalls
						</p>
						<form onSubmit={handleRegister} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Nom complet
								</label>
								<input
									type="text"
									value={regName}
									onChange={e => setRegName(e.target.value)}
									placeholder="Jean Dupont"
									required
									className={inputClass}
									style={INPUT_STYLE}
									onFocus={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
									}
									onBlur={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Adresse email
								</label>
								<input
									type="email"
									value={regEmail}
									onChange={e => setRegEmail(e.target.value)}
									placeholder="votre@email.com"
									required
									className={inputClass}
									style={INPUT_STYLE}
									onFocus={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
									}
									onBlur={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-2 font-body">
									Type de compte
								</label>
								<div className="grid grid-cols-2 gap-3">
									{(['client', 'owner'] as const).map(r => (
										<button
											key={r}
											type="button"
											onClick={() => setRegRole(r)}
											className="py-2.5 rounded-xl border text-sm font-body font-medium transition-all"
											style={{
												borderColor:
													regRole === r ? '#d4af37' : 'rgba(212,175,55,0.2)',
												background:
													regRole === r
														? 'rgba(212,175,55,0.12)'
														: 'transparent',
												color:
													regRole === r ? '#d4af37' : 'var(--muted-foreground)',
											}}
										>
											{r === 'client' ? 'Client' : 'Propriétaire'}
										</button>
									))}
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Mot de passe
								</label>
								<PasswordInput
									value={regPassword}
									onChange={setRegPassword}
									placeholder="Min. 8 caractères"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Confirmer le mot de passe
								</label>
								<PasswordInput
									value={regConfirm}
									onChange={setRegConfirm}
									placeholder="••••••••"
								/>
							</div>
							{error && <ErrorMsg msg={error} />}
							<GoldButton
								loading={loading}
								label="Créer mon compte"
								loadingLabel="Création..."
							/>
						</form>
					</>
				)}

				{/* ── FORGOT STEP 1 : email ── */}
				{view === 'forgot-1' && (
					<>
						<button
							onClick={() => go('login')}
							className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors font-body"
						>
							<ArrowLeft className="w-4 h-4" /> Retour
						</button>
						<div className="flex flex-col items-center mb-6">
							<div
								className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
								style={{ background: 'rgba(212,175,55,0.15)' }}
							>
								<Mail className="w-6 h-6" style={{ color: '#d4af37' }} />
							</div>
							<h2 className="font-display font-bold text-xl text-foreground">
								Mot de passe oublié
							</h2>
							<p className="text-muted-foreground text-sm mt-1 text-center font-body">
								Entrez votre email pour recevoir un code de vérification
							</p>
						</div>
						<div className="flex justify-center gap-2 mb-6">
							{[1, 2, 3].map(s => (
								<div
									key={s}
									className="w-8 h-1.5 rounded-full"
									style={{
										background: s === 1 ? '#d4af37' : 'rgba(212,175,55,0.2)',
									}}
								/>
							))}
						</div>
						<form onSubmit={handleForgot1} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Adresse email
								</label>
								<input
									type="email"
									value={fpEmail}
									onChange={e => setFpEmail(e.target.value)}
									placeholder="votre@email.com"
									required
									className={inputClass}
									style={INPUT_STYLE}
									onFocus={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
									}
									onBlur={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
									}
								/>
							</div>
							{error && <ErrorMsg msg={error} />}
							<GoldButton
								loading={loading}
								label="Envoyer le code"
								loadingLabel="Envoi en cours..."
							/>
						</form>
					</>
				)}

				{/* ── FORGOT STEP 2 : code ── */}
				{view === 'forgot-2' && (
					<>
						<div className="flex flex-col items-center mb-6">
							<div
								className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
								style={{ background: 'rgba(212,175,55,0.15)' }}
							>
								<KeyRound className="w-6 h-6" style={{ color: '#d4af37' }} />
							</div>
							<h2 className="font-display font-bold text-xl text-foreground">
								Vérification
							</h2>
							<p className="text-muted-foreground text-sm mt-1 text-center font-body">
								Un code a été envoyé à{' '}
								<span className="text-foreground font-medium">{fpEmail}</span>
							</p>
						</div>
						<div className="flex justify-center gap-2 mb-6">
							{[1, 2, 3].map(s => (
								<div
									key={s}
									className="w-8 h-1.5 rounded-full"
									style={{
										background: s <= 2 ? '#d4af37' : 'rgba(212,175,55,0.2)',
									}}
								/>
							))}
						</div>
						<div
							className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body mb-4"
							style={{
								background: 'rgba(212,175,55,0.08)',
								border: '1px solid rgba(212,175,55,0.2)',
								color: '#d4af37',
							}}
						>
							<KeyRound className="w-4 h-4 shrink-0" />
							Code de démonstration : <strong>123456</strong>
						</div>
						<form onSubmit={handleForgot2} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Code à 6 chiffres
								</label>
								<input
									type="text"
									inputMode="numeric"
									maxLength={6}
									value={fpCode}
									onChange={e => setFpCode(e.target.value.replace(/\D/g, ''))}
									placeholder="123456"
									required
									className={`${inputClass} tracking-widest text-center text-lg`}
									style={INPUT_STYLE}
									onFocus={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.6)')
									}
									onBlur={e =>
										(e.target.style.borderColor = 'rgba(212,175,55,0.2)')
									}
								/>
							</div>
							{error && <ErrorMsg msg={error} />}
							<GoldButton
								loading={false}
								label="Vérifier le code"
								loadingLabel="Vérification..."
							/>
						</form>
						<button
							onClick={() => go('forgot-1')}
							className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors font-body text-center"
						>
							Renvoyer le code
						</button>
					</>
				)}

				{/* ── FORGOT STEP 3 : new password ── */}
				{view === 'forgot-3' && (
					<>
						<div className="flex flex-col items-center mb-6">
							<div
								className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
								style={{ background: 'rgba(212,175,55,0.15)' }}
							>
								<KeyRound className="w-6 h-6" style={{ color: '#d4af37' }} />
							</div>
							<h2 className="font-display font-bold text-xl text-foreground">
								Nouveau mot de passe
							</h2>
							<p className="text-muted-foreground text-sm mt-1 text-center font-body">
								Choisissez un nouveau mot de passe sécurisé
							</p>
						</div>
						<div className="flex justify-center gap-2 mb-6">
							{[1, 2, 3].map(s => (
								<div
									key={s}
									className="w-8 h-1.5 rounded-full"
									style={{ background: '#d4af37' }}
								/>
							))}
						</div>
						<form onSubmit={handleForgot3} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Nouveau mot de passe
								</label>
								<PasswordInput
									value={fpPassword}
									onChange={setFpPassword}
									placeholder="Min. 8 caractères"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-1.5 font-body">
									Confirmer le mot de passe
								</label>
								<PasswordInput
									value={fpConfirm}
									onChange={setFpConfirm}
									placeholder="••••••••"
								/>
							</div>
							{error && <ErrorMsg msg={error} />}
							<GoldButton
								loading={loading}
								label="Réinitialiser"
								loadingLabel="Enregistrement..."
							/>
						</form>
					</>
				)}

				{/* ── FORGOT SUCCESS ── */}
				{view === 'forgot-success' && (
					<div className="flex flex-col items-center text-center py-4">
						<div
							className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
							style={{ background: 'rgba(52,211,153,0.15)' }}
						>
							<CheckCircle2 className="w-8 h-8" style={{ color: '#34d399' }} />
						</div>
						<h2 className="font-display font-bold text-xl text-foreground mb-2">
							Mot de passe réinitialisé !
						</h2>
						<p className="text-muted-foreground text-sm font-body mb-8">
							Votre mot de passe a été mis à jour avec succès. Vous pouvez
							maintenant vous connecter.
						</p>
						<button
							onClick={() => go('login')}
							className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm font-body transition-opacity hover:opacity-90"
							style={{
								background: 'linear-gradient(135deg, #d4af37, #f4c430)',
								color: '#000',
							}}
						>
							<LogIn className="w-4 h-4" />
							Se connecter
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
