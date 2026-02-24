'use client'

import React from 'react'

interface PrimaryWorkspaceProps {
  children: React.ReactNode
}

export function PrimaryWorkspace({ children }: PrimaryWorkspaceProps) {
  return (
    <main className="flex-1 min-h-0 p-6">
      <div className="h-full">
        {children}
      </div>
    </main>
  )
}
