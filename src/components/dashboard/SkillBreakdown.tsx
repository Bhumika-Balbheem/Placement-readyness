'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { skill: 'DSA', score: 75 },
  { skill: 'System Design', score: 60 },
  { skill: 'Communication', score: 80 },
  { skill: 'Resume', score: 85 },
  { skill: 'Aptitude', score: 70 },
]

export function SkillBreakdown() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="hsl(245, 58%, 51%)"
            fill="hsl(245, 58%, 51%)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
