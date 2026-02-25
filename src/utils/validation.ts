/**
 * Validation utilities for Placement Readiness Platform
 * Ensures data integrity and handles edge cases
 */

import type { AnalysisResult, ExtractedSkills, SkillConfidenceMap } from '@/types/analysis'

const MIN_JD_LENGTH = 200
const MAX_SCORE = 100
const MIN_SCORE = 0
const SCORE_ADJUSTMENT = 2

// Default skills when extraction returns empty
export const DEFAULT_SKILLS: ExtractedSkills = {
  coreCS: [],
  languages: [],
  web: [],
  data: [],
  cloud: [],
  testing: [],
  other: ['Communication', 'Problem solving', 'Basic coding', 'Projects'],
}

// Default round mapping
const DEFAULT_ROUND_MAPPING = [
  {
    roundTitle: 'Resume Screening',
    focusAreas: ['Resume quality', 'Project descriptions', 'Skills alignment'],
    whyItMatters: 'First impression matters - recruiters spend 6-7 seconds on initial scan',
  },
  {
    roundTitle: 'Technical Interview',
    focusAreas: ['Problem solving', 'Coding fundamentals', 'Communication'],
    whyItMatters: 'Core assessment of your technical capabilities and thought process',
  },
  {
    roundTitle: 'HR/Behavioral Round',
    focusAreas: ['Cultural fit', 'Career goals', 'Soft skills'],
    whyItMatters: 'Determines if you align with company values and team dynamics',
  },
]

// Default checklist
const DEFAULT_CHECKLIST = [
  {
    roundTitle: 'Preparation',
    items: [
      'Update resume with relevant projects',
      'Practice coding problems daily',
      'Prepare STAR format stories',
    ],
  },
  {
    roundTitle: 'Technical Readiness',
    items: [
      'Review fundamental concepts',
      'Practice mock interviews',
      'Build confidence through repetition',
    ],
  },
]

// Default 7-day plan
const DEFAULT_PLAN_7_DAYS = [
  {
    day: 1,
    focus: 'Foundation',
    tasks: ['Review basic coding concepts', 'Practice 2 easy problems'],
  },
  {
    day: 2,
    focus: 'Problem Solving',
    tasks: ['Work on logic building', 'Practice communication while coding'],
  },
  {
    day: 3,
    focus: 'Projects',
    tasks: ['Document your projects', 'Prepare to explain your role'],
  },
  {
    day: 4,
    focus: 'Mock Practice',
    tasks: ['Do a mock interview with friend', 'Record yourself explaining code'],
  },
  {
    day: 5,
    focus: 'Review',
    tasks: ['Review weak areas', 'Practice previous mistakes'],
  },
  {
    day: 6,
    focus: 'Confidence Building',
    tasks: ['Solve familiar problems', 'Build momentum'],
  },
  {
    day: 7,
    focus: 'Final Prep',
    tasks: ['Light practice', 'Rest and prepare mentally'],
  },
]

// Default questions
const DEFAULT_QUESTIONS = [
  'Tell me about yourself and your background.',
  'Describe a challenging project you worked on.',
  'How do you approach problem-solving?',
  'What are your strengths and weaknesses?',
  'Why do you want to work at our company?',
  'Where do you see yourself in 5 years?',
  'Describe a time you worked in a team.',
  'How do you handle stress and deadlines?',
  'What motivates you in your work?',
  'Do you have any questions for us?',
]

/**
 * Validates JD length and returns warning if too short
 */
export function validateJDLength(jdText: string): { valid: boolean; warning?: string } {
  if (!jdText || jdText.trim().length === 0) {
    return { valid: false, warning: 'Job description is required' }
  }
  
  if (jdText.length < MIN_JD_LENGTH) {
    return {
      valid: true,
      warning: 'This JD is too short to analyze deeply. Paste full JD for better output.',
    }
  }
  
  return { valid: true }
}

/**
 * Checks if extracted skills is effectively empty
 */
export function isSkillsEmpty(skills: ExtractedSkills): boolean {
  const totalSkills =
    skills.coreCS.length +
    skills.languages.length +
    skills.web.length +
    skills.data.length +
    skills.cloud.length +
    skills.testing.length +
    (skills.other?.length || 0)
  
  return totalSkills === 0
}

/**
 * Applies default skills if extraction returned empty
 */
export function applyDefaultSkillsIfEmpty(skills: ExtractedSkills): ExtractedSkills {
  if (isSkillsEmpty(skills)) {
    return { ...DEFAULT_SKILLS }
  }
  return skills
}

/**
 * Calculates final score based on base score and confidence map
 * Score changes by +/-2 per skill toggle, clamped 0-100
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
 * Validates and normalizes an analysis result to ensure all required fields exist
 */
