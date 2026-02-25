export interface ExtractedSkills {
  coreCS: string[]
  languages: string[]
  web: string[]
  data: string[]
  cloudDevOps: string[]
  testing: string[]
}

export type SkillConfidence = 'know' | 'practice'

export interface SkillConfidenceMap {
  [skill: string]: SkillConfidence
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

export interface AnalysisResult {
  id: string
  createdAt: string
  company: string
  role: string
  jdText: string
  extractedSkills: ExtractedSkills
  skillConfidenceMap: SkillConfidenceMap
  plan: DayPlan[]
  checklist: RoundChecklist[]
  questions: string[]
  readinessScore: number
  adjustedReadinessScore: number
  companyIntel?: CompanyIntel
  roundMapping?: RoundMapping[]
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
