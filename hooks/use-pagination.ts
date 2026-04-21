import { useState, useMemo, useEffect } from 'react'

export interface PaginationResult<T> {
	page: number
	setPage: (page: number) => void
	pageSize: number
	setPageSize: (size: number) => void
	totalPages: number
	paginatedItems: T[]
	total: number
	from: number
	to: number
}

export function usePagination<T>(
	items: T[],
	defaultPageSize = 6,
): PaginationResult<T> {
	const [page, setPage] = useState(1)
	const [pageSize, setPageSizeState] = useState(defaultPageSize)

	const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
	const safePage = Math.min(page, totalPages)

	// Reset to page 1 when items list changes (e.g. after filter)
	useEffect(() => {
		setPage(1)
	}, [items.length])

	const paginatedItems = useMemo(() => {
		const start = (safePage - 1) * pageSize
		return items.slice(start, start + pageSize)
	}, [items, safePage, pageSize])

	const setPageSize = (size: number) => {
		setPageSizeState(size)
		setPage(1)
	}

	return {
		page: safePage,
		setPage,
		pageSize,
		setPageSize,
		totalPages,
		paginatedItems,
		total: items.length,
		from: items.length === 0 ? 0 : (safePage - 1) * pageSize + 1,
		to: Math.min(safePage * pageSize, items.length),
	}
}
