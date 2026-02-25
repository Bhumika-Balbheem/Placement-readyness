export interface ExtractedSkills {
  coreCS: string[]
  languages: string[]
  web: string[]
  data: string[]
  cloudDevOps: string[]
  testing: string[]
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
  plan: DayPlan[]
  checklist: RoundChecklist[]
  questions: string[]
  readinessScore: number
}

export interface HistoryEntry {
  id: string
  createdAt: string
  company: string
  role: string
  readinessScore: number
}
