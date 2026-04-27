import { MapPin, Star, Heart, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/mock-data'
import { useLanguage } from '@/context/language-context'
import type { Hall } from '@/types'

interface HallCardProps {
  hall: Hall
  isFavorite: boolean
  onSelect: (hall: Hall) => void
  onToggleFavorite: (id: string) => void
}

export function HallCard({
  hall,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: HallCardProps) {
  const { t } = useLanguage()

  return (
    <article
      className="card-hover-gold rounded-2xl overflow-hidden border cursor-pointer group"
      style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
      onClick={() => onSelect(hall)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={hall.image}
          alt={hall.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold font-body text-black"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          {hall.rating}
        </div>

        <button
          className="absolute top-3 left-3 p-2 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={e => {
            e.stopPropagation()
            onToggleFavorite(hall.id)
          }}
          aria-label={isFavorite ? t('hall.removeFromFavorites') : t('hall.addToFavorites')}
        >
          <Heart
            className="w-4 h-4 transition-colors"
            style={{
              color: isFavorite ? '#d4af37' : 'white',
              fill: isFavorite ? '#d4af37' : 'transparent',
            }}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          {hall.name}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3 font-body">
          <MapPin
            className="w-4 h-4 flex-shrink-0"
            style={{ color: '#d4af37' }}
          />
          {hall.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hall.features.map(f => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-lg text-xs font-body font-medium"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#d4af37',
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-bold gold-gradient-text">
              {formatPrice(hall.pricePerHour)}
            </span>
            <span className="text-muted-foreground text-xs font-body ml-1">
              {t('common.perHour')}
            </span>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #d4af37, #f4c430)',
              color: '#0a0a0a',
            }}
            onClick={e => {
              e.stopPropagation()
              onSelect(hall)
            }}
          >
            {t('hall.book')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
