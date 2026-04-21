'use client'

import { Star } from 'lucide-react'
import { halls, formatPrice } from '@/lib/mock-data'
import { Pagination } from '@/components/shared/pagination'
import { usePagination } from '@/hooks/use-pagination'

const ALL_HALLS = [...halls, ...halls].slice(0, 6)
const PAGE_SIZE_OPTIONS = [6, 12, 24]

export function AdminHallsTab() {
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
	} = usePagination(ALL_HALLS, 6)

	return (
		<div>
			<h2 className="font-display text-xl font-semibold text-foreground mb-6">
				Toutes les salles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{paginatedItems.map((hall, i) => (
					<div
						key={`${hall.id}-${i}`}
						className="rounded-2xl overflow-hidden border"
						style={{
							background: '#1a1a1a',
							borderColor: 'rgba(212,175,55,0.12)',
						}}
					>
						<div className="relative h-36">
							<img
								src={hall.image}
								alt={hall.name}
								className="w-full h-full object-cover"
							/>
							<div
								className="absolute inset-0"
								style={{
									background:
										'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7))',
								}}
								aria-hidden="true"
							/>
							<div
								className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-black"
								style={{
									background: 'linear-gradient(135deg, #d4af37, #f4c430)',
								}}
							>
								<Star className="w-3 h-3 fill-current" />
								{hall.rating}
							</div>
							<span className="absolute bottom-2 left-3 text-white text-xs font-body font-semibold">
								{hall.location}
							</span>
						</div>
						<div className="p-3">
							<p className="font-display text-sm font-bold text-foreground mb-0.5">
								{hall.name}
							</p>
							<p className="text-xs text-muted-foreground font-body">
								{hall.capacity} pers. · {formatPrice(hall.pricePerHour)}/h
							</p>
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
		</div>
	)
}
