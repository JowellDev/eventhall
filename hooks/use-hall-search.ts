import { useState, useMemo } from 'react'
import { halls } from '@/lib/mock-data'

export function useHallSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHalls = useMemo(
    () =>
      halls.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.location.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  )

  return { searchQuery, setSearchQuery, filteredHalls }
}
