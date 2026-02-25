'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FileText, CheckCircle, Calendar, HelpCircle, ArrowLeft, RotateCcw, Award } from 'lucide-react'
import { getCurrentAnalysis, getAnalysisById } from '@/utils/storage'
import { getScoreLabel, getScoreColor } from '@/utils/scoreCalculator'
import { AnalysisResult } from '@/types/analysis'

export function ResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = searchParams.get('id')
    let result: AnalysisResult | null = null

    if (id) {
      result = getAnalysisById(id)
    } else {
      result = getCurrentAnalysis()
    }

    setAnalysis(result)
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Found</h2>
        <p className="text-gray-600 mb-6">Analyze a job description to see results here.</p>
        <button
          onClick={() => navigate('/dashboard/assessments')}
          className="px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors"
        >
          Analyze Job Description
        </button>
      </div>
    )
  }

  const { extractedSkills, readinessScore, checklist, plan, questions, company, role, createdAt } = analysis

  // Filter out empty categories
  const skillCategories = [
    { name: 'Core CS', skills: extractedSkills.coreCS, color: 'bg-blue-100 text-blue-700' },
    { name: 'Languages', skills: extractedSkills.languages, color: 'bg-green-100 text-green-700' },
    { name: 'Web', skills: extractedSkills.web, color: 'bg-purple-100 text-purple-700' },
    { name: 'Data', skills: extractedSkills.data, color: 'bg-orange-100 text-orange-700' },
    { name: 'Cloud/DevOps', skills: extractedSkills.cloudDevOps, color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Testing', skills: extractedSkills.testing, color: 'bg-pink-100 text-pink-700' },
  ].filter(cat => cat.skills.length > 0)

  const hasAnySkills = skillCategories.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/assessments')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-gray-600">{company} • {role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={() => navigate('/dashboard/assessments')}
            className="flex items-center gap-2 px-4 py-2 text-[hsl(245,58%,51%)] font-medium hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Analyze Another
          </button>
        </div>
      </div>

      {/* Readiness Score */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(245, 58%, 51%)"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - readinessScore / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(readinessScore)}`}>
                {readinessScore}
              </span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[hsl(245,58%,51%)]" />
              <span className="text-lg font-semibold text-gray-900">
                Readiness Score: {getScoreLabel(readinessScore)}
              </span>
            </div>
            <p className="text-gray-600 max-w-md">
              Based on detected skills, company info, and JD length. 
              Higher scores indicate better preparation coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Key Skills Extracted
        </h3>
        
        {hasAnySkills ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <div key={category.name} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${category.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">General fresher stack recommended:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['DSA', 'OOP', 'Java/Python', 'SQL', 'Problem Solving'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Round-wise Checklist */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Round-wise Preparation Checklist
        </h3>
        <div className="space-y-6">
          {checklist.map((round) => (
            <div key={round.round} className="border-l-4 border-[hsl(245,58%,51%)] pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Round {round.round}: {round.title}
              </h4>
              <ul className="space-y-2">
                {round.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[hsl(245,58%,51%)] mt-1">•</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          7-Day Preparation Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {plan.map((day) => (
            <div key={day.day} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Day {day.day}: {day.title}
              </h4>
              <ul className="space-y-1">
                {day.tasks.map((task, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[hsl(245,58%,51%)] mt-0.5">◦</span>
                    <span className="line-clamp-2">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Likely Interview Questions
        </h3>
        <div className="space-y-3">
          {questions.map((question, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-lg flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-[hsl(245,58%,51%)] text-white text-sm font-medium rounded-full flex items-center justify-center">
                {idx + 1}
              </span>
              <p className="text-gray-700">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
