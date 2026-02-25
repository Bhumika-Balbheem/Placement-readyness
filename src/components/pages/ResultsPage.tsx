'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FileText, CheckCircle, Calendar, HelpCircle, ArrowLeft, RotateCcw, Award, Download, Copy, Check, Target, Play, Building2, Briefcase, Users, Lightbulb, MapPin, Info } from 'lucide-react'
import { getCurrentAnalysis, getAnalysisById, updateAnalysisSkillConfidence } from '@/utils/storage'
import { getScoreLabel, getScoreColor } from '@/utils/scoreCalculator'
import { getSizeBadgeColor } from '@/utils/companyIntel'
import { AnalysisResult, SkillConfidenceMap, SkillConfidence } from '@/types/analysis'

export default function ResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [skillConfidenceMap, setSkillConfidenceMap] = useState<SkillConfidenceMap>({})
  const [adjustedScore, setAdjustedScore] = useState(0)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('id')
    let result: AnalysisResult | null = null

    if (id) {
      result = getAnalysisById(id)
    } else {
      result = getCurrentAnalysis()
    }

    if (result) {
      setAnalysis(result)
      setSkillConfidenceMap(result.skillConfidenceMap || {})
      // Use finalScore from stored result
      setAdjustedScore(result.finalScore)
    }
    setLoading(false)
  }, [searchParams])

  const handleSkillToggle = useCallback((skill: string) => {
    if (!analysis) return

    const newConfidence: SkillConfidence = skillConfidenceMap[skill] === 'know' ? 'practice' : 'know'
    const newMap = { ...skillConfidenceMap, [skill]: newConfidence }
    
    setSkillConfidenceMap(newMap)
    
    // Persist to localStorage - finalScore will be recalculated based on baseScore
    updateAnalysisSkillConfidence(analysis.id, newMap)
    
    // Calculate new score locally for immediate feedback
    // +2 for 'know', -2 for 'practice'
    const adjustment = Object.values(newMap).reduce((acc, conf) => {
      return acc + (conf === 'know' ? 2 : -2)
    }, 0)
    const newScore = Math.max(0, Math.min(100, analysis.baseScore + adjustment))
    setAdjustedScore(newScore)
  }, [analysis, skillConfidenceMap])

  const copyToClipboard = useCallback((text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }, [])

  const downloadAsTxt = useCallback(() => {
    if (!analysis) return

    const content = `
PLACEMENT READINESS ANALYSIS
============================

Company: ${analysis.company || 'Not specified'}
Role: ${analysis.role || 'Not specified'}
Date: ${new Date(analysis.createdAt).toLocaleDateString()}
Readiness Score: ${adjustedScore}/100

KEY SKILLS EXTRACTED
--------------------
${Object.entries(analysis.extractedSkills)
  .filter(([_, skills]) => skills.length > 0)
  .map(([category, skills]) => `${category}: ${skills.join(', ')}`)
  .join('\n')}

7-DAY PREPARATION PLAN
----------------------
${analysis.plan7Days.map(day => `
Day ${day.day}: ${day.focus}
${day.tasks.map(task => `- ${task}`).join('\n')}
`).join('\n')}

ROUND-WISE CHECKLIST
--------------------
${analysis.checklist.map(round => `
${round.roundTitle}
${round.items.map(item => `- ${item}`).join('\n')}
`).join('\n')}

INTERVIEW QUESTIONS
-------------------
${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `placement-analysis-${analysis.company}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [analysis, adjustedScore])

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

  const { extractedSkills, baseScore, checklist, plan7Days, questions, company, role, createdAt } = analysis

  // Get all skills for weak skills list
  const allSkills = [
    ...extractedSkills.coreCS,
    ...extractedSkills.languages,
    ...extractedSkills.web,
    ...extractedSkills.data,
    ...extractedSkills.cloud,
    ...extractedSkills.testing,
    ...extractedSkills.other,
  ]

  // Get weak skills (marked as practice)
  const weakSkills = allSkills.filter(skill => skillConfidenceMap[skill] === 'practice').slice(0, 3)

  // Filter out empty categories
  const skillCategories = [
    { name: 'Core CS', skills: extractedSkills.coreCS, color: 'bg-blue-100 text-blue-700' },
    { name: 'Languages', skills: extractedSkills.languages, color: 'bg-green-100 text-green-700' },
    { name: 'Web', skills: extractedSkills.web, color: 'bg-purple-100 text-purple-700' },
    { name: 'Data', skills: extractedSkills.data, color: 'bg-orange-100 text-orange-700' },
    { name: 'Cloud/DevOps', skills: extractedSkills.cloud, color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Testing', skills: extractedSkills.testing, color: 'bg-pink-100 text-pink-700' },
    { name: 'Other', skills: extractedSkills.other, color: 'bg-gray-100 text-gray-700' },
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

      {/* Company Intel Block */}
      {analysis.companyIntel && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[hsl(245,58%,51%)]" />
            <h3 className="text-lg font-semibold text-gray-900">Company Intel</h3>
            <span className="text-xs text-gray-400 ml-2 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Demo Mode: Generated heuristically
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Company Name */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Building2 className="w-4 h-4" />
                Company
              </div>
              <p className="font-semibold text-gray-900">{analysis.companyIntel.name}</p>
            </div>
            
            {/* Industry */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Briefcase className="w-4 h-4" />
                Industry
              </div>
              <p className="font-semibold text-gray-900">{analysis.companyIntel.industry}</p>
            </div>
            
            {/* Size */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Users className="w-4 h-4" />
                Size
              </div>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getSizeBadgeColor(analysis.companyIntel.size)}`}>
                {analysis.companyIntel.sizeLabel}
              </span>
            </div>
            
            {/* Hiring Focus */}
            <div className="p-4 bg-gray-50 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Lightbulb className="w-4 h-4" />
                Typical Hiring Focus
              </div>
              <p className="text-sm text-gray-700">{analysis.companyIntel.hiringFocus}</p>
            </div>
          </div>
        </div>
      )}

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
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - adjustedScore / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(adjustedScore)}`}>
                {adjustedScore}
              </span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[hsl(245,58%,51%)]" />
              <span className="text-lg font-semibold text-gray-900">
                Readiness Score: {getScoreLabel(adjustedScore)}
              </span>
            </div>
            <p className="text-gray-600 max-w-md">
              Base score: {baseScore}. Adjusted based on your self-assessment.
              Mark skills as "I know this" to increase your score.
            </p>
            {adjustedScore !== baseScore && (
              <p className={`text-sm font-medium mt-2 ${adjustedScore > baseScore ? 'text-green-600' : 'text-red-600'}`}>
                {adjustedScore > baseScore ? '+' : ''}{adjustedScore - baseScore} from self-assessment
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Key Skills Extracted
          <span className="text-sm font-normal text-gray-500 ml-2">(Click to toggle confidence)</span>
        </h3>
        
        {hasAnySkills ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <div key={category.name} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const confidence = skillConfidenceMap[skill] || 'practice'
                    const isKnown = confidence === 'know'
                    return (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                          isKnown
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                        } hover:shadow-md`}
                        title={isKnown ? 'Click to mark as need practice' : 'Click to mark as known'}
                      >
                        <span className="flex items-center gap-1">
                          {isKnown ? <Check className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                          {skill}
                        </span>
                      </button>
                    )
                  })}
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
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></span>
            <span className="text-gray-600">I know this (+2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></span>
            <span className="text-gray-600">Need practice (-2)</span>
          </div>
        </div>
      </div>

      {/* Round Mapping Timeline */}
      {analysis.roundMapping && analysis.roundMapping.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[hsl(245,58%,51%)]" />
            Interview Round Mapping
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Round items */}
            <div className="space-y-6">
              {analysis.roundMapping.map((round, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Round number/badge */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-[hsl(245,58%,51%)] text-white rounded-full flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {round.roundTitle}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {round.focusAreas.join(', ')}
                      </p>
                      <div className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg">
                        <Lightbulb className="w-4 h-4 text-[hsl(245,58%,51%)] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-indigo-700">
                          <span className="font-medium">Why this matters: </span>
                          {round.whyItMatters}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Tools */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Tools</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => copyToClipboard(plan7Days.map(d => `Day ${d.day}: ${d.focus}\n${d.tasks.map(t => `- ${t}`).join('\n')}`).join('\n\n'), 'plan')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[hsl(245,58%,51%)] font-medium rounded-lg hover:bg-indigo-100 transition-colors"
          >
            {copiedSection === 'plan' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy 7-Day Plan
          </button>
          <button
            onClick={() => copyToClipboard(checklist.map(r => `${r.roundTitle}\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n'), 'checklist')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[hsl(245,58%,51%)] font-medium rounded-lg hover:bg-indigo-100 transition-colors"
          >
            {copiedSection === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Round Checklist
          </button>
          <button
            onClick={() => copyToClipboard(questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), 'questions')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[hsl(245,58%,51%)] font-medium rounded-lg hover:bg-indigo-100 transition-colors"
          >
            {copiedSection === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy 10 Questions
          </button>
          <button
            onClick={downloadAsTxt}
            className="flex items-center gap-2 px-4 py-2 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download as TXT
          </button>
        </div>
      </div>

      {/* Round-wise Checklist */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Round-wise Preparation Checklist
        </h3>
        <div className="space-y-6">
          {checklist.map((round, idx) => (
            <div key={idx} className="border-l-4 border-[hsl(245,58%,51%)] pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {round.roundTitle}
              </h4>
              <ul className="space-y-2">
                {round.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[hsl(245,58%,51%)] mt-1">•</span>
                    {item}
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
          {plan7Days.map((day) => (
            <div key={day.day} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Day {day.day}: {day.focus}
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

      {/* Action Next Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Action Next
            </h3>
            {weakSkills.length > 0 ? (
              <div className="mb-3">
                <p className="text-indigo-700 text-sm mb-2">Top skills to focus on:</p>
                <div className="flex flex-wrap gap-2">
                  {weakSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-700 border border-amber-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-indigo-700 mb-3">Great job! You have marked all skills as known.</p>
            )}
            <p className="text-indigo-600">
              Start Day 1 of your preparation plan now.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/practice')}
            className="flex items-center gap-2 px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-semibold rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors whitespace-nowrap"
          >
            <Play className="w-4 h-4" />
            Start Day 1 Plan
          </button>
        </div>
      </div>
    </div>
  )
}
