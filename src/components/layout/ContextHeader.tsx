'use client'

import React from 'react'

interface ContextHeaderProps {
  headline: string
  subtext: string
}

export function ContextHeader({ headline, subtext }: ContextHeaderProps) {
  return (
    <div className="w-full py-10 px-6 border-b border-border">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-heading-xl text-foreground mb-4">
          {headline}
        </h1>
        <p className="text-body-lg text-muted max-w-text">
          {subtext}
        </p>
      </div>
    </div>
  )
}
