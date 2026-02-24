'use client'

import React from 'react'

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Checkbox({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className={`
            w-5 h-5
            border border-border rounded
            bg-card
            appearance-none
            cursor-pointer
            transition-all duration-150 ease-in-out
            checked:bg-accent checked:border-accent
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
            disabled:cursor-not-allowed
          `}
        />
        {checked && (
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-foreground select-none">{label}</span>
    </label>
  )
}
