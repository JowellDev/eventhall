import type { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string
  icon: LucideIcon
  change: string
  positive: boolean
}

export function KpiCard({ label, value, icon: Icon, change, positive }: KpiCardProps) {
  return (
    <div
      className="rounded-2xl p-4 sm:p-5 border"
      style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(212,175,55,0.1)' }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#d4af37' }} />
        </div>
        <span
          className={`text-xs font-body font-semibold px-2 py-0.5 rounded-full ${
            positive
              ? 'text-emerald-400 bg-emerald-400/10'
              : 'text-red-400 bg-red-400/10'
          }`}
        >
          {change}
        </span>
      </div>
      <p className="font-display text-xl sm:text-2xl font-bold gold-gradient-text mb-0.5 truncate">
        {value}
      </p>
      <p className="text-muted-foreground text-xs font-body leading-tight">{label}</p>
    </div>
  )
}
