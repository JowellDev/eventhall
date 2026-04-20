'use client'

import { X, ArrowLeft } from 'lucide-react'
import { useBooking } from '@/hooks/use-booking'
import { BookingStepDatetime } from './booking-step-datetime'
import { BookingStepPackages } from './booking-step-packages'
import { BookingStepReview } from './booking-step-review'
import { BookingConfirmation } from './booking-confirmation'
import type { Hall } from '@/types'

interface BookingModalProps {
  hall: Hall
  onClose: () => void
}

const STEP_LABELS = ['Date & Heure', 'Options', 'Récapitulatif']

export function BookingModal({ hall, onClose }: BookingModalProps) {
  const { step, setStep, data, setData, confirmed, togglePackage, calculateTotal, confirm, goBack } =
    useBooking()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Réservation"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden border"
        style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
      >
        {/* Header */}
        <div className="p-5 border-b" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {step > 1 && !confirmed && (
                <button
                  onClick={goBack}
                  className="p-1.5 rounded-lg hover:bg-surface-overlay transition-colors"
                  aria-label="Étape précédente"
                >
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <h2 className="font-display text-lg font-bold text-foreground">
                {confirmed ? 'Réservation confirmée' : `Réserver — ${hall.name}`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Progress */}
          {!confirmed && (
            <div className="flex items-center gap-2">
              {STEP_LABELS.map((label, i) => {
                const s = i + 1
                const active = s <= step
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all"
                      style={{
                        background: active
                          ? 'linear-gradient(135deg, #d4af37, #f4c430)'
                          : 'rgba(212,175,55,0.1)',
                        color: active ? '#0a0a0a' : '#888',
                        border: s === step ? '2px solid #f4c430' : 'none',
                      }}
                    >
                      {s}
                    </div>
                    <span
                      className="text-xs font-body"
                      style={{ color: active ? '#d4af37' : '#555' }}
                    >
                      {label}
                    </span>
                    {s < 3 && (
                      <div
                        className="w-6 h-px"
                        style={{ background: s < step ? '#d4af37' : '#333' }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Step content */}
        <div className="p-5">
          {confirmed ? (
            <BookingConfirmation hallName={hall.name} onClose={onClose} />
          ) : step === 1 ? (
            <BookingStepDatetime
              data={data}
              onChange={setData}
              onNext={() => setStep(2)}
            />
          ) : step === 2 ? (
            <BookingStepPackages
              data={data}
              onTogglePackage={togglePackage}
              onNext={() => setStep(3)}
            />
          ) : (
            <BookingStepReview
              hall={hall}
              data={data}
              total={calculateTotal(hall)}
              onConfirm={confirm}
            />
          )}
        </div>
      </div>
    </div>
  )
}
