import { HallCard } from './hall-card'
import type { Hall } from '@/types'

interface HallGridProps {
  halls: Hall[]
  favorites: string[]
  onSelect: (hall: Hall) => void
  onToggleFavorite: (id: string) => void
}

export function HallGrid({ halls, favorites, onSelect, onToggleFavorite }: HallGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {halls.length} salle{halls.length > 1 ? 's' : ''} disponible{halls.length > 1 ? 's' : ''}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <HallCard
            key={hall.id}
            hall={hall}
            isFavorite={favorites.includes(hall.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}
