'use client'

import { useLanguage } from '@/context/language-context'
import type { BookingStatus, OwnerStatus } from '@/types'
import type { TranslationKey } from '@/lib/i18n/fr'

type StatusVariant = BookingStatus | OwnerStatus

const CONFIG: Record<StatusVariant, { key: TranslationKey; color: string; bg: string; border: string }> = {
  confirmed: {
    key: 'status.confirmed',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
  },
  refused: {
    key: 'status.refused',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
  },
  pending: {
    key: 'status.pending',
    color: '#d4af37',
    bg: 'rgba(212,175,55,0.1)',
    border: 'rgba(212,175,55,0.3)',
  },
  cancelled: {
    key: 'status.cancelled',
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.1)',
    border: 'rgba(148,163,184,0.3)',
  },
  active: {
    key: 'status.active',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
  },
  suspended: {
    key: 'status.suspended',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
  },
}

interface StatusBadgeProps {
  status: StatusVariant
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage()
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
      {t(cfg.key)}
    </span>
  )
}
