'use client'

import { useEffect, useState } from 'react'

interface OverallReadinessProps {
  score: number
  maxScore?: number
}

export function OverallReadiness({ score, maxScore = 100 }: OverallReadinessProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  const radius = 80
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = animatedScore / maxScore
  const strokeDashoffset = circumference - progress * circumference
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 100)
    return () => clearTimeout(timer)
  }, [score])
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        <svg
          width={radius * 2}
          height={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="hsl(245, 58%, 51%)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{animatedScore}</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-600">Readiness Score</p>
    </div>
  )
}
