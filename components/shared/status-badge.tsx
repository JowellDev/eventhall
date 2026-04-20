import type { BookingStatus } from '@/types'

type OwnerStatus = 'active' | 'pending'
type StatusVariant = BookingStatus | OwnerStatus

const CONFIG: Record<
  StatusVariant,
  { label: string; color: string; bg: string; border: string }
> = {
  confirmed: {
    label: 'Confirmée',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
  },
  refused: {
    label: 'Refusée',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
  },
  pending: {
    label: 'En attente',
    color: '#d4af37',
    bg: 'rgba(212,175,55,0.1)',
    border: 'rgba(212,175,55,0.3)',
  },
  active: {
    label: 'Actif',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
  },
}

interface StatusBadgeProps {
  status: StatusVariant
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = CONFIG[status]
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold font-body"
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  )
}
