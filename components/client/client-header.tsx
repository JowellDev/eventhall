import { Search, Calendar, Heart, Bell, LogOut } from 'lucide-react'
import { AppLogo } from '@/components/shared/app-logo'

interface ClientHeaderProps {
  favoritesCount: number
  isAuthenticated: boolean
  onLogin?: () => void
  onLogout?: () => void
  onReservations?: () => void
}

export function ClientHeader({
  favoritesCount,
  isAuthenticated,
  onLogin,
  onLogout,
  onReservations,
}: ClientHeaderProps) {
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
        <AppLogo />

        <nav className="hidden md:flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors font-body text-sm">
            Explorer
          </button>
          {isAuthenticated && (
            <button
              onClick={onReservations}
              className="text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
            >
              Mes réservations
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Rechercher"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Calendrier"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground relative"
            aria-label="Favoris"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-black"
                style={{ background: '#d4af37' }}
              >
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-black"
              style={{ background: '#d4af37' }}
            >
              3
            </span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              style={{ borderColor: 'rgba(212,175,55,0.2)' }}
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-body font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#000' }}
            >
              <LogOut className="w-4 h-4 rotate-180" />
              <span>Connexion</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
