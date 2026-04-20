'use client'

import { CheckCircle2, XCircle } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'

export function OwnerBookingsTab() {
  const { bookings, updateBookingStatus } = useApp()

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-foreground mb-6">Réservations</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl p-5 border"
            style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-base font-bold text-foreground">
                    {booking.hallName}
                  </h3>
                  <StatusBadge status={booking.status} />
                </div>
                <p className="text-sm font-body text-muted-foreground">
                  <strong className="text-foreground">{booking.client}</strong> · {booking.date} ·{' '}
                  {booking.time}
                </p>
                {booking.packages.length > 0 && (
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    Options: {booking.packages.join(', ')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold gold-gradient-text">
                  {formatPrice(booking.total)}
                </span>
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all hover:opacity-90"
                      style={{
                        background: 'rgba(52,211,153,0.15)',
                        color: '#34d399',
                        border: '1px solid rgba(52,211,153,0.3)',
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accepter
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'refused')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all hover:opacity-90"
                      style={{
                        background: 'rgba(248,113,113,0.1)',
                        color: '#f87171',
                        border: '1px solid rgba(248,113,113,0.3)',
                      }}
                    >
                      <XCircle className="w-3.5 h-3.5" /> Refuser
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
