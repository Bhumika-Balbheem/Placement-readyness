'use client'

import { ClipboardCheck } from 'lucide-react'

export function AssessmentsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <ClipboardCheck className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
          <p className="text-gray-600">Take mock tests and track your performance</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Assessments</h3>
        <p className="text-gray-600">Mock interviews and skill assessments will appear here.</p>
      </div>
    </div>
  )
}
