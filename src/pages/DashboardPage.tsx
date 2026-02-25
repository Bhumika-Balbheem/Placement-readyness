'use client'

import { LayoutDashboard, TrendingUp, Target, Award } from 'lucide-react'

export function DashboardPage() {
  const stats = [
    { label: 'Problems Solved', value: '42', icon: Target, color: 'bg-blue-50 text-blue-600' },
    { label: 'Current Streak', value: '7 days', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Rank', value: '#1,234', icon: Award, color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Track your progress and upcoming activities</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-600">Your recent coding activity and progress will appear here.</p>
      </div>
    </div>
  )
}
