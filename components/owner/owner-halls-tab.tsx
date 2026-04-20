import { Star, Eye, Pencil, Trash2 } from 'lucide-react'
import { halls } from '@/lib/mock-data'

export function OwnerHallsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Mes Salles</h2>
        <button
          className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
        >
          + Ajouter une salle
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="rounded-2xl overflow-hidden border"
            style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
          >
            <div className="relative h-44">
              <img src={hall.image} alt={hall.name} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))' }}
                aria-hidden="true"
              />
              <div
                className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
              >
                <Star className="w-3 h-3 fill-current" />
                {hall.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base font-bold text-foreground mb-1">{hall.name}</h3>
              <p className="text-muted-foreground text-sm font-body mb-4">
                {hall.location} · {hall.capacity} personnes
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
                  style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                >
                  <Eye className="w-3.5 h-3.5" /> Voir
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
                  style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                >
                  <Pencil className="w-3.5 h-3.5" /> Modifier
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-red-500/50 hover:text-red-400 ml-auto"
                  style={{ borderColor: 'rgba(212,175,55,0.12)', color: 'var(--muted-foreground)' }}
                  aria-label={`Supprimer ${hall.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
