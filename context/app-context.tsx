'use client'

import {
	createContext,
	useContext,
	useState,
	useEffect,
	startTransition,
	type ReactNode,
} from 'react'
import {
	halls as initialHalls,
	bookings as initialBookings,
	owners as initialOwners,
} from '@/lib/mock-data'
import type { Role, User, Hall, Booking, BookingStatus, Owner } from '@/types'

const INITIAL_USERS: User[] = [
	{
		id: 'u1',
		name: 'Kouassi Ama',
		email: 'client@eventhalls.com',
		password: 'Client@123',
		role: 'client',
	},
	{
		id: 'u2',
		name: 'Jean Kouassi',
		email: 'owner@eventhalls.com',
		password: 'Owner@123',
		role: 'owner',
	},
	{
		id: 'u3',
		name: 'Administrateur',
		email: 'admin@eventhalls.com',
		password: 'Admin@123',
		role: 'admin',
	},
]

interface AppContextType {
	currentUser: User | null
	role: Role | null
	isHydrated: boolean
	login: (email: string, password: string) => User | null
	logout: () => void
	users: User[]
	addUser: (data: Omit<User, 'id'>) => User
	emailExists: (email: string) => boolean
	updatePassword: (email: string, newPassword: string) => boolean
	halls: Hall[]
	addHall: (data: Omit<Hall, 'id' | 'rating'>) => void
	updateHall: (id: string, updates: Partial<Omit<Hall, 'id'>>) => void
	deleteHall: (id: string) => void
	bookings: Booking[]
	addBooking: (data: Omit<Booking, 'id'>) => void
	updateBookingStatus: (id: string, status: BookingStatus) => void
	updateBooking: (id: string, updates: Partial<Booking>) => void
	owners: Owner[]
	addOwner: (data: Omit<Owner, 'id'>) => void
	updateOwner: (id: string, updates: Partial<Omit<Owner, 'id'>>) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
	const [users, setUsers] = useState<User[]>(INITIAL_USERS)
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [isHydrated, setIsHydrated] = useState(false)
	const [halls, setHalls] = useState<Hall[]>(initialHalls)
	const [bookings, setBookings] = useState<Booking[]>(initialBookings)
	const [owners, setOwners] = useState<Owner[]>(initialOwners)

	useEffect(() => {
		const stored = localStorage.getItem('eventhall-user')
		if (stored) {
			const parsed = JSON.parse(stored) as { email: string }
			const user = INITIAL_USERS.find(
				u => u.email.toLowerCase() === parsed.email.toLowerCase(),
			)
			if (user) {
				startTransition(() => setCurrentUser(user))
				document.cookie = `auth-role=${user.role}; path=/; max-age=86400; SameSite=Lax`
			}
		}
		startTransition(() => setIsHydrated(true))
	}, [])

	const login = (email: string, password: string): User | null => {
		const user = users.find(
			u =>
				u.email.toLowerCase() === email.toLowerCase() &&
				u.password === password,
		)
		if (user) {
			setCurrentUser(user)
			localStorage.setItem(
				'eventhall-user',
				JSON.stringify({ email: user.email }),
			)
			document.cookie = `auth-role=${user.role}; path=/; max-age=86400; SameSite=Lax`
		}
		return user ?? null
	}

	const logout = () => {
		setCurrentUser(null)
		localStorage.removeItem('eventhall-user')
		document.cookie = 'auth-role=; path=/; max-age=0'
	}

	const emailExists = (email: string) =>
		users.some(u => u.email.toLowerCase() === email.toLowerCase())

	const addUser = (data: Omit<User, 'id'>): User => {
		const user: User = { ...data, id: `u${Date.now()}` }
		setUsers(prev => [...prev, user])
		return user
	}

	const updatePassword = (email: string, newPassword: string): boolean => {
		let found = false
		setUsers(prev =>
			prev.map(u => {
				if (u.email.toLowerCase() === email.toLowerCase()) {
					found = true
					return { ...u, password: newPassword }
				}
				return u
			}),
		)
		return found
	}

	const addHall = (data: Omit<Hall, 'id' | 'rating'>) => {
		setHalls(prev => [...prev, { ...data, id: `h${Date.now()}`, rating: 0 }])
	}

	const updateHall = (id: string, updates: Partial<Omit<Hall, 'id'>>) => {
		setHalls(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)))
	}

	const deleteHall = (id: string) => {
		setHalls(prev => prev.filter(h => h.id !== id))
	}

	const addBooking = (data: Omit<Booking, 'id'>) => {
		setBookings(prev => [...prev, { ...data, id: `b${Date.now()}` }])
	}

	const updateBookingStatus = (id: string, status: BookingStatus) => {
		setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)))
	}

	const updateBooking = (id: string, updates: Partial<Booking>) => {
		setBookings(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)))
	}

	const addOwner = (data: Omit<Owner, 'id'>) => {
		setOwners(prev => [...prev, { ...data, id: `o${Date.now()}` }])
	}

	const updateOwner = (id: string, updates: Partial<Omit<Owner, 'id'>>) => {
		setOwners(prev => prev.map(o => (o.id === id ? { ...o, ...updates } : o)))
	}

	return (
		<AppContext.Provider
			value={{
				currentUser,
				role: currentUser?.role ?? null,
				isHydrated,
				login,
				logout,
				users,
				addUser,
				emailExists,
				updatePassword,
				halls,
				addHall,
				updateHall,
				deleteHall,
				bookings,
				addBooking,
				updateBookingStatus,
				updateBooking,
				owners,
				addOwner,
				updateOwner,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export function useApp() {
	const ctx = useContext(AppContext)
	if (!ctx) throw new Error('useApp must be used within AppProvider')
	return ctx
}
