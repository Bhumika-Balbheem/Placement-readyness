import { ExtractedSkills, SkillConfidenceMap } from '@/types/analysis'
import { getDetectedCategories } from './skillExtractor'

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
  return Math.min(score, 100)
}

export function calculateAdjustedReadinessScore(
  baseScore: number,
  skillConfidenceMap: SkillConfidenceMap
): number {
  let adjustedScore = baseScore

  Object.values(skillConfidenceMap).forEach(confidence => {
    if (confidence === 'know') {
      adjustedScore += 2
    } else {
      adjustedScore -= 2
    }
  })

  // Bounds: 0-100
  return Math.max(0, Math.min(100, adjustedScore))
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
