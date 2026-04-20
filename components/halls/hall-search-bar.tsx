import { Search, SlidersHorizontal } from 'lucide-react'

interface HallSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function HallSearchBar({ value, onChange }: HallSearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-2xl border"
      style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
    >
      <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      <input
        type="text"
        placeholder="Rechercher une salle, un quartier..."
        className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none font-body text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Rechercher une salle"
      />
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg, #d4af37, #f4c430)',
          color: '#0a0a0a',
        }}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtrer
      </button>
    </div>
  )
}
