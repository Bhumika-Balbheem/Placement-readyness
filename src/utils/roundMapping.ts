import { RoundMappingItem, CompanySize, ExtractedSkills } from '@/types/analysis'

export function generateRoundMapping(
  companySize: CompanySize,
  skills: ExtractedSkills
): RoundMappingItem[] {
  const hasDSA = skills.coreCS.includes('DSA')
  const hasWeb = skills.web.length > 0
  const hasSystemDesign = skills.coreCS.includes('System Design') || skills.cloud.length > 0

  if (companySize === 'enterprise') {
    // Enterprise typically has 4 rounds
    return [
      {
        roundTitle: 'Online Assessment',
        focusAreas: ['DSA problems', 'Aptitude tests', 'Speed and accuracy'],
        whyItMatters: 'Enterprise companies use this to filter candidates at scale. Focus on speed and accuracy.'
      },
      {
        roundTitle: 'Technical Interview I',
        focusAreas: hasDSA 
          ? ['Arrays', 'Trees', 'Graphs', 'Dynamic programming']
          : ['OOP', 'DBMS', 'OS concepts'],
        whyItMatters: 'Tests your problem-solving approach and CS fundamentals depth.'
      },
      {
        roundTitle: 'Technical Interview II',
        focusAreas: hasSystemDesign
          ? ['System design', 'Project deep dive', 'Low-level design']
          : ['Project discussion', 'Coding', 'Technology stack'],
        whyItMatters: 'Evaluates your ability to design scalable systems and technical ownership.'
      },
      {
        roundTitle: 'Managerial / HR Round',
        focusAreas: ['Behavioral questions', 'Culture fit', 'Compensation discussion'],
        whyItMatters: 'Assesses cultural alignment, communication skills, and long-term fit.'
      }
    ]
  } else if (companySize === 'mid-size') {
    // Mid-size typically has 3 rounds
    return [
      {
        roundTitle: 'Technical Screening',
        focusAreas: hasDSA
          ? ['DSA', 'Coding problems', 'Basic system design']
          : ['Coding', 'Core CS', 'Practical problem solving'],
        whyItMatters: 'Mid-size companies need developers who can code efficiently and understand systems.'
      },
      {
        roundTitle: 'Technical Deep Dive',
        focusAreas: hasWeb
          ? ['Full-stack discussion', 'Architecture', 'Project experience']
          : ['Technology stack', 'Project walkthrough'],
        whyItMatters: 'Tests hands-on experience with relevant technologies and project ownership.'
      },
      {
        roundTitle: 'Culture & Leadership Fit',
        focusAreas: ['Behavioral questions', 'Team collaboration', 'Growth mindset'],
        whyItMatters: 'Mid-size companies value cultural fit and adaptability highly.'
      }
    ]
  } else {
    // Startup typically has 2-3 rounds
    const rounds: RoundMappingItem[] = [
      {
        roundTitle: 'Practical Coding',
        focusAreas: hasWeb
          ? ['Build feature', 'Component development', 'Your stack']
          : ['Real-world problems', 'Code review'],
        whyItMatters: 'Startups need people who can ship code quickly and write production-quality code.'
      },
      {
        roundTitle: 'System & Architecture',
        focusAreas: ['Design discussion', 'Tech choices', 'Build from scratch'],
        whyItMatters: 'Evaluates your ability to make technical decisions and build from scratch.'
      }
    ]

    // Add third round for more established startups
    if (hasDSA || hasSystemDesign) {
      rounds.push({
        roundTitle: 'Founder / Team Fit',
        focusAreas: ['Culture fit', 'Ownership mindset', 'Problem-solving approach'],
        whyItMatters: 'Early-stage startups need people who align with the mission and can wear multiple hats.'
      })
    }

    return rounds
  }
}

export function getRoundIcon(round: number): string {
  const icons = ['📝', '💻', '🔧', '🤝']
  return icons[round - 1] || '⭐'
}
