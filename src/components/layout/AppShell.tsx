'use client'

import React from 'react'
import { TopBar } from './TopBar'
import { ContextHeader } from './ContextHeader'
import { PrimaryWorkspace } from './PrimaryWorkspace'
import { SecondaryPanel } from './SecondaryPanel'
import { ProofFooter } from './ProofFooter'

type StatusType = 'not-started' | 'in-progress' | 'shipped'

interface AppShellProps {
  // TopBar props
  projectName: string
  currentStep: number
  totalSteps: number
  status: StatusType
  
  // ContextHeader props
  headline: string
  subtext: string
  
  // PrimaryWorkspace content
  children: React.ReactNode
  
  // SecondaryPanel props
  stepExplanation: string
  promptText: string
  onCopy?: () => void
  onBuildInLovable?: () => void
  onItWorked?: () => void
  onError?: () => void
  onAddScreenshot?: () => void
  
  // ProofFooter props
  checklistItems?: Parameters<typeof ProofFooter>[0]['items']
  onChecklistChange?: Parameters<typeof ProofFooter>[0]['onItemChange']
}

export function AppShell({
  projectName,
  currentStep,
  totalSteps,
  status,
  headline,
  subtext,
  children,
  stepExplanation,
  promptText,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
  checklistItems,
  onChecklistChange,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />
      
      {/* Context Header */}
      <ContextHeader headline={headline} subtext={subtext} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Primary Workspace (70%) */}
        <PrimaryWorkspace>
          {children}
        </PrimaryWorkspace>
        
        {/* Secondary Panel (30%) */}
        <SecondaryPanel
          stepExplanation={stepExplanation}
          promptText={promptText}
          onCopy={onCopy}
          onBuildInLovable={onBuildInLovable}
          onItWorked={onItWorked}
          onError={onError}
          onAddScreenshot={onAddScreenshot}
        />
      </div>
      
      {/* Proof Footer */}
      <ProofFooter items={checklistItems} onItemChange={onChecklistChange} />
    </div>
  )
}
