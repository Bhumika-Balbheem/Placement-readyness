'use client'

import { Play } from 'lucide-react'

interface ContinuePracticeProps {
  topic: string
  completed: number
  total: number
}

export function ContinuePractice({ topic, completed, total }: ContinuePracticeProps) {
  const progress = (completed / total) * 100
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{topic}</h4>
        <p className="text-sm text-gray-600">Continue where you left off</p>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{completed}/{total} completed</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[hsl(245,58%,51%)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Continue button */}
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(245,58%,51%)] text-white text-sm font-medium rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors">
        <Play className="w-4 h-4" />
        Continue
      </button>
    </div>
  )
}
