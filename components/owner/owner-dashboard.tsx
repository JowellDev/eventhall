'use client'

import { useState } from 'react'
import { Building2, CalendarDays, TrendingUp, Users } from 'lucide-react'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { OwnerOverview } from './owner-overview'
import { OwnerHallsTab } from './owner-halls-tab'
import { OwnerBookingsTab } from './owner-bookings-tab'
import { OwnerStatsTab } from './owner-stats-tab'

interface OwnerDashboardProps {
  onLogout: () => void
}

type Tab = 'overview' | 'halls' | 'bookings' | 'stats'

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: "Vue d'ensemble" },
  { key: 'halls', label: 'Mes Salles' },
  { key: 'bookings', label: 'Réservations' },
  { key: 'stats', label: 'Statistiques' },
]

const KPIS = [
  { label: 'Salles actives', value: '3', icon: Building2, change: '+12%', positive: true },
  { label: 'Réservations ce mois', value: '28', icon: CalendarDays, change: '-5%', positive: false },
  { label: 'Revenu total', value: '8.5M FCFA', icon: TrendingUp, change: '+23%', positive: true },
  { label: "Taux d'occupation", value: '76%', icon: Users, change: '+8%', positive: true },
]

export function OwnerDashboard({ onLogout }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        subtitle="Espace Propriétaire"
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as Tab)}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KPIS.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {activeTab === 'overview' && <OwnerOverview />}
        {activeTab === 'halls' && <OwnerHallsTab />}
        {activeTab === 'bookings' && <OwnerBookingsTab />}
        {activeTab === 'stats' && <OwnerStatsTab />}
      </main>
    </div>
  )
}
