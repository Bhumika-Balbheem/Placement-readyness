'use client'

import React, { useState } from 'react'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'

type ChecklistItem = {
  id: string
  label: string
  checked: boolean
  proofInput: string
}

interface ProofFooterProps {
  items?: ChecklistItem[]
  onItemChange?: (items: ChecklistItem[]) => void
}

const defaultItems: ChecklistItem[] = [
  { id: 'ui-built', label: 'UI Built', checked: false, proofInput: '' },
  { id: 'logic-working', label: 'Logic Working', checked: false, proofInput: '' },
  { id: 'test-passed', label: 'Test Passed', checked: false, proofInput: '' },
  { id: 'deployed', label: 'Deployed', checked: false, proofInput: '' },
]

export function ProofFooter({ items: propItems, onItemChange }: ProofFooterProps) {
  const [items, setItems] = useState<ChecklistItem[]>(propItems || defaultItems)
  
  const handleCheckChange = (id: string, checked: boolean) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, checked } : item
    )
    setItems(updated)
    onItemChange?.(updated)
  }
  
  const handleProofInputChange = (id: string, value: string) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, proofInput: value } : item
    )
    setItems(updated)
    onItemChange?.(updated)
  }
  
  return (
    <footer className="w-full bg-card border-t border-border px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-serif text-lg text-foreground mb-6">Completion Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <Checkbox
                id={item.id}
                label={item.label}
                checked={item.checked}
                onChange={(checked) => handleCheckChange(item.id, checked)}
              />
              {item.checked && (
                <Input
                  placeholder={`Proof for ${item.label.toLowerCase()}...`}
                  value={item.proofInput}
                  onChange={(e) => handleProofInputChange(item.id, e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
