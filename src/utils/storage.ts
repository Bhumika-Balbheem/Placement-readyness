import { AnalysisResult, HistoryEntry, SkillConfidenceMap, SkillConfidence } from '@/types/analysis'

const STORAGE_KEY = 'placement_readiness_history'
const CURRENT_ANALYSIS_KEY = 'placement_current_analysis'

export function saveAnalysis(result: AnalysisResult): void {
  if (typeof window === 'undefined') return

  // Save current analysis
  localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(result))

  // Get existing history
  const history = getHistory()

  // Add new entry
  const entry: HistoryEntry = {
    id: result.id,
    createdAt: result.createdAt,
    company: result.company,
    role: result.role,
    readinessScore: result.readinessScore,
  }

  // Add to beginning of array
  const updatedHistory = [entry, ...history]

  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored) as HistoryEntry[]
  } catch {
    return []
  }
}

export function getCurrentAnalysis(): AnalysisResult | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(CURRENT_ANALYSIS_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as AnalysisResult
  } catch {
    return null
  }
}

export function getAnalysisById(id: string): AnalysisResult | null {
  if (typeof window === 'undefined') return null

  // We need to store full analysis results to retrieve by ID
  // For now, check if current analysis matches
  const current = getCurrentAnalysis()
  if (current && current.id === id) {
    return current
  }

  // Check in a separate full results storage
  const fullResultsKey = `placement_analysis_${id}`
  const stored = localStorage.getItem(fullResultsKey)
  if (stored) {
    try {
      return JSON.parse(stored) as AnalysisResult
    } catch {
      return null
    }
  }

  return null
}

export function saveFullAnalysis(result: AnalysisResult): void {
  if (typeof window === 'undefined') return

  // Store full result with ID-based key for retrieval
  const fullResultsKey = `placement_analysis_${result.id}`
  localStorage.setItem(fullResultsKey, JSON.stringify(result))

  // Also update current analysis
  localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(result))
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return

  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(CURRENT_ANALYSIS_KEY)

  // Clear all analysis entries
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('placement_analysis_')) {
      localStorage.removeItem(key)
    }
  })
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return

  const history = getHistory()
  const updatedHistory = history.filter(entry => entry.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))

  // Remove full analysis
  const fullResultsKey = `placement_analysis_${id}`
  localStorage.removeItem(fullResultsKey)
}

export function updateAnalysisSkillConfidence(
  id: string,
  skillConfidenceMap: SkillConfidenceMap,
  adjustedReadinessScore: number
): void {
  if (typeof window === 'undefined') return

  // Update full analysis
  const fullResultsKey = `placement_analysis_${id}`
  const stored = localStorage.getItem(fullResultsKey)
  
  if (stored) {
    try {
      const analysis: AnalysisResult = JSON.parse(stored)
      analysis.skillConfidenceMap = skillConfidenceMap
      analysis.adjustedReadinessScore = adjustedReadinessScore
      localStorage.setItem(fullResultsKey, JSON.stringify(analysis))
      
      // Also update current analysis if it matches
      const current = getCurrentAnalysis()
      if (current && current.id === id) {
        localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(analysis))
      }
    } catch {
      // Ignore parse errors
    }
  }

  // Update history entry score
  const history = getHistory()
  const updatedHistory = history.map(entry => {
    if (entry.id === id) {
      return { ...entry, readinessScore: adjustedReadinessScore }
    }
    return entry
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
}

export function initializeSkillConfidenceMap(skills: string[]): SkillConfidenceMap {
  const map: SkillConfidenceMap = {}
  skills.forEach(skill => {
    map[skill] = 'practice'
  })
  return map
}
