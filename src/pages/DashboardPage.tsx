'use client'

import { LayoutDashboard } from 'lucide-react'
import { OverallReadiness } from '@/components/dashboard/OverallReadiness'
import { SkillBreakdown } from '@/components/dashboard/SkillBreakdown'
import { ContinuePractice } from '@/components/dashboard/ContinuePractice'
import { WeeklyGoals } from '@/components/dashboard/WeeklyGoals'
import { UpcomingAssessments } from '@/components/dashboard/UpcomingAssessments'

const upcomingAssessments = [
  { id: '1', title: 'DSA Mock Test', date: 'Tomorrow', time: '10:00 AM' },
  { id: '2', title: 'System Design Review', date: 'Wed', time: '2:00 PM' },
  { id: '3', title: 'HR Interview Prep', date: 'Friday', time: '11:00 AM' },
]

export function DashboardPage() {
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

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Readiness</h3>
          <OverallReadiness score={72} />
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
          <SkillBreakdown />
        </div>

        {/* Continue Practice */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Practice</h3>
          <ContinuePractice topic="Dynamic Programming" completed={3} total={10} />
        </div>

        {/* Weekly Goals */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goals</h3>
          <WeeklyGoals solved={12} target={20} activeDays={[true, true, false, true, true, false, false]} />
        </div>

        {/* Upcoming Assessments - Full width on mobile, spans 2 columns on large screens */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
          <UpcomingAssessments assessments={upcomingAssessments} />
        </div>
      </div>
    </div>
  )
}
