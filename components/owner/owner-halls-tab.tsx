'use client'

import { useState } from 'react'
import { Star, Eye, Pencil, Trash2 } from 'lucide-react'
import { AddHallModal } from './add-hall-modal'
import { OwnerHallDetailModal } from './owner-hall-detail-modal'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { useApp } from '@/context/app-context'
import { formatPrice } from '@/lib/mock-data'
import type { Hall } from '@/types'

const PAGE_SIZE_OPTIONS = [6, 12, 24]

export function OwnerHallsTab() {
  const { halls, deleteHall } = useApp()
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null)
  const [editHall, setEditHall] = useState<Hall | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Hall | null>(null)

  const { page, setPage, pageSize, setPageSize, paginatedItems, totalPages, total, from, to } =
    usePagination(halls, 6)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Mes Salles</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
        >
          + Ajouter une salle
        </button>
      </div>

      {halls.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground font-body text-sm">
            Aucune salle pour l'instant. Ajoutez votre première salle !
          </p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((hall) => (
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
                {hall.rating > 0 && (
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {hall.rating}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-foreground mb-1">{hall.name}</h3>
                <p className="text-muted-foreground text-sm font-body mb-1">
                  {hall.location} · {hall.capacity} personnes
                </p>
                <p className="text-xs font-body mb-4" style={{ color: '#d4af37' }}>
                  {formatPrice(hall.pricePerHour)}/h
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedHall(hall)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
                    style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Voir
                  </button>
                  <button
                    onClick={() => setEditHall(hall)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium border transition-all hover:border-gold"
                    style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
                  >
                    <Pencil className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button
                    onClick={() => setDeleteTarget(hall)}
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
        </>
      )}

      {showAddModal && <AddHallModal onClose={() => setShowAddModal(false)} />}
      {selectedHall && (
        <OwnerHallDetailModal hall={selectedHall} onClose={() => setSelectedHall(null)} />
      )}
      {editHall && <AddHallModal hall={editHall} onClose={() => setEditHall(null)} />}
      {deleteTarget && (
        <ConfirmDialog
          title="Supprimer la salle ?"
          message={
            <>
              Vous êtes sur le point de supprimer{' '}
              <strong className="text-foreground">{deleteTarget.name}</strong>. Cette action est
              irréversible et supprimera toutes les données associées.
            </>
          }
          confirmLabel="Supprimer"
          variant="danger"
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteHall(deleteTarget.id)
            setDeleteTarget(null)
          }}
        />
      )}
    </div>
  )
}
