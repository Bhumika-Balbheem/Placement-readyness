import { AnalysisResult, HistoryEntry, SkillConfidenceMap } from '@/types/analysis'
import { normalizeAnalysisResult, calculateFinalScore, validateHistoryEntries } from '@/utils/validation'

const STORAGE_KEY = 'placement_readiness_history'
const CURRENT_ANALYSIS_KEY = 'placement_current_analysis'
const CORRUPTION_WARNING_KEY = 'placement_corruption_warning'

/**
 * Checks if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

/**
 * Saves analysis result to localStorage with full schema
 */
export function saveAnalysis(result: AnalysisResult): void {
  if (!isLocalStorageAvailable()) return

  // Ensure all required fields are present
  const normalizedResult: AnalysisResult = {
    ...result,
    updatedAt: new Date().toISOString(),
  }

  // Save current analysis
  localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(normalizedResult))

  // Get existing history
  const history = getHistory()

  // Add new entry
  const entry: HistoryEntry = {
    id: normalizedResult.id,
    createdAt: normalizedResult.createdAt,
    company: normalizedResult.company,
    role: normalizedResult.role,
    readinessScore: normalizedResult.finalScore,
  }

  // Add to beginning of array
  const updatedHistory = [entry, ...history]

  // Save back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
}

/**
 * Gets history entries with validation
 * Filters out corrupted entries and tracks warning state
 */
export function getHistory(): HistoryEntry[] {
  if (!isLocalStorageAvailable()) return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    const parsed = JSON.parse(stored) as unknown[]
    
    // Validate and filter entries
    const validEntries: HistoryEntry[] = []
    let corruptedCount = 0
    
    parsed.forEach((entry) => {
      if (isValidHistoryEntry(entry)) {
        validEntries.push(entry as HistoryEntry)
      } else {
        corruptedCount++
      }
    })
    
    // Store corruption warning flag if needed
    if (corruptedCount > 0) {
      localStorage.setItem(CORRUPTION_WARNING_KEY, 'true')
    }
    
    return validEntries
  } catch {
    return []
  }
}

/**
 * Checks if a value is a valid HistoryEntry
 */
function isValidHistoryEntry(entry: unknown): entry is HistoryEntry {
  if (!entry || typeof entry !== 'object') return false
  
  const e = entry as Partial<HistoryEntry>
  return (
    typeof e.id === 'string' &&
    typeof e.createdAt === 'string' &&
    typeof e.company === 'string' &&
    typeof e.role === 'string' &&
    typeof e.readinessScore === 'number'
  )
}

/**
 * Checks if corruption warning should be shown
 */
export function hasCorruptionWarning(): boolean {
  if (!isLocalStorageAvailable()) return false
  return localStorage.getItem(CORRUPTION_WARNING_KEY) === 'true'
}

/**
 * Clears corruption warning flag
 */
export function clearCorruptionWarning(): void {
  if (!isLocalStorageAvailable()) return
  localStorage.removeItem(CORRUPTION_WARNING_KEY)
}

/**
 * Gets current analysis with normalization
 */
export function getCurrentAnalysis(): AnalysisResult | null {
  if (!isLocalStorageAvailable()) return null

  const stored = localStorage.getItem(CURRENT_ANALYSIS_KEY)
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored) as unknown
    return normalizeAnalysisResult(parsed)
  } catch {
    return null
  }
}

/**
 * Gets analysis by ID with normalization
 */
export function getAnalysisById(id: string): AnalysisResult | null {
  if (!isLocalStorageAvailable()) return null

  // Check if current analysis matches
  const current = getCurrentAnalysis()
  if (current && current.id === id) {
    return current
  }

  // Check in separate full results storage
  const fullResultsKey = `placement_analysis_${id}`
  const stored = localStorage.getItem(fullResultsKey)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as unknown
      return normalizeAnalysisResult(parsed)
    } catch {
      return null
    }
  }

  return null
}

/**
 * Saves full analysis with schema enforcement
 */
