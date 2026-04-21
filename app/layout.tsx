import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
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
			<body className="font-sans antialiased bg-background text-foreground">
				{children}
			</body>
		</html>
	)
}
