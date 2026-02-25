'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rocket, Lock, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { isChecklistCompleted } from '@/utils/testChecklistStorage'

export default function ShipPage() {
  const navigate = useNavigate()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if checklist is completed
    const completed = isChecklistCompleted()
    setIsUnlocked(completed)
    setIsChecking(false)
  }, [])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
      </div>
    )
  }

  // Locked State
  if (!isUnlocked) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8 text-gray-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-400">Ship</h2>
            <p className="text-gray-400">Deployment locked</p>
          </div>
        </div>

        {/* Lock Message */}
        <div className="bg-gray-100 p-8 rounded-xl border border-gray-200">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Shipping Locked
            </h3>
            <p className="text-gray-500 mb-6">
              Complete all 10 tests in the checklist before shipping.
            </p>
            <button
              onClick={() => navigate('/prp/07-test')}
              className="flex items-center gap-2 px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-semibold rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Test Checklist
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unlocked State
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Rocket className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ship</h2>
          <p className="text-gray-600">Ready for deployment</p>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 p-8 rounded-xl border border-green-200">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-3">
            All Tests Passed!
          </h3>
          <p className="text-green-700 mb-6">
            The Placement Readiness Platform is ready for deployment.
          </p>
        </div>
      </div>

      {/* Deployment Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Test Checklist</span>
            </div>
            <span className="text-sm text-green-600 font-medium">10/10 Passed</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Build Status</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Ready</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Version</span>
            </div>
            <span className="text-sm text-gray-600 font-medium">Step 8 - Hardened</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => navigate('/prp/07-test')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tests
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-6 py-3 text-[hsl(245,58%,51%)] font-semibold hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GitHub Link */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <div className="flex items-center gap-3">
          <ExternalLink className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          <p className="text-indigo-700">
            Repository:{' '}
            <a 
              href="https://github.com/Bhumika-Balbheem/Placement-readyness" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium underline hover:text-[hsl(245,58%,45%)]"
            >
              github.com/Bhumika-Balbheem/Placement-readyness
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
