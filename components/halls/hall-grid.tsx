'use client'

import { HallCard } from './hall-card'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'
import type { Hall } from '@/types'

const PAGE_SIZE_OPTIONS = [6, 12, 24]

interface HallGridProps {
	halls: Hall[]
	favorites: string[]
	onSelect: (hall: Hall) => void
	onToggleFavorite: (id: string) => void
}

export function HallGrid({
	halls,
	favorites,
	onSelect,
	onToggleFavorite,
}: HallGridProps) {
	const {
		page,
		setPage,
		pageSize,
		setPageSize,
		paginatedItems,
		totalPages,
		total,
		from,
		to,
	} = usePagination(halls, 6)

	return (
		<section className="max-w-7xl mx-auto px-4 pb-16">
			<div className="flex items-center justify-between mb-6">
				<h2 className="font-display text-xl font-semibold text-foreground">
					{total} salle{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''}
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{paginatedItems.map(hall => (
					<HallCard
						key={hall.id}
						hall={hall}
						isFavorite={favorites.includes(hall.id)}
						onSelect={onSelect}
						onToggleFavorite={onToggleFavorite}
					/>
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
		</section>
	)
}
