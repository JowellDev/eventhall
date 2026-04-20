'use client'

import { useState } from 'react'
import { ClientHeader } from './client-header'
import { ClientReservations } from './client-reservations'
import { HallSearchBar } from '@/components/halls/hall-search-bar'
import { HallGrid } from '@/components/halls/hall-grid'
import { HallDetailModal } from '@/components/halls/hall-detail-modal'
import { BookingModal } from '@/components/booking/booking-modal'
import { useFavorites } from '@/hooks/use-favorites'
import { useHallSearch } from '@/hooks/use-hall-search'
import { useApp } from '@/context/app-context'
import type { Hall } from '@/types'

interface ClientPageProps {
  isAuthenticated?: boolean
  onLogin?: () => void
  onLogout?: () => void
}

type ModalState = 'detail' | 'booking' | null

export function ClientPage({
  isAuthenticated = false,
  onLogin,
  onLogout,
}: ClientPageProps) {
  const { halls } = useApp()
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites()
  const { searchQuery, setSearchQuery, filteredHalls } = useHallSearch(halls)
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null)
  const [modal, setModal] = useState<ModalState>(null)
  const [showReservations, setShowReservations] = useState(false)

  const openDetail = (hall: Hall) => {
    setSelectedHall(hall)
    setModal('detail')
  }

  const closeModal = () => {
    setModal(null)
    setSelectedHall(null)
  }

  const handleBook = () => {
    if (!isAuthenticated) {
      onLogin?.()
      return
    }
    setModal('booking')
  }

  const handleReservations = () => {
    if (!isAuthenticated) {
      onLogin?.()
      return
    }
    setShowReservations(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader
        favoritesCount={favorites.length}
        isAuthenticated={isAuthenticated}
        onLogin={onLogin}
        onLogout={onLogout}
        onReservations={handleReservations}
      />

      <main>
        {/* Hero */}
        <section className="px-4 pt-16 pb-12 text-center relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% -5%, rgba(212,175,55,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance relative z-10">
            Trouvez votre salle{' '}
            <span className="gold-gradient-text">d&apos;exception</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto font-body relative z-10">
            Des espaces prestige pour vos événements les plus mémorables à Abidjan
          </p>
          <div className="max-w-2xl mx-auto relative z-10">
            <HallSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </section>

        <HallGrid
          halls={filteredHalls}
          favorites={favorites}
          onSelect={openDetail}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      {modal === 'detail' && selectedHall && (
        <HallDetailModal
          hall={selectedHall}
          isFavorite={isFavorite(selectedHall.id)}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
          onBook={handleBook}
        />
      )}

      {modal === 'booking' && selectedHall && (
        <BookingModal hall={selectedHall} onClose={closeModal} />
      )}

      {showReservations && (
        <ClientReservations onClose={() => setShowReservations(false)} />
      )}
    </div>
  )
}
