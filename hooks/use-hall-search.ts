import { useState, useMemo } from 'react'
import type { Hall } from '@/types'

export interface HallFilters {
  minCapacity: number | null
  maxPrice: number | null
  features: string[]
  sortBy: 'default' | 'rating' | 'price_asc' | 'price_desc' | 'capacity'
}

const DEFAULT_FILTERS: HallFilters = {
  minCapacity: null,
  maxPrice: null,
  features: [],
  sortBy: 'default',
}

export function useHallSearch(halls: Hall[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<HallFilters>(DEFAULT_FILTERS)

  const updateFilter = (updates: Partial<HallFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  const allFeatures = useMemo(
    () => [...new Set(halls.flatMap((h) => h.features))].sort(),
    [halls],
  )

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.minCapacity !== null) count++
    if (filters.maxPrice !== null) count++
    count += filters.features.length
    if (filters.sortBy !== 'default') count++
    return count
  }, [filters])

  const filteredHalls = useMemo(() => {
    let result = halls.filter((h) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!h.name.toLowerCase().includes(q) && !h.location.toLowerCase().includes(q))
          return false
      }
      if (filters.minCapacity !== null && h.capacity < filters.minCapacity) return false
      if (filters.maxPrice !== null && h.pricePerHour > filters.maxPrice) return false
      if (
        filters.features.length > 0 &&
        !filters.features.every((f) => h.features.includes(f))
      )
        return false
      return true
    })

    if (filters.sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    else if (filters.sortBy === 'price_asc')
      result = [...result].sort((a, b) => a.pricePerHour - b.pricePerHour)
    else if (filters.sortBy === 'price_desc')
      result = [...result].sort((a, b) => b.pricePerHour - a.pricePerHour)
    else if (filters.sortBy === 'capacity')
      result = [...result].sort((a, b) => b.capacity - a.capacity)

    return result
  }, [halls, searchQuery, filters])

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    allFeatures,
    filteredHalls,
  }
}
