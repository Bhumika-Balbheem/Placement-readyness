'use client'

import React from 'react'
import { Badge } from '../ui/Badge'

type StatusType = 'not-started' | 'in-progress' | 'shipped'

interface TopBarProps {
  projectName: string
  currentStep: number
  totalSteps: number
  status: StatusType
}

const statusConfig: Record<StatusType, { label: string; variant: 'default' | 'warning' | 'success' }> = {
  'not-started': { label: 'Not Started', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'warning' },
  'shipped': { label: 'Shipped', variant: 'success' },
}

export function TopBar({ projectName, currentStep, totalSteps, status }: TopBarProps) {
  const statusInfo = statusConfig[status]
  
  return (
    <header className="w-full h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left: Project Name */}
      <div className="flex items-center">
        <span className="font-serif text-lg text-foreground">{projectName}</span>
      </div>
      
      {/* Center: Progress Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-sm text-muted">Step</span>
        <span className="text-sm font-medium text-foreground">{currentStep}</span>
        <span className="text-sm text-muted">/</span>
        <span className="text-sm text-muted">{totalSteps}</span>
      </div>
      
      {/* Right: Status Badge */}
      <div className="flex items-center">
        <Badge variant={statusInfo.variant} size="md">
          {statusInfo.label}
        </Badge>
      </div>
    </header>
  )
}
