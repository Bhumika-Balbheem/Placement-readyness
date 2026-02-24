'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Home() {
  return (
    <AppShell
      projectName="KodNest Premium Build System"
      currentStep={1}
      totalSteps={5}
      status="in-progress"
      headline="Design System Foundation"
      subtext="Establish the core visual language and component architecture that will power every interaction in the KodNest ecosystem."
      stepExplanation="This step establishes the foundational design tokens including colors, typography, and spacing. These tokens ensure consistency across all components and pages."
      promptText={`Create a premium SaaS design system with the following specifications:

COLOR SYSTEM:
- Background: #F7F6F3 (off-white)
- Primary text: #111111
- Accent: #8B0000 (deep red)
- Success: muted green
- Warning: muted amber

TYPOGRAPHY:
- Headings: Serif font, large, confident
- Body: Clean sans-serif, 16-18px, line-height 1.6-1.8

SPACING:
- Consistent scale: 8px, 16px, 24px, 40px, 64px`}
      onCopy={() => console.log('Copied')}
      onBuildInLovable={() => console.log('Build in Lovable')}
      onItWorked={() => console.log('It Worked')}
      onError={() => console.log('Error')}
      onAddScreenshot={() => console.log('Add Screenshot')}
    >
      {/* Demo Content for Primary Workspace */}
      <div className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Component Showcase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Buttons */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            {/* Inputs */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Inputs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Default Input" placeholder="Enter text..." />
                <Input label="With Error" placeholder="Enter text..." error="This field is required" />
              </div>
            </div>
            
            {/* Typography */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Typography</h4>
              <div className="space-y-2 p-4 bg-background rounded border border-border">
                <h1 className="text-heading-xl">Heading XL (Serif)</h1>
                <h2 className="text-heading-lg">Heading LG (Serif)</h2>
                <h3 className="text-heading-md">Heading MD (Serif)</h3>
                <p className="text-body-lg text-muted">Body Large - Clean sans-serif with generous line height</p>
                <p className="text-body text-muted">Body Regular - Clean sans-serif for general content</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Design Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-accent">—</span>
                <span>Calm, Intentional, Coherent, Confident</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">—</span>
                <span>No gradients, no glassmorphism, no neon colors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">—</span>
                <span>Consistent spacing scale: 8px, 16px, 24px, 40px, 64px</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">—</span>
                <span>Maximum 4 colors across entire system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">—</span>
                <span>Transitions: 150–200ms, ease-in-out, no bounce</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
