import { useState } from 'react'

export function useFavorites() {
	const [favorites, setFavorites] = useState<string[]>([])

	const toggle = (id: string) => {
		setFavorites(prev =>
			prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id],
		)
	}

	const isFavorite = (id: string) => favorites.includes(id)

	return { favorites, toggle, isFavorite }
}
