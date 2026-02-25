'use client'

import { Code2 } from 'lucide-react'

export default function PracticePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Code2 className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Practice Problems</h2>
          <p className="text-gray-600">Sharpen your skills with curated coding challenges</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Sets</h3>
        <p className="text-gray-600">Coding problems organized by topic and difficulty will appear here.</p>
      </div>
    </div>
  )
}
