import type { Hall, Booking, Package } from '@/types'

export type { Hall, Booking, Package }

export const halls: Hall[] = [
  {
    id: '1',
    name: 'Le Grand Palais',
    location: 'Cocody, Abidjan',
    capacity: 500,
    pricePerHour: 150000,
    rating: 4.8,
    image: '/placeholder.svg?height=400&width=600',
    features: ['DJ inclus', 'Traiteur', 'Climatisation', 'Parking'],
    services: [
      'Sonorisation professionnelle',
      'Éclairage scénique',
      'Service traiteur 5 étoiles',
      'DJ résidente',
      'Parking 200 places',
      'Sécurité 24h/24',
    ],
    hours: '08h - 04h',
  },
  {
    id: '2',
    name: 'Villa Lumière',
    location: 'Plateau, Abidjan',
    capacity: 200,
    pricePerHour: 85000,
    rating: 4.6,
    image: '/placeholder.svg?height=400&width=600',
    features: ['Traiteur', 'Vue panoramique', 'Bar'],
    services: [
      'Vue panoramique sur la lagune',
      'Bar premium',
      'Service traiteur',
      'Terrasse privée',
      'Climatisation centralisée',
    ],
    hours: '10h - 02h',
  },
  {
    id: '3',
    name: 'Espace Royal',
    location: 'Marcory, Abidjan',
    capacity: 350,
    pricePerHour: 120000,
    rating: 4.9,
    image: '/placeholder.svg?height=400&width=600',
    features: ['DJ inclus', 'Décoration', 'Photographe'],
    services: [
      'Décoration florale incluse',
      'Photographe professionnel',
      'DJ et animateur',
      'Podium et scène',
      'Loges VIP',
      'Valet parking',
    ],
    hours: '09h - 06h',
  },
]

export const bookings: Booking[] = [
  {
    id: 'b1',
    hallId: '1',
    hallName: 'Le Grand Palais',
    client: 'Kouassi Ama',
    date: '2025-05-15',
    time: '18:00 - 23:00',
    duration: 5,
    status: 'pending',
    total: 750000,
    packages: ['DJ', 'Traiteur'],
  },
  {
    id: 'b2',
    hallId: '2',
    hallName: 'Villa Lumière',
    client: 'Diallo Ibrahim',
    date: '2025-05-18',
    time: '14:00 - 20:00',
    duration: 6,
    status: 'confirmed',
    total: 510000,
    packages: ['Traiteur'],
  },
  {
    id: 'b3',
    hallId: '3',
    hallName: 'Espace Royal',
    client: "N'Guessan Adjoua",
    date: '2025-05-22',
    time: '16:00 - 00:00',
    duration: 8,
    status: 'pending',
    total: 960000,
    packages: ['DJ', 'Décoration', 'Photographe'],
  },
  {
    id: 'b4',
    hallId: '1',
    hallName: 'Le Grand Palais',
    client: 'Bamba Seydou',
    date: '2025-05-10',
    time: '19:00 - 01:00',
    duration: 6,
    status: 'confirmed',
    total: 900000,
    packages: ['DJ'],
  },
]

export const packages: Package[] = [
  { id: 'dj', label: 'DJ professionnel', price: 80000 },
  { id: 'traiteur', label: 'Traiteur complet', price: 150000 },
  { id: 'decoration', label: 'Décoration florale', price: 60000 },
  { id: 'photographe', label: 'Photographe', price: 100000 },
]

export const formatPrice = (price: number) =>
  price.toLocaleString('fr-FR') + ' FCFA'
