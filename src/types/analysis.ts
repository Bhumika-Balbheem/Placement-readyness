export interface ExtractedSkills {
  coreCS: string[]
  languages: string[]
  web: string[]
  data: string[]
  cloud: string[]
  testing: string[]
  other: string[]
}

export type SkillConfidence = 'know' | 'practice'

export interface SkillConfidenceMap {
  [skill: string]: SkillConfidence
}

// Standardized Round Checklist for history schema
export interface RoundChecklistItem {
  roundTitle: string
  items: string[]
}

// Standardized 7-Day Plan item
export interface Plan7DayItem {
  day: number
  focus: string
  tasks: string[]
}

// Standardized Round Mapping
export interface RoundMappingItem {
  roundTitle: string
  focusAreas: string[]
  whyItMatters: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface RoundChecklist {
  round: number
  title: string
  items: ChecklistItem[]
}

export interface DayPlan {
  day: number
  title: string
  tasks: string[]
}

// Strict Analysis Entry Schema - every field must be present
export interface AnalysisResult {
  // Identity & Metadata
  id: string
  createdAt: string
  updatedAt: string
  
  // Input Fields
  company: string
  role: string
  jdText: string
  
  // Extracted Data
  extractedSkills: ExtractedSkills
  
  // Generated Outputs
  roundMapping: RoundMappingItem[]
  checklist: RoundChecklistItem[]
  plan7Days: Plan7DayItem[]
  questions: string[]
  
  // Scoring
  baseScore: number
  skillConfidenceMap: SkillConfidenceMap
  finalScore: number
  
  // Optional Company Intel
  companyIntel?: CompanyIntel
}

export interface HistoryEntry {
  id: string
  createdAt: string
  company: string
  role: string
  readinessScore: number
}

export type CompanySize = 'startup' | 'mid-size' | 'enterprise'

export interface CompanyIntel {
  name: string
  industry: string
  size: CompanySize
  sizeLabel: string
  hiringFocus: string
}

export interface RoundMapping {
  round: number
  title: string
  description: string
  whyItMatters: string
}
