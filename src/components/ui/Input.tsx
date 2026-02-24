'use client'

import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5
          bg-card text-foreground
          border rounded
          transition-all duration-150 ease-in-out
          placeholder:text-muted/60
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
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