export function normalizeAnalysisResult(data: unknown): AnalysisResult | null {
  if (!data || typeof data !== 'object') {
    return null
  }
  
  const raw = data as Partial<AnalysisResult>
  
  // Check required identity fields
  if (!raw.id || !raw.createdAt) {
    return null
  }
  
  // Build normalized result with defaults for missing fields
  const normalized: AnalysisResult = {
    // Identity & Metadata
    id: String(raw.id),
    createdAt: String(raw.createdAt),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : String(raw.createdAt),
    
    // Input Fields
    company: raw.company ?? '',
    role: raw.role ?? '',
    jdText: raw.jdText ?? '',
    
    // Extracted Data with defaults
    extractedSkills: normalizeExtractedSkills(raw.extractedSkills),
    
    // Generated Outputs with defaults
    roundMapping: raw.roundMapping && Array.isArray(raw.roundMapping) 
      ? raw.roundMapping 
      : DEFAULT_ROUND_MAPPING,
    checklist: raw.checklist && Array.isArray(raw.checklist)
      ? raw.checklist
      : DEFAULT_CHECKLIST,
    plan7Days: raw.plan7Days && Array.isArray(raw.plan7Days)
      ? raw.plan7Days
      : DEFAULT_PLAN_7_DAYS,
    questions: raw.questions && Array.isArray(raw.questions)
      ? raw.questions
      : DEFAULT_QUESTIONS,
    
    // Scoring
    baseScore: typeof raw.baseScore === 'number' 
      ? raw.baseScore 
      : 50,
    skillConfidenceMap: normalizeSkillConfidenceMap(raw.skillConfidenceMap),
    finalScore: typeof raw.finalScore === 'number'
      ? raw.finalScore
      : 50,
    
    // Optional Company Intel
    companyIntel: raw.companyIntel,
  }
  
  // Apply default skills if empty
  normalized.extractedSkills = applyDefaultSkillsIfEmpty(normalized.extractedSkills)
  
  // Recalculate final score to ensure consistency
  normalized.finalScore = calculateFinalScore(
    normalized.baseScore,
    normalized.skillConfidenceMap
  )
  
  return normalized
}

/**
 * Normalizes extracted skills with all required categories
 */
function normalizeExtractedSkills(skills: unknown): ExtractedSkills {
  if (!skills || typeof skills !== 'object') {
    return { ...DEFAULT_SKILLS }
  }
  
  const s = skills as Partial<ExtractedSkills>
  
  return {
    coreCS: Array.isArray(s.coreCS) ? s.coreCS : [],
    languages: Array.isArray(s.languages) ? s.languages : [],
    web: Array.isArray(s.web) ? s.web : [],
    data: Array.isArray(s.data) ? s.data : [],
    cloud: Array.isArray(s.cloud) || Array.isArray((s as { cloudDevOps?: string[] }).cloudDevOps)
      ? (s.cloud ?? (s as { cloudDevOps?: string[] }).cloudDevOps ?? [])
      : [],
    testing: Array.isArray(s.testing) ? s.testing : [],
    other: Array.isArray(s.other) ? s.other : [],
  }
}

/**
 * Normalizes skill confidence map
 */
function normalizeSkillConfidenceMap(map: unknown): SkillConfidenceMap {
  if (!map || typeof map !== 'object') {
    return {}
  }
  
  const normalized: SkillConfidenceMap = {}
  
  Object.entries(map as Record<string, unknown>).forEach(([skill, confidence]) => {
    if (confidence === 'know' || confidence === 'practice') {
      normalized[skill] = confidence
    } else {
      normalized[skill] = 'practice'
    }
  })
  
  return normalized
}

/**
 * Validates an array of history entries, filtering out corrupted ones
 * Returns valid entries and count of corrupted entries skipped
 */
export function validateHistoryEntries(entries: unknown[]): {
  valid: AnalysisResult[]
  corruptedCount: number
} {
  const valid: AnalysisResult[] = []
  let corruptedCount = 0
  
  entries.forEach((entry) => {
    const normalized = normalizeAnalysisResult(entry)
    if (normalized) {
      valid.push(normalized)
    } else {
      corruptedCount++
    }
  })
  
  return { valid, corruptedCount }
}

/**
 * Generates default outputs when skills are empty
 */
export function getDefaultOutputs() {
  return {
    skills: DEFAULT_SKILLS,
    roundMapping: DEFAULT_ROUND_MAPPING,
    checklist: DEFAULT_CHECKLIST,
    plan7Days: DEFAULT_PLAN_7_DAYS,
    questions: DEFAULT_QUESTIONS,
  }
}
