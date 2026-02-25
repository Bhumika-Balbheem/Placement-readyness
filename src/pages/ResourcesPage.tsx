'use client'

import { BookOpen } from 'lucide-react'

export function ResourcesPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
          <p className="text-gray-600">Study materials and reference guides</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
        <p className="text-gray-600">Articles, videos, and documentation will appear here.</p>
      </div>
    </div>
  )
}
