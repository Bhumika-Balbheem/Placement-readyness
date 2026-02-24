'use client'

import React from 'react'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'

interface SecondaryPanelProps {
  stepExplanation: string
  promptText: string
  onCopy?: () => void
  onBuildInLovable?: () => void
  onItWorked?: () => void
  onError?: () => void
  onAddScreenshot?: () => void
}

export function SecondaryPanel({
  stepExplanation,
  promptText,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}: SecondaryPanelProps) {
  return (
    <aside className="w-[30%] min-w-[320px] max-w-[400px] border-l border-border bg-card p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Step Explanation */}
      <div>
        <h3 className="font-serif text-lg text-foreground mb-3">Step Explanation</h3>
        <p className="text-body text-muted leading-relaxed">
          {stepExplanation}
        </p>
      </div>
      
      {/* Copyable Prompt Box */}
      <Card>
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={promptText}
            readOnly
            className="min-h-[200px] font-mono text-sm bg-background"
          />
          <Button variant="secondary" size="sm" onClick={onCopy} className="w-full">
            Copy to Clipboard
          </Button>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="primary" size="md" onClick={onBuildInLovable} className="w-full">
          Build in Lovable
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" onClick={onItWorked}>
            It Worked
          </Button>
          <Button variant="secondary" size="md" onClick={onError}>
            Error
          </Button>
        </div>
        <Button variant="ghost" size="md" onClick={onAddScreenshot} className="w-full">
          Add Screenshot
        </Button>
      </div>
    </aside>
  )
}
