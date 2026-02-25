import { ExtractedSkills } from '@/types/analysis'

const skillCategories = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
}

// Default skills when extraction returns empty
const DEFAULT_SKILLS: ExtractedSkills = {
  coreCS: [],
  languages: [],
  web: [],
  data: [],
  cloud: [],
  testing: [],
  other: ['Communication', 'Problem solving', 'Basic coding', 'Projects'],
}

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase()
  const skills: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: [],
  }

  // Check each category
  skillCategories.coreCS.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skills.coreCS.push(skill)
  })

  skillCategories.languages.forEach(skill => {
    // Special handling for C/C++ to avoid false positives
    if (skill === 'C') {
      const cPattern = /\bc\b/g
      if (cPattern.test(text)) skills.languages.push(skill)
    } else if (skill === 'C++') {
      if (text.includes('c++')) skills.languages.push(skill)
    } else if (skill === 'C#') {
      if (text.includes('c#')) skills.languages.push(skill)
    } else if (text.includes(skill.toLowerCase())) {
      skills.languages.push(skill)
    }
  })

  skillCategories.web.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skills.web.push(skill)
  })

  skillCategories.data.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skills.data.push(skill)
  })

  skillCategories.cloud.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skills.cloud.push(skill)
  })

  skillCategories.testing.forEach(skill => {
    if (text.includes(skill.toLowerCase())) skills.testing.push(skill)
  })

  // Apply default skills if no skills detected
  if (!hasAnySkills(skills)) {
    return { ...DEFAULT_SKILLS }
  }

  return skills
}

export function hasAnySkills(skills: ExtractedSkills): boolean {
  return Object.values(skills).some(arr => Array.isArray(arr) && arr.length > 0)
}

export function getDetectedCategories(skills: ExtractedSkills): string[] {
  const categories: string[] = []
  if (skills.coreCS.length > 0) categories.push('coreCS')
  if (skills.languages.length > 0) categories.push('languages')
  if (skills.web.length > 0) categories.push('web')
  if (skills.data.length > 0) categories.push('data')
  if (skills.cloud.length > 0) categories.push('cloud')
  if (skills.testing.length > 0) categories.push('testing')
  if (skills.other && skills.other.length > 0) categories.push('other')
  return categories
}
