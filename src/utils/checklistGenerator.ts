import { RoundChecklistItem, ExtractedSkills } from '@/types/analysis'

export function generateChecklist(skills: ExtractedSkills): RoundChecklistItem[] {
  const checklist: RoundChecklistItem[] = []

  // Round 1: Aptitude / Basics
  const round1Items = [
    'Practice quantitative aptitude problems',
    'Review logical reasoning concepts',
    'Solve verbal ability questions',
    'Complete 2 full-length mock tests',
    'Review basic mathematics formulas',
  ]
  checklist.push({ roundTitle: 'Aptitude / Basics', items: round1Items })

  // Round 2: DSA + Core CS
  const round2Items = [
    'Review arrays, strings, and linked lists',
    'Practice tree and graph problems',
    'Solve dynamic programming questions',
    'Review sorting and searching algorithms',
  ]

  if (skills.coreCS.includes('OOP')) {
    round2Items.push('Study OOP principles and design patterns')
  }
  if (skills.coreCS.includes('DBMS')) {
    round2Items.push('Review database normalization and SQL queries')
  }
  if (skills.coreCS.includes('OS')) {
    round2Items.push('Study operating system concepts')
  }
  if (skills.coreCS.includes('Networks')) {
    round2Items.push('Review networking protocols and OSI model')
  }

  checklist.push({ roundTitle: 'DSA + Core CS', items: round2Items })

  // Round 3: Tech interview (projects + stack)
  const round3Items = [
    'Prepare project explanations with architecture diagrams',
    'Review your role and contributions in each project',
  ]

  if (skills.languages.length > 0) {
    round3Items.push(`Deep dive into ${skills.languages.slice(0, 2).join(', ')} concepts`)
  }
  if (skills.web.length > 0) {
    round3Items.push(`Study ${skills.web.slice(0, 2).join(', ')} architecture and best practices`)
  }
  if (skills.data.length > 0) {
    round3Items.push(`Review database design with ${skills.data.slice(0, 2).join(', ')}`)
  }
  if (skills.cloud.length > 0) {
    round3Items.push(`Understand ${skills.cloud.slice(0, 2).join(', ')} deployment workflows`)
  }

  checklist.push({ roundTitle: 'Tech Interview (Projects + Stack)', items: round3Items })

  // Round 4: Managerial / HR
  const round4Items = [
    'Prepare STAR format answers for behavioral questions',
    'Research company culture and values',
    'Prepare questions to ask the interviewer',
    'Practice salary negotiation techniques',
    'Review your resume thoroughly',
    'Prepare self-introduction (1-2 minutes)',
    'Identify your strengths and weaknesses',
  ]
  checklist.push({ roundTitle: 'Managerial / HR', items: round4Items })

  return checklist
}
