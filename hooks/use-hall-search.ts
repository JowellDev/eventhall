import { useState, useMemo } from 'react'
import type { Hall } from '@/types'

export function useHallSearch(halls: Hall[]) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHalls = useMemo(
    () =>
      halls.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.location.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [halls, searchQuery],
  )

  return { searchQuery, setSearchQuery, filteredHalls }
}
