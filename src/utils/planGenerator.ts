import { Plan7DayItem, ExtractedSkills } from '@/types/analysis'

export function generatePlan(skills: ExtractedSkills): Plan7DayItem[] {
  const plan: Plan7DayItem[] = []
  const hasWeb = skills.web.length > 0
  const hasData = skills.data.length > 0
  const hasCloud = skills.cloud.length > 0
  const hasTesting = skills.testing.length > 0

  // Day 1-2: Basics + Core CS
  const day1Tasks = [
    'Review fundamental data structures (arrays, linked lists, stacks, queues)',
    'Study time and space complexity analysis',
    'Practice 3-4 basic coding problems',
  ]
  if (skills.coreCS.includes('OOP')) {
    day1Tasks.push('Review OOP principles: encapsulation, inheritance, polymorphism')
  }

  plan.push({ day: 1, focus: 'Basics + Core CS - Part 1', tasks: day1Tasks })

  const day2Tasks = [
    'Study advanced data structures (trees, graphs, heaps)',
    'Review core CS concepts based on JD requirements',
    'Practice 3-4 medium coding problems',
  ]
  if (skills.coreCS.includes('DBMS')) {
    day2Tasks.push('Review database concepts: normalization, indexing, transactions')
  }
  if (skills.coreCS.includes('OS')) {
    day2Tasks.push('Study OS concepts: processes, threads, memory management')
  }

  plan.push({ day: 2, focus: 'Basics + Core CS - Part 2', tasks: day2Tasks })

  // Day 3-4: DSA + Coding Practice
  const day3Tasks = [
    'Focus on sorting and searching algorithms',
    'Practice binary search variations',
    'Solve 4-5 DSA problems on arrays and strings',
  ]
  if (skills.languages.length > 0) {
    day3Tasks.push(`Review ${skills.languages[0]} specific optimizations and best practices`)
  }

  plan.push({ day: 3, focus: 'DSA + Coding - Part 1', tasks: day3Tasks })

  const day4Tasks = [
    'Study dynamic programming patterns',
    'Practice tree and graph traversal algorithms',
    'Solve 4-5 advanced DSA problems',
    'Review recursion and backtracking techniques',
  ]

  plan.push({ day: 4, focus: 'DSA + Coding - Part 2', tasks: day4Tasks })

  // Day 5: Project + Resume Alignment
  const day5Tasks = [
    'Update resume with relevant keywords from JD',
    'Prepare 2-minute pitch for each major project',
    'Document your role, challenges faced, and impact metrics',
  ]
  if (hasWeb) {
    day5Tasks.push(`Review ${skills.web.slice(0, 2).join(', ')} project architecture`)
  }
  if (hasData) {
    day5Tasks.push('Prepare database schema explanations for your projects')
  }
  if (hasCloud) {
    day5Tasks.push('Document deployment and infrastructure details')
  }

  plan.push({ day: 5, focus: 'Project + Resume Alignment', tasks: day5Tasks })

  // Day 6: Mock Interview Questions
  const day6Tasks = [
    'Practice 5-10 technical questions from generated list',
    'Conduct mock interview with peer or use recording',
    'Review and refine your answers',
  ]
  if (hasWeb) {
    day6Tasks.push('Prepare for frontend/system design discussions')
  }
  if (hasTesting) {
    day6Tasks.push('Review testing strategies and frameworks')
  }

  plan.push({ day: 6, focus: 'Mock Interview Questions', tasks: day6Tasks })

  // Day 7: Revision + Weak Areas
  const day7Tasks = [
    'Identify and focus on weak areas from practice',
    'Review all notes and key concepts',
    'Practice 2-3 full mock interviews',
    'Prepare questions to ask the interviewer',
    'Rest and mentally prepare for the interview',
  ]
  if (skills.languages.length > 0) {
    day7Tasks.push(`Quick revision of ${skills.languages[0]} syntax and common pitfalls`)
  }

  plan.push({ day: 7, focus: 'Revision + Weak Areas', tasks: day7Tasks })

  return plan
}
