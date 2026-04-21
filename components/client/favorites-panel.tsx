'use client'

import { X, Heart, MapPin, Users, Star } from 'lucide-react'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'
import type { Hall } from '@/types'

interface FavoritesPanelProps {
  favorites: string[]
  onClose: () => void
  onSelect: (hall: Hall) => void
  onToggle: (id: string) => void
}

export function FavoritesPanel({ favorites, onClose, onSelect, onToggle }: FavoritesPanelProps) {
  const { halls } = useApp()
  const favoriteHalls = halls.filter((h) => favorites.includes(h.id))

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="ml-auto h-full w-full max-w-md flex flex-col"
        style={{ background: '#111', borderLeft: '1px solid rgba(212,175,55,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'rgba(212,175,55,0.12)' }}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" style={{ color: '#d4af37' }} />
            <h2 className="font-display text-lg font-bold text-foreground">Mes favoris</h2>
            {favoriteHalls.length > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold font-body text-black"
                style={{ background: '#d4af37' }}
              >
                {favoriteHalls.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {favoriteHalls.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,175,55,0.08)' }}
              >
                <Heart className="w-8 h-8" style={{ color: 'rgba(212,175,55,0.3)' }} />
              </div>
              <p className="text-foreground font-display font-semibold mb-1">Aucun favori</p>
              <p className="text-muted-foreground font-body text-sm">
                Cliquez sur le cœur d'une salle pour l'ajouter à vos favoris.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteHalls.map((hall) => (
                <div
                  key={hall.id}
                  className="rounded-xl border overflow-hidden cursor-pointer transition-all hover:border-gold/40"
                  style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
                >
                  <div className="relative h-32">
                    <img
                      src={hall.image}
                      alt={hall.name}
                      className="w-full h-full object-cover"
                      onClick={() => onSelect(hall)}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))',
                      }}
                    />
                    <button
                      onClick={() => onToggle(hall.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full transition-all hover:scale-110"
                      style={{ background: 'rgba(0,0,0,0.6)' }}
                      aria-label="Retirer des favoris"
                    >
                      <Heart className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                    </button>
                    {hall.rating > 0 && (
                      <div
                        className="absolute bottom-2 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-black"
                        style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        {hall.rating}
                      </div>
                    )}
                  </div>
                  <div className="p-3" onClick={() => onSelect(hall)}>
                    <h3 className="font-display text-sm font-bold text-foreground mb-1">{hall.name}</h3>
                    <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {hall.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {hall.capacity} pers.
                      </span>
                    </div>
                    <p className="text-xs font-semibold font-body mt-1.5" style={{ color: '#d4af37' }}>
                      {formatPrice(hall.pricePerHour)}/h
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
