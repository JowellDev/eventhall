import { packages, formatPrice } from '@/lib/mock-data'
import type { BookingFormData, Hall } from '@/types'

interface BookingStepReviewProps {
  hall: Hall
  data: BookingFormData
  total: number
  onConfirm: () => void
}

export function BookingStepReview({ hall, data, total, onConfirm }: BookingStepReviewProps) {
  const selectedPackageLabels = data.selectedPackages
    .map((id) => packages.find((p) => p.id === id)?.label)
    .filter(Boolean)
    .join(', ')

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: '#111', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <h3 className="font-display text-base font-semibold text-foreground">{hall.name}</h3>
        <div className="space-y-2 text-sm font-body">
          <div className="flex justify-between text-muted-foreground">
            <span>Date</span>
            <span className="text-foreground">{data.date}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Horaire</span>
            <span className="text-foreground">
              {data.startTime} — {data.endTime}
            </span>
          </div>
          {selectedPackageLabels && (
            <div className="flex justify-between text-muted-foreground">
              <span>Options</span>
              <span className="text-foreground text-right">{selectedPackageLabels}</span>
            </div>
          )}
          <div
            className="h-px my-2"
            style={{ background: 'rgba(212,175,55,0.12)' }}
            aria-hidden="true"
          />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Total estimé</span>
            <span className="font-display text-xl font-bold gold-gradient-text">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full py-3 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90 hover:scale-[1.02]"
        style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
      >
        Confirmer la réservation
      </button>
    </div>
  )
}
