'use client'

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, CheckCircle2, Circle, AlertTriangle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react'
import { getTestChecklist, toggleTestItem, resetTestChecklist, getPassedTestCount, getTotalTestCount } from '@/utils/testChecklistStorage'
import { TestChecklist } from '@/types/testChecklist'

export default function TestChecklistPage() {
  const navigate = useNavigate()
  const [checklist, setChecklist] = useState<TestChecklist | null>(null)
  const [passedCount, setPassedCount] = useState(0)
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loaded = getTestChecklist()
    setChecklist(loaded)
    setPassedCount(getPassedTestCount())
  }, [])

  const handleToggle = useCallback((itemId: string) => {
    const newState = toggleTestItem(itemId)
    
    // Update local state
    setChecklist(prev => {
      if (!prev) return prev
      return {
        ...prev,
        items: prev.items.map(item =>
          item.id === itemId ? { ...item, checked: newState } : item
        ),
      }
    })
    
    setPassedCount(getPassedTestCount())
  }, [])

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset all test items?')) {
      resetTestChecklist()
      const refreshed = getTestChecklist()
      setChecklist(refreshed)
      setPassedCount(0)
    }
  }, [])

  const toggleHint = useCallback((itemId: string) => {
    setExpandedHints(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }, [])

  const totalCount = getTotalTestCount()
  const allPassed = passedCount === totalCount

  if (!checklist) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <ClipboardCheck className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pre-Ship Test Checklist</h2>
          <p className="text-gray-600">Verify all functionality before shipping</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className={`p-6 rounded-xl border shadow-sm ${
        allPassed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              allPassed ? 'bg-green-100' : 'bg-amber-100'
            }`}>
              {allPassed ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              )}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                allPassed ? 'text-green-900' : 'text-amber-900'
              }`}>
                Tests Passed: {passedCount} / {totalCount}
              </h3>
              {!allPassed && (
                <p className="text-amber-700 mt-1">
                  Fix issues before shipping.
                </p>
              )}
              {allPassed && (
                <p className="text-green-700 mt-1">
                  All tests passed! Ready to ship.
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:bg-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset checklist
            </button>
            <button
              onClick={() => navigate('/prp/08-ship')}
              disabled={!allPassed}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors ${
                allPassed
                  ? 'bg-[hsl(245,58%,51%)] text-white hover:bg-[hsl(245,58%,45%)]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Ship
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Test Items */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Items</h3>
        <div className="space-y-4">
          {checklist.items.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all ${
                item.checked
                  ? 'bg-green-50/50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    item.checked
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-[hsl(245,58%,51%)]'
                  }`}
                >
                  {item.checked && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-medium ${
                      item.checked ? 'text-green-900 line-through' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </span>
                  </div>

                  {/* Hint Toggle */}
                  <button
                    onClick={() => toggleHint(item.id)}
                    className="flex items-center gap-1 mt-2 text-sm text-gray-500 hover:text-[hsl(245,58%,51%)] transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {expandedHints.has(item.id) ? 'Hide hint' : 'How to test'}
                  </button>

                  {/* Hint Content */}
                  {expandedHints.has(item.id) && (
                    <div className="mt-3 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-700">
                      {item.hint}
                    </div>
                  )}
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {item.checked ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset checklist
        </button>
        
        <button
          onClick={() => navigate('/prp/08-ship')}
          disabled={!allPassed}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors ${
            allPassed
              ? 'bg-[hsl(245,58%,51%)] text-white hover:bg-[hsl(245,58%,45%)]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Ship
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
