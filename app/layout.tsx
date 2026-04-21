import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'EventHalls — Gérez vos événements avec élégance',
	description:
		"La plateforme premium de réservation de salles événementielles à Abidjan. Trouvez et réservez votre salle d'exception.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fr" className={`${montserrat.variable} bg-background`}>
			<head>
				{/* Prevent flash of wrong theme on first load */}
				<script
					dangerouslySetInnerHTML={{
						__html: `try{const t=localStorage.getItem('eventhall-theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}`,
					}}
				/>
			</head>
			<body className="bg-background text-foreground font-sans antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
