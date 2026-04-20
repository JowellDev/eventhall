export type Role = 'client' | 'owner' | 'admin'

export type BookingStatus = 'pending' | 'confirmed' | 'refused' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export interface Hall {
  id: string
  name: string
  location: string
  capacity: number
  pricePerHour: number
  rating: number
  image: string
  features: string[]
  services: string[]
  hours: string
}

export interface Booking {
  id: string
  hallId: string
  hallName: string
  client: string
  date: string
  time: string
  duration: number
  status: BookingStatus
  total: number
  packages: string[]
}

export interface Package {
  id: string
  label: string
  price: number
}

export interface BookingFormData {
  date: string
  startTime: string
  endTime: string
  selectedPackages: string[]
}
