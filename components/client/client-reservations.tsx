'use client'

import { useState } from 'react'
import { X, AlertTriangle, Pencil, XCircle, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { useApp } from '@/context/app-context'
import { packages, formatPrice } from '@/lib/mock-data'
import type { Booking, BookingFormData, BookingStatus } from '@/types'

interface ClientReservationsProps {
  onClose: () => void
}

type FilterTab = 'all' | 'pending' | 'confirmed' | 'cancelled'

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'pending', label: 'En attente' },
  { key: 'confirmed', label: 'Confirmées' },
  { key: 'cancelled', label: 'Annulées' },
]

/* ─── Modify Modal ─── */
function ModifyModal({
  booking,
  onClose,
  onSave,
}: {
  booking: Booking
  onClose: () => void
  onSave: (updates: Partial<Booking>) => void
}) {
  const [timeParts] = useState(() => {
    const parts = booking.time.split(' - ')
    return { start: parts[0] ?? '', end: parts[1] ?? '' }
  })

  const [date, setDate] = useState(booking.date)
  const [startTime, setStartTime] = useState(timeParts.start)
  const [endTime, setEndTime] = useState(timeParts.end)
  const [selectedPackages, setSelectedPackages] = useState<string[]>(
    booking.packages.map((p) => p.toLowerCase().replace(' ', '')),
  )
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [saved, setSaved] = useState(false)

  const togglePackage = (id: string) => {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  const calculateTotal = () => {
    const hall = { pricePerHour: 0 }
    // We use duration from start/end times
    const start = parseInt(startTime.split(':')[0] ?? '0')
    const end = parseInt(endTime.split(':')[0] ?? '0')
    const hours = end > start ? end - start : 0
    // Retrieve pricePerHour from context? We'll approximate from original booking
    const pricePerHour = booking.total / booking.duration
    const pkgCost = selectedPackages.reduce((sum, id) => {
      const pkg = packages.find((p) => p.id === id)
      return sum + (pkg?.price ?? 0)
    }, 0)
    return pricePerHour * hours + pkgCost
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-colors font-body text-sm'
  const inputStyle = { borderColor: 'rgba(212,175,55,0.2)' }
  const focus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = 'rgba(212,175,55,0.6)')
  const blur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = 'rgba(212,175,55,0.2)')

  const handleSave = () => {
    const start = parseInt(startTime.split(':')[0] ?? '0')
    const end = parseInt(endTime.split(':')[0] ?? '0')
    const duration = end > start ? end - start : booking.duration
    onSave({
      date,
      time: `${startTime} - ${endTime}`,
      duration,
      packages: selectedPackages.map(
        (id) => packages.find((p) => p.id === id)?.label ?? id,
      ),
      total: calculateTotal(),
      status: 'pending',
    })
    setSaved(true)
  }

  const canProceed1 = date && startTime && endTime

  if (saved) {
    return (
      <div
        className="fixed inset-0 z-60 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8 border text-center"
          style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(52,211,153,0.15)' }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: '#34d399' }} />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            Réservation modifiée !
          </h3>
          <p className="text-muted-foreground text-sm font-body mb-6">
            Votre demande de modification a été soumise. Le propriétaire vous répondra sous 24h.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-semibold text-sm font-body"
            style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#000' }}
          >
            Fermer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                  className="p-1.5 rounded-lg hover:bg-surface-overlay transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              <h2 className="font-display text-lg font-bold text-foreground">
                Modifier — {booking.hallName}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-overlay transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-2">
            {['Date & Heure', 'Options', 'Récapitulatif'].map((label, i) => {
              const s = i + 1
              const active = s <= step
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all"
                    style={{
                      background: active ? 'linear-gradient(135deg, #d4af37, #f4c430)' : 'rgba(212,175,55,0.1)',
                      color: active ? '#0a0a0a' : '#888',
                      border: s === step ? '2px solid #f4c430' : 'none',
                    }}
                  >
                    {s}
                  </div>
                  <span className="text-xs font-body" style={{ color: active ? '#d4af37' : '#555' }}>
                    {label}
                  </span>
                  {s < 3 && (
                    <div className="w-6 h-px" style={{ background: s < step ? '#d4af37' : '#333' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Heure de début</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Heure de fin</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>
              <button
                onClick={() => canProceed1 && setStep(2)}
                disabled={!canProceed1}
                className="w-full py-3 rounded-xl font-semibold text-sm font-body transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #d4af37, #f4c430)',
                  color: '#000',
                  opacity: canProceed1 ? 1 : 0.4,
                }}
              >
                Continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-body mb-4">
                Sélectionnez les options souhaitées
              </p>
              {packages.map((pkg) => {
                const active = selectedPackages.includes(pkg.id)
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => togglePackage(pkg.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-left"
                    style={{
                      borderColor: active ? '#d4af37' : 'rgba(212,175,55,0.15)',
                      background: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                    }}
                  >
                    <span className="font-body text-sm font-medium text-foreground">{pkg.label}</span>
                    <span className="font-body text-sm font-semibold" style={{ color: '#d4af37' }}>
                      +{formatPrice(pkg.price)}
                    </span>
                  </button>
                )
              })}
              <button
                onClick={() => setStep(3)}
                className="w-full py-3 rounded-xl font-semibold text-sm font-body transition-opacity hover:opacity-90 mt-4"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#000' }}
              >
                Continuer
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div
                className="rounded-xl p-4 space-y-3"
                style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Salle</span>
                  <span className="text-foreground font-medium">{booking.hallName}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground font-medium">{date}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Horaires</span>
                  <span className="text-foreground font-medium">{startTime} – {endTime}</span>
                </div>
                {selectedPackages.length > 0 && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Options</span>
                    <span className="text-foreground font-medium text-right max-w-[60%]">
                      {selectedPackages.map((id) => packages.find((p) => p.id === id)?.label ?? id).join(', ')}
                    </span>
                  </div>
                )}
                <div
                  className="pt-3 border-t flex justify-between"
                  style={{ borderColor: 'rgba(212,175,55,0.15)' }}
                >
                  <span className="font-body font-semibold text-foreground">Total</span>
                  <span className="font-display font-bold text-lg gold-gradient-text">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3 rounded-xl font-semibold text-sm font-body transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#000' }}
              >
                Confirmer la modification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Cancel Dialog ─── */
function CancelDialog({
  booking,
  onClose,
  onConfirm,
}: {
  booking: Booking
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 border"
        style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(248,113,113,0.15)' }}
        >
          <AlertTriangle className="w-6 h-6" style={{ color: '#f87171' }} />
        </div>
        <h3 className="font-display font-bold text-lg text-foreground text-center mb-2">
          Annuler la réservation ?
        </h3>
        <p className="text-muted-foreground text-sm font-body text-center mb-6">
          Vous êtes sur le point d'annuler votre réservation à{' '}
          <strong className="text-foreground">{booking.hallName}</strong> le{' '}
          <strong className="text-foreground">{booking.date}</strong>. Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            style={{ borderColor: 'rgba(212,175,55,0.2)' }}
          >
            Retour
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-sm font-body font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'rgba(248,113,113,0.9)', color: '#fff' }}
          >
            Annuler la réservation
          </button>
        </div>
      </div>
    </div>
  )
}

const PAGE_SIZE_OPTIONS = [5, 10, 25]

/* ─── Main Component ─── */
export function ClientReservations({ onClose }: ClientReservationsProps) {
  const { bookings, updateBookingStatus, updateBooking } = useApp()
  const [filter, setFilter] = useState<FilterTab>('all')
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null)
  const [modifyTarget, setModifyTarget] = useState<Booking | null>(null)

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true
    if (filter === 'cancelled') return b.status === 'cancelled' || b.status === 'refused'
    return b.status === filter
  })

  const { page, setPage, pageSize, setPageSize, paginatedItems, totalPages, total, from, to } =
    usePagination(filtered, 5)

  const handleCancel = (booking: Booking) => setCancelTarget(booking)
  const confirmCancel = () => {
    if (cancelTarget) {
      updateBookingStatus(cancelTarget.id, 'cancelled')
      setCancelTarget(null)
    }
  }

  const handleModify = (booking: Booking) => setModifyTarget(booking)
  const handleSaveModify = (updates: Partial<Booking>) => {
    if (modifyTarget) updateBooking(modifyTarget.id, updates)
  }

  const canCancel = (status: string) => status === 'pending' || status === 'confirmed'
  const canModify = (status: string) => status === 'pending'

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: '#0a0a0a' }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-4 px-4 py-4 border-b"
          style={{ borderColor: 'rgba(212,175,55,0.15)', background: 'rgba(10,10,10,0.98)' }}
        >
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">Mes Réservations</h1>
            <p className="text-xs text-muted-foreground font-body">{bookings.length} réservation{bookings.length > 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="flex gap-2 px-4 py-3 border-b overflow-x-auto"
          style={{ borderColor: 'rgba(212,175,55,0.1)' }}
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="px-4 py-1.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all"
              style={
                filter === tab.key
                  ? { background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#000' }
                  : { background: 'rgba(212,175,55,0.08)', color: 'var(--muted-foreground)', border: '1px solid rgba(212,175,55,0.15)' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(212,175,55,0.08)' }}
              >
                <XCircle className="w-8 h-8" style={{ color: 'rgba(212,175,55,0.4)' }} />
              </div>
              <p className="text-muted-foreground font-body text-sm">Aucune réservation trouvée</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {paginatedItems.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl p-5 border"
                  style={{ background: '#1a1a1a', borderColor: 'rgba(212,175,55,0.12)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground mb-1">
                        {booking.hallName}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body">
                        {booking.date} · {booking.time}
                      </p>
                      {booking.packages.length > 0 && (
                        <p className="text-xs text-muted-foreground font-body mt-1">
                          Options: {booking.packages.join(', ')}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <span className="font-display font-bold text-lg gold-gradient-text">
                      {formatPrice(booking.total)}
                    </span>
                    <div className="flex gap-2">
                      {canModify(booking.status) && (
                        <button
                          onClick={() => handleModify(booking)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
                          style={{ borderColor: 'rgba(212,175,55,0.25)', color: '#d4af37' }}
                        >
                          <Pencil className="w-3.5 h-3.5" /> Modifier
                        </button>
                      )}
                      {canCancel(booking.status) && (
                        <button
                          onClick={() => handleCancel(booking)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:text-red-400 hover:border-red-500/40"
                          style={{ borderColor: 'rgba(212,175,55,0.12)', color: 'var(--muted-foreground)' }}
                        >
                          <XCircle className="w-3.5 h-3.5" /> Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                page={page}
                totalPages={totalPages}
                from={from}
                to={to}
                total={total}
                pageSize={pageSize}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </div>
      </div>

      {cancelTarget && (
        <CancelDialog
          booking={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={confirmCancel}
        />
      )}

      {modifyTarget && (
        <ModifyModal
          booking={modifyTarget}
          onClose={() => setModifyTarget(null)}
          onSave={(updates) => {
            handleSaveModify(updates)
            setModifyTarget(null)
          }}
        />
      )}
    </>
  )
}
