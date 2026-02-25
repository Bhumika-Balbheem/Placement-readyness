import { RoundMapping, CompanySize, ExtractedSkills } from '@/types/analysis'

export function generateRoundMapping(
  companySize: CompanySize,
  skills: ExtractedSkills
): RoundMapping[] {
  const hasDSA = skills.coreCS.includes('DSA')
  const hasWeb = skills.web.length > 0
  const hasSystemDesign = skills.coreCS.includes('System Design') || skills.cloudDevOps.length > 0

  if (companySize === 'enterprise') {
    // Enterprise typically has 4 rounds
    return [
      {
        round: 1,
        title: 'Online Assessment',
        description: 'DSA problems + Aptitude tests on HackerRank/Codility platform',
        whyItMatters: 'Enterprise companies use this to filter candidates at scale. Focus on speed and accuracy.'
      },
      {
        round: 2,
        title: 'Technical Interview I',
        description: hasDSA 
          ? 'Deep DSA discussion: arrays, trees, graphs, dynamic programming'
          : 'Core CS fundamentals: OOP, DBMS, OS concepts',
        whyItMatters: 'Tests your problem-solving approach and CS fundamentals depth.'
      },
      {
        round: 3,
        title: 'Technical Interview II',
        description: hasSystemDesign
          ? 'System design + Project deep dive + Low-level design'
          : 'Project discussion + Coding + Technology stack questions',
        whyItMatters: 'Evaluates your ability to design scalable systems and technical ownership.'
      },
      {
        round: 4,
        title: 'Managerial / HR Round',
        description: 'Behavioral questions, culture fit, compensation discussion',
        whyItMatters: 'Assesses cultural alignment, communication skills, and long-term fit.'
      }
    ]
  } else if (companySize === 'mid-size') {
    // Mid-size typically has 3 rounds
    return [
      {
        round: 1,
        title: 'Technical Screening',
        description: hasDSA
          ? 'DSA + Coding problems + Basic system design'
          : 'Coding + Core CS + Practical problem solving',
        whyItMatters: 'Mid-size companies need developers who can code efficiently and understand systems.'
      },
      {
        round: 2,
        title: 'Technical Deep Dive',
        description: hasWeb
          ? 'Full-stack discussion + Architecture + Project experience'
          : 'Technology stack deep dive + Project walkthrough',
        whyItMatters: 'Tests hands-on experience with relevant technologies and project ownership.'
      },
      {
        round: 3,
        title: 'Culture & Leadership Fit',
        description: 'Behavioral questions, team collaboration, growth mindset',
        whyItMatters: 'Mid-size companies value cultural fit and adaptability highly.'
      }
    ]
  } else {
    // Startup typically has 2-3 rounds
    const rounds: RoundMapping[] = [
      {
        round: 1,
        title: 'Practical Coding',
        description: hasWeb
          ? 'Build a small feature or component in your stack'
          : 'Solve real-world problems + Code review discussion',
        whyItMatters: 'Startups need people who can ship code quickly and write production-quality code.'
      },
      {
        round: 2,
        title: 'System & Architecture',
        description: 'Design discussion + Tech choices + How you\'d build X',
        whyItMatters: 'Evaluates your ability to make technical decisions and build from scratch.'
      }
    ]

    // Add third round for more established startups
    if (hasDSA || hasSystemDesign) {
      rounds.push({
        round: 3,
        title: 'Founder / Team Fit',
        description: 'Culture fit, ownership mindset, problem-solving approach',
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
