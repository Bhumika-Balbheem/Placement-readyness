'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, Building2, Briefcase, FileText, Sparkles, AlertTriangle } from 'lucide-react'
import { extractSkills } from '@/utils/skillExtractor'
import { generateChecklist } from '@/utils/checklistGenerator'
import { generatePlan } from '@/utils/planGenerator'
import { generateQuestions } from '@/utils/questionGenerator'
import { calculateReadinessScore } from '@/utils/scoreCalculator'
import { saveFullAnalysis, initializeSkillConfidenceMap } from '@/utils/storage'
import { generateCompanyIntel } from '@/utils/companyIntel'
import { generateRoundMapping } from '@/utils/roundMapping'
import { AnalysisResult, SkillConfidenceMap } from '@/types/analysis'

const MIN_JD_LENGTH = 200

export default function AssessmentsPage() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showShortWarning, setShowShortWarning] = useState(false)

  const handleJdChange = (value: string) => {
    setJdText(value)
    setShowShortWarning(value.length > 0 && value.length < MIN_JD_LENGTH)
  }

  const handleAnalyze = async () => {
    if (!jdText.trim()) return

    setIsAnalyzing(true)
    setShowShortWarning(false)

    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    // Extract skills
    const extractedSkills = extractSkills(jdText)

    // Get all skills as flat array for confidence map
    const allSkills = [
      ...extractedSkills.coreCS,
      ...extractedSkills.languages,
      ...extractedSkills.web,
      ...extractedSkills.data,
      ...extractedSkills.cloud,
      ...extractedSkills.testing,
      ...extractedSkills.other,
    ]

    // Initialize skill confidence map (default: practice)
    const skillConfidenceMap = initializeSkillConfidenceMap(allSkills)

    // Generate outputs
    const checklist = generateChecklist(extractedSkills)
    const plan = generatePlan(extractedSkills)
    const questions = generateQuestions(extractedSkills)

    // Calculate base readiness score (computed only on analyze)
    const baseScore = calculateReadinessScore(
      extractedSkills,
      company,
      role,
      jdText.length
    )

    // Generate company intel
    const companyIntel = generateCompanyIntel(company) || undefined

    // Generate round mapping based on company size and skills
    const roundMapping = companyIntel 
      ? generateRoundMapping(companyIntel.size, extractedSkills)
      : []

    // Create analysis result with strict schema
    const now = new Date().toISOString()
    const result: AnalysisResult = {
      // Identity & Metadata
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      
      // Input Fields
      company: company || '',
      role: role || '',
      jdText,
      
      // Extracted Data
      extractedSkills,
      
      // Generated Outputs
      roundMapping,
      checklist,
      plan7Days: plan,
      questions,
      
      // Scoring
      baseScore,
      skillConfidenceMap,
      finalScore: baseScore,
      
      // Optional Company Intel
      companyIntel,
    }

    // Save to localStorage
    saveFullAnalysis(result)

    setIsAnalyzing(false)

    // Navigate to results
    navigate('/dashboard/results')
  }

  const isFormValid = jdText.trim().length > 0

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <ClipboardCheck className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Description Analyzer</h2>
          <p className="text-gray-600">Paste a job description to get personalized preparation insights</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        {/* Company Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Building2 className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google, Microsoft, Amazon"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] focus:border-transparent"
          />
        </div>

        {/* Role Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Briefcase className="w-4 h-4" />
            Role / Position
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Full Stack Developer"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] focus:border-transparent"
          />
        </div>

        {/* JD Text Area */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4" />
            Job Description
            <span className="text-red-500">*</span>
          </label>
          <textarea
            value={jdText}
            onChange={(e) => handleJdChange(e.target.value)}
            placeholder="Paste the full job description here. Include details about required skills, technologies, and responsibilities..."
            rows={12}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)] focus:border-transparent resize-y ${
              showShortWarning ? 'border-amber-400 bg-amber-50/30' : 'border-gray-200'
            }`}
          />
          <p className="text-xs text-gray-500">
            {jdText.length} characters • We detect skills like DSA, React, Python, AWS, SQL, etc.
          </p>
          
          {/* Short JD Warning */}
          {showShortWarning && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                This JD is too short to analyze deeply. Paste full JD for better output.
              </p>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!isFormValid || isAnalyzing}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[hsl(245,58%,51%)] text-white font-semibold rounded-lg hover:bg-[hsl(245,58%,45%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Job Description
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <h3 className="text-sm font-semibold text-indigo-900 mb-2">Tips for best results:</h3>
        <ul className="text-sm text-indigo-700 space-y-1 list-disc list-inside">
          <li>Include the full job description for accurate skill detection</li>
          <li>We detect 40+ skills across 6 categories automatically</li>
          <li>Longer descriptions (&gt;800 chars) improve your readiness score</li>
          <li>All analysis is stored locally in your browser</li>
        </ul>
      </div>
    </div>
  )
}
