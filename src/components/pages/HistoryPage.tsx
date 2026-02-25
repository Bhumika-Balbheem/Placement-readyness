'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Trash2, ExternalLink, FileText, AlertTriangle } from 'lucide-react'
import { getHistory, deleteHistoryEntry, clearHistory, hasCorruptionWarning, clearCorruptionWarning } from '@/utils/storage'
import { getScoreColor } from '@/utils/scoreCalculator'
import { HistoryEntry } from '@/types/analysis'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showCorruptionWarning, setShowCorruptionWarning] = useState(false)

  useEffect(() => {
    const entries = getHistory()
    setHistory(entries)
    
    // Check for corruption warning
    const hasWarning = hasCorruptionWarning()
    setShowCorruptionWarning(hasWarning)
    
    // Clear the warning flag after showing
    if (hasWarning) {
      clearCorruptionWarning()
    }
    
    setLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id)
    setHistory(getHistory())
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory()
      setHistory([])
    }
  }

  const handleView = (id: string) => {
    navigate(`/dashboard/results?id=${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <History className="w-8 h-8 text-[hsl(245,58%,51%)]" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis History</h2>
            <p className="text-gray-600">View your past job description analyses</p>
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Corruption Warning */}
      {showCorruptionWarning && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 font-medium">One saved entry couldn't be loaded.</p>
            <p className="text-amber-700 text-sm">Create a new analysis to continue.</p>
          </div>
        </div>
      )}

      {/* History List */}
      {history.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {entry.company || 'Unknown Company'}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600">{entry.role || 'Unknown Role'}</p>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className={`text-2xl font-bold ${getScoreColor(entry.readinessScore)}`}>
                      {entry.readinessScore}
                    </span>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(entry.id)}
                      className="p-2 text-[hsl(245,58%,51%)] hover:bg-indigo-50 rounded-lg transition-colors"
                      title="View Analysis"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600 mb-6">Analyze job descriptions to build your history.</p>
          <button
            onClick={() => navigate('/dashboard/assessments')}
            className="px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors"
          >
            Analyze Job Description
          </button>
        </div>
      )}
    </div>
  )
}
