import { RoundChecklist, ChecklistItem } from '@/types/analysis'
import { ExtractedSkills } from '@/types/analysis'

export function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const checklist: RoundChecklist[] = []

  // Round 1: Aptitude / Basics
  const round1Items: ChecklistItem[] = [
    { id: 'r1-1', text: 'Practice quantitative aptitude problems', completed: false },
    { id: 'r1-2', text: 'Review logical reasoning concepts', completed: false },
    { id: 'r1-3', text: 'Solve verbal ability questions', completed: false },
    { id: 'r1-4', text: 'Complete 2 full-length mock tests', completed: false },
    { id: 'r1-5', text: 'Review basic mathematics formulas', completed: false },
  ]
  checklist.push({ round: 1, title: 'Aptitude / Basics', items: round1Items })

  // Round 2: DSA + Core CS
  const round2Items: ChecklistItem[] = [
    { id: 'r2-1', text: 'Review arrays, strings, and linked lists', completed: false },
    { id: 'r2-2', text: 'Practice tree and graph problems', completed: false },
    { id: 'r2-3', text: 'Solve dynamic programming questions', completed: false },
    { id: 'r2-4', text: 'Review sorting and searching algorithms', completed: false },
  ]

  if (skills.coreCS.includes('OOP')) {
    round2Items.push({ id: 'r2-5', text: 'Study OOP principles and design patterns', completed: false })
  }
  if (skills.coreCS.includes('DBMS')) {
    round2Items.push({ id: 'r2-6', text: 'Review database normalization and SQL queries', completed: false })
  }
  if (skills.coreCS.includes('OS')) {
    round2Items.push({ id: 'r2-7', text: 'Study operating system concepts', completed: false })
  }
  if (skills.coreCS.includes('Networks')) {
    round2Items.push({ id: 'r2-8', text: 'Review networking protocols and OSI model', completed: false })
  }

  checklist.push({ round: 2, title: 'DSA + Core CS', items: round2Items })

  // Round 3: Tech interview (projects + stack)
  const round3Items: ChecklistItem[] = [
    { id: 'r3-1', text: 'Prepare project explanations with architecture diagrams', completed: false },
    { id: 'r3-2', text: 'Review your role and contributions in each project', completed: false },
  ]

  if (skills.languages.length > 0) {
    round3Items.push({ id: 'r3-3', text: `Deep dive into ${skills.languages.slice(0, 2).join(', ')} concepts`, completed: false })
  }
  if (skills.web.length > 0) {
    round3Items.push({ id: 'r3-4', text: `Study ${skills.web.slice(0, 2).join(', ')} architecture and best practices`, completed: false })
  }
  if (skills.data.length > 0) {
    round3Items.push({ id: 'r3-5', text: `Review database design with ${skills.data.slice(0, 2).join(', ')}`, completed: false })
  }
  if (skills.cloudDevOps.length > 0) {
    round3Items.push({ id: 'r3-6', text: `Understand ${skills.cloudDevOps.slice(0, 2).join(', ')} deployment workflows`, completed: false })
  }

  checklist.push({ round: 3, title: 'Tech Interview (Projects + Stack)', items: round3Items })

  // Round 4: Managerial / HR
  const round4Items: ChecklistItem[] = [
    { id: 'r4-1', text: 'Prepare STAR format answers for behavioral questions', completed: false },
    { id: 'r4-2', text: 'Research company culture and values', completed: false },
    { id: 'r4-3', text: 'Prepare questions to ask the interviewer', completed: false },
    { id: 'r4-4', text: 'Practice salary negotiation techniques', completed: false },
    { id: 'r4-5', text: 'Review your resume thoroughly', completed: false },
    { id: 'r4-6', text: 'Prepare self-introduction (1-2 minutes)', completed: false },
    { id: 'r4-7', text: 'Identify your strengths and weaknesses', completed: false },
  ]
  checklist.push({ round: 4, title: 'Managerial / HR', items: round4Items })

  return checklist
}
