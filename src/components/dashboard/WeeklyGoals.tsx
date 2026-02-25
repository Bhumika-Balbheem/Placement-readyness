'use client'

interface WeeklyGoalsProps {
  solved: number
  target: number
  activeDays: boolean[]
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function WeeklyGoals({ solved, target, activeDays }: WeeklyGoalsProps) {
  const progress = (solved / target) * 100
  
  return (
    <div className="space-y-4">
      {/* Problems solved */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Problems Solved</span>
          <span className="text-sm font-medium text-gray-900">{solved}/{target} this week</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[hsl(245,58%,51%)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Day circles */}
      <div className="flex justify-between pt-2">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                activeDays[index]
                  ? 'bg-[hsl(245,58%,51%)] text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {day[0]}
            </div>
            <span className="text-xs text-gray-500">{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
