import { ExtractedSkills, SkillConfidenceMap } from '@/types/analysis'
import { getDetectedCategories } from './skillExtractor'

const MAX_SCORE = 100
const MIN_SCORE = 0
const SCORE_ADJUSTMENT = 2

/**
 * Calculates base readiness score from JD analysis
 * This score is computed ONLY ONCE during initial analysis
 * @returns baseScore (0-100)
 */
export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdLength: number
): number {
  let score = 35 // Base score

  // +5 per detected category (max 30)
  const categories = getDetectedCategories(skills)
  score += Math.min(categories.length * 5, 30)

  // +10 if company name provided
  if (company && company.trim().length > 0) {
    score += 10
  }

  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10
  }

  // +10 if JD length > 800 chars
  if (jdLength > 800) {
    score += 10
  }

  // Cap at 100
  return Math.min(score, MAX_SCORE)
}

/**
 * Calculates final score based on base score and skill confidence map
 * Score changes by +/-2 per skill toggle, clamped 0-100
 * @param baseScore - The original score from JD analysis
 * @param skillConfidenceMap - Map of skill to confidence level
 * @returns finalScore (0-100)
 */
export function calculateFinalScore(
  baseScore: number,
  skillConfidenceMap: SkillConfidenceMap
): number {
  let adjustment = 0
  
  Object.values(skillConfidenceMap).forEach((confidence) => {
    if (confidence === 'know') {
      adjustment += SCORE_ADJUSTMENT
    } else {
      adjustment -= SCORE_ADJUSTMENT
    }
  })
  
  const finalScore = baseScore + adjustment
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, finalScore))
}

/**
 * @deprecated Use calculateFinalScore instead
 * Maintained for backward compatibility
 */
export function calculateAdjustedReadinessScore(
  baseScore: number,
  skillConfidenceMap: SkillConfidenceMap
): number {
  return calculateFinalScore(baseScore, skillConfidenceMap)
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs Work'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-blue-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}
