'use client'

import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Textarea({
  label,
  error,
  helperText,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3
          bg-card text-foreground
          border rounded
          transition-all duration-150 ease-in-out
          placeholder:text-muted/60
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-y min-h-[120px]
          ${error ? 'border-warning' : 'border-border hover:border-muted'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-warning">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-muted">{helperText}</p>
      )}
    </div>
  )
}
