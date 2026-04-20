'use client'

import { useState } from 'react'
import { Building2, CalendarDays, TrendingUp, UserCog, ShieldCheck } from 'lucide-react'
import { DashboardHeader } from '@/components/shared/dashboard-header'
import { KpiCard } from '@/components/shared/kpi-card'
import { AdminOverview } from './admin-overview'
import { AdminOwnersTab } from './admin-owners-tab'
import { AdminHallsTab } from './admin-halls-tab'
import { AdminAnalyticsTab } from './admin-analytics-tab'

interface AdminDashboardProps {
  onLogout: () => void
}

type Tab = 'overview' | 'owners' | 'halls' | 'analytics'

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: "Vue d'ensemble" },
  { key: 'owners', label: 'Propriétaires' },
  { key: 'halls', label: 'Salles' },
  { key: 'analytics', label: 'Analytiques' },
]

const KPIS = [
  { label: 'Propriétaires actifs', value: '45', icon: UserCog, change: '+8%', positive: true },
  { label: 'Salles totales', value: '128', icon: Building2, change: '+15%', positive: true },
  { label: 'Réservations 30j', value: '856', icon: CalendarDays, change: '+32%', positive: true },
  { label: 'Revenu plateforme', value: '42.8M FCFA', icon: TrendingUp, change: '+19%', positive: true },
]

const AdminBadge = () => (
  <div
    className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-body font-semibold"
    style={{
      background: 'rgba(212,175,55,0.15)',
      border: '1px solid rgba(212,175,55,0.3)',
      color: '#d4af37',
    }}
  >
    <ShieldCheck className="w-3 h-3" />
    Super Admin
  </div>
)

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        badge={<AdminBadge />}
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as Tab)}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KPIS.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'owners' && <AdminOwnersTab />}
        {activeTab === 'halls' && <AdminHallsTab />}
        {activeTab === 'analytics' && <AdminAnalyticsTab />}
      </main>
    </div>
  )
}
