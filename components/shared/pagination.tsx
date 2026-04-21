'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  from: number
  to: number
  total: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function pageWindow(page: number, totalPages: number): (number | '…')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const pages: (number | '…')[] = [1]
  if (page > 3) pages.push('…')
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) pages.push(p)
  if (page < totalPages - 2) pages.push('…')
  pages.push(totalPages)
  return pages
}

const BTN_BASE =
  'min-w-[32px] h-8 px-2 rounded-lg text-xs font-body font-medium transition-colors flex items-center justify-center'

export function Pagination({
  page,
  totalPages,
  from,
  to,
  total,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  if (total === 0) return null

  const pages = pageWindow(page, totalPages)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 mt-2 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
      {/* Results info + page size */}
      <div className="flex items-center gap-3 text-xs font-body text-muted-foreground">
        <span>
          {from}–{to} sur {total} résultat{total > 1 ? 's' : ''}
        </span>
        <span className="hidden sm:inline" style={{ color: 'rgba(212,175,55,0.3)' }}>|</span>
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline">Afficher</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg px-2 py-1 text-xs font-body font-medium outline-none cursor-pointer transition-colors"
            style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              color: '#d4af37',
            }}
            aria-label="Éléments par page"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="hidden sm:inline">par page</span>
        </div>
      </div>

      {/* Page navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`${BTN_BASE} disabled:opacity-30`}
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              color: 'var(--muted-foreground)',
            }}
            aria-label="Page précédente"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {pages.map((p, i) =>
            p === '…' ? (
              <span
                key={`ellipsis-${i}`}
                className="min-w-[32px] h-8 flex items-center justify-center text-xs text-muted-foreground"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={BTN_BASE}
                style={
                  p === page
                    ? { background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a', border: 'none' }
                    : { background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', color: 'var(--muted-foreground)' }
                }
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`${BTN_BASE} disabled:opacity-30`}
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              color: 'var(--muted-foreground)',
            }}
            aria-label="Page suivante"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
