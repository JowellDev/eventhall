'use client'

import { useState } from 'react'
import { Eye, Pencil } from 'lucide-react'
import { StatusBadge } from '@/components/shared/status-badge'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { OwnerModal } from '@/components/admin/owner-modal'
import { useApp } from '@/context/app-context'
import { useLocale } from '@/context/locale-context'
import type { Owner } from '@/types'

type ModalState =
	| { open: false }
	| { open: true; mode: 'view' | 'create' | 'edit'; owner: Owner | null }

const PAGE_SIZE_OPTIONS = [5, 10, 25]

export function AdminOwnersTab() {
	const { owners, addOwner, updateOwner } = useApp()
	const { t } = useLocale()
	const [modal, setModal] = useState<ModalState>({ open: false })

	const { page, setPage, pageSize, setPageSize, paginatedItems, totalPages, total, from, to } =
		usePagination(owners, 5)

	const openCreate = () => setModal({ open: true, mode: 'create', owner: null })
	const openView = (owner: Owner) => setModal({ open: true, mode: 'view', owner })
	const openEdit = (owner: Owner) => setModal({ open: true, mode: 'edit', owner })
	const closeModal = () => setModal({ open: false })

	const handleSave = (data: Omit<Owner, 'id'> & { id?: string }) => {
		if (data.id) {
			const { id, ...updates } = data
			updateOwner(id, updates)
		} else {
			const { id: _id, ...rest } = data
			addOwner(rest)
		}
		closeModal()
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="font-display text-xl font-semibold text-foreground">
					{t.allOwners}
				</h2>
				<button
					onClick={openCreate}
					className="px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all hover:opacity-90"
					style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)', color: '#0a0a0a' }}
				>
					{t.addOwner}
				</button>
			</div>

			<div className="space-y-3">
				{paginatedItems.map(owner => (
					<div
						key={owner.id}
						className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5 border"
						style={{ background: 'var(--card)', borderColor: 'rgba(212,175,55,0.12)' }}
					>
						<div className="flex items-center gap-3 flex-1">
							<div
								className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-base text-black"
								style={{ background: 'linear-gradient(135deg, #d4af37, #f4c430)' }}
							>
								{owner.name.charAt(0)}
							</div>
							<div>
								<p className="font-body font-semibold text-foreground">{owner.name}</p>
								<p className="text-xs text-muted-foreground font-body">{owner.email}</p>
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-body">
							<div>
								<p className="text-muted-foreground text-xs mb-0.5">
									{owner.halls > 1 ? t.hallPlural : t.hallSingular}
								</p>
								<p className="font-semibold text-foreground">{owner.halls}</p>
							</div>
							<div>
								<p className="text-muted-foreground text-xs mb-0.5">{t.revenue}</p>
								<p className="font-semibold gold-gradient-text">{owner.revenue}</p>
							</div>
							<StatusBadge status={owner.status} />
							<div className="flex gap-2 ml-2">
								<button
									onClick={() => openView(owner)}
									className="p-2 rounded-lg border transition-all hover:border-gold"
									style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
									aria-label={t.view}
								>
									<Eye className="w-4 h-4" />
								</button>
								<button
									onClick={() => openEdit(owner)}
									className="p-2 rounded-lg border transition-all hover:border-gold"
									style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--muted-foreground)' }}
									aria-label={t.edit}
								>
									<Pencil className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<Pagination
				page={page} totalPages={totalPages} from={from} to={to} total={total}
				pageSize={pageSize} pageSizeOptions={PAGE_SIZE_OPTIONS}
				onPageChange={setPage} onPageSizeChange={setPageSize}
			/>

			{modal.open && (
				<OwnerModal mode={modal.mode} owner={modal.owner} onClose={closeModal} onSave={handleSave} />
			)}
		</div>
	)
}
