'use client'

import { Calendar, Clock } from 'lucide-react'

interface Assessment {
  id: string
  title: string
  date: string
  time: string
}

interface UpcomingAssessmentsProps {
  assessments: Assessment[]
}

export function UpcomingAssessments({ assessments }: UpcomingAssessmentsProps) {
  return (
    <div className="space-y-3">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-[hsl(245,58%,51%)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {assessment.title}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-600">{assessment.date}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {assessment.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