export function saveFullAnalysis(result: AnalysisResult): void {
  if (!isLocalStorageAvailable()) return

  // Normalize to ensure all required fields
  const normalizedResult: AnalysisResult = {
    ...result,
    updatedAt: new Date().toISOString(),
  }

  // Store full result with ID-based key for retrieval
  const fullResultsKey = `placement_analysis_${normalizedResult.id}`
  localStorage.setItem(fullResultsKey, JSON.stringify(normalizedResult))

  // Also update current analysis
  localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(normalizedResult))
  
  // Update history entry
  updateHistoryEntry(normalizedResult)
}

/**
 * Updates history entry for a result
 */
function updateHistoryEntry(result: AnalysisResult): void {
  const history = getHistory()
  const existingIndex = history.findIndex(h => h.id === result.id)
  
  const entry: HistoryEntry = {
    id: result.id,
    createdAt: result.createdAt,
    company: result.company,
    role: result.role,
    readinessScore: result.finalScore,
  }
  
  if (existingIndex >= 0) {
    history[existingIndex] = entry
  } else {
    history.unshift(entry)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

/**
 * Clears all history and analysis data
 */
export function clearHistory(): void {
  if (!isLocalStorageAvailable()) return

  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(CURRENT_ANALYSIS_KEY)
  localStorage.removeItem(CORRUPTION_WARNING_KEY)

  // Clear all analysis entries
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('placement_analysis_')) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * Deletes a history entry and its full analysis
 */
export function deleteHistoryEntry(id: string): void {
  if (!isLocalStorageAvailable()) return

  const history = getHistory()
  const updatedHistory = history.filter(entry => entry.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))

  // Remove full analysis
  const fullResultsKey = `placement_analysis_${id}`
  localStorage.removeItem(fullResultsKey)
}

/**
 * Updates skill confidence and recalculates final score
 * baseScore remains unchanged (computed only on analyze)
 * finalScore changes based on skillConfidenceMap (+/-2 per skill)
 */
export function updateAnalysisSkillConfidence(
  id: string,
  skillConfidenceMap: SkillConfidenceMap
): void {
  if (!isLocalStorageAvailable()) return

  // Get current analysis
  const analysis = getAnalysisById(id)
  if (!analysis) return

  // Calculate new final score based on baseScore and confidence map
  const finalScore = calculateFinalScore(analysis.baseScore, skillConfidenceMap)
  
  // Create updated analysis
  const updatedAnalysis: AnalysisResult = {
    ...analysis,
    skillConfidenceMap,
    finalScore,
    updatedAt: new Date().toISOString(),
  }

  // Save updated analysis
  const fullResultsKey = `placement_analysis_${id}`
  localStorage.setItem(fullResultsKey, JSON.stringify(updatedAnalysis))
  
  // Update current analysis if it matches
  const current = getCurrentAnalysis()
  if (current && current.id === id) {
    localStorage.setItem(CURRENT_ANALYSIS_KEY, JSON.stringify(updatedAnalysis))
  }

  // Update history entry score
  const history = getHistory()
  const updatedHistory = history.map(entry => {
    if (entry.id === id) {
      return { ...entry, readinessScore: finalScore }
    }
    return entry
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
}

/**
 * Initializes skill confidence map with default 'practice' for all skills
 */
export function initializeSkillConfidenceMap(skills: string[]): SkillConfidenceMap {
  const map: SkillConfidenceMap = {}
  skills.forEach(skill => {
    map[skill] = 'practice'
  })
  return map
}

/**
 * Gets all history entries with full analysis objects
 * Validates and normalizes each entry
 */
export function getFullHistory(): AnalysisResult[] {
  if (!isLocalStorageAvailable()) return []

  const history = getHistory()
  const fullResults: AnalysisResult[] = []

  history.forEach(entry => {
    const analysis = getAnalysisById(entry.id)
    if (analysis) {
      fullResults.push(analysis)
    }
  })

  return fullResults
}
