import { Eye, Pencil } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'

const owners = [
  { id: 'o1', name: 'Kouamé Jean-Paul', email: 'jp.kouame@mail.ci', halls: 3, revenue: '8.5M FCFA', status: 'active' as const },
  { id: 'o2', name: 'Traoré Fatou', email: 'f.traore@mail.ci', halls: 2, revenue: '5.2M FCFA', status: 'active' as const },
  { id: 'o3', name: 'Koffi Akissi', email: 'a.koffi@mail.ci', halls: 1, revenue: '2.1M FCFA', status: 'pending' as const },
  { id: 'o4', name: 'Bah Mohamed', email: 'm.bah@mail.ci', halls: 4, revenue: '12.4M FCFA', status: 'active' as const },
  { id: 'o5', name: 'Assi Christiane', email: 'c.assi@mail.ci', halls: 2, revenue: '6.8M FCFA', status: 'active' as const },
]

export function AdminOwnersTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Tous les propriétaires
        </h2>
        <button
          className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
        >
          + Ajouter
        </button>
      </div>
      <div className="space-y-3">
        {owners.map((owner) => (
          <div
            key={owner.id}
            className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5 border"
            style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-base text-black"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
              >
                {owner.name.charAt(0)}
              </div>
              <div>
                <p className="font-body font-semibold text-foreground">{owner.name}</p>
                <p className="text-xs text-muted-foreground font-body">{owner.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm font-body">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Salles</p>
                <p className="font-semibold text-foreground">{owner.halls}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Revenus</p>
                <p className="font-semibold gold-gradient-text">{owner.revenue}</p>
              </div>
              <StatusBadge status={owner.status} />
              <div className="flex gap-2 ml-2">
                <button
                  className="p-2 rounded-lg border transition-all hover:border-gold"
                  style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                  aria-label="Voir"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg border transition-all hover:border-gold"
                  style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                  aria-label="Modifier"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
