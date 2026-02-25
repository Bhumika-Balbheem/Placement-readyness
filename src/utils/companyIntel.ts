import { CompanyIntel, CompanySize } from '@/types/analysis'

// Known enterprise companies
const enterpriseCompanies = [
  'amazon', 'microsoft', 'google', 'meta', 'facebook', 'apple', 'netflix',
  'oracle', 'ibm', 'accenture', 'tcs', 'infosys', 'wipro', 'cognizant',
  'hcl', 'tech mahindra', 'capgemini', 'deloitte', 'ey', 'kpmg', 'pwc',
  'intel', 'qualcomm', 'cisco', 'salesforce', 'adobe', 'vmware',
  'sap', 'samsung', 'lg', 'sony', 'toyota', 'honda', 'bmw', 'mercedes',
  'jpmorgan', 'goldman sachs', 'morgan stanley', 'bank of america',
  'wells fargo', 'citigroup', 'hsbc', 'barclays', 'deutsche bank'
]

// Known mid-size companies (examples)
const midSizeCompanies = [
  'zoho', 'freshworks', 'postman', 'razorpay', 'paytm', 'swiggy',
  'zomato', 'ola', 'uber india', 'flipkart', 'myntra', 'phonepe',
  'byju\'s', 'unacademy', 'vedantu', 'cred', 'groww', 'zerodha',
  'hashedin', 'thoughtworks', 'nagarro', 'to the new', 'srijan'
]

// Industry keywords for inference
const industryKeywords: Record<string, string[]> = {
  'Finance & Banking': ['bank', 'finance', 'fintech', 'payment', 'trading', 'investment', 'insurance'],
  'Healthcare & Pharma': ['health', 'medical', 'pharma', 'hospital', 'clinic', 'biotech'],
  'E-commerce & Retail': ['ecommerce', 'retail', 'shopping', 'marketplace', 'delivery'],
  'Education & EdTech': ['education', 'edtech', 'learning', 'training', 'academy', 'university'],
  'Gaming & Entertainment': ['game', 'gaming', 'entertainment', 'media', 'streaming'],
  'Automotive': ['automotive', 'vehicle', 'car', 'auto', 'mobility'],
  'Consulting & Services': ['consulting', 'services', 'solutions', 'outsourcing']
}

export function generateCompanyIntel(companyName: string): CompanyIntel | null {
  if (!companyName || companyName.trim().length === 0) {
    return null
  }

  const name = companyName.trim()
  const nameLower = name.toLowerCase()

  // Determine company size
  let size: CompanySize = 'startup'
  let sizeLabel = 'Startup (<200 employees)'

  if (enterpriseCompanies.some(c => nameLower.includes(c))) {
    size = 'enterprise'
    sizeLabel = 'Enterprise (2000+ employees)'
  } else if (midSizeCompanies.some(c => nameLower.includes(c))) {
    size = 'mid-size'
    sizeLabel = 'Mid-size (200–2000 employees)'
  }

  // Infer industry from company name keywords
  let industry = 'Technology Services'
  
  for (const [indName, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(kw => nameLower.includes(kw))) {
      industry = indName
      break
    }
  }

  // Additional industry inference based on known companies
  if (['amazon', 'flipkart', 'myntra', 'swiggy', 'zomato'].some(c => nameLower.includes(c))) {
    industry = 'E-commerce & Retail'
  } else if (['google', 'microsoft', 'meta', 'facebook', 'apple', 'netflix'].some(c => nameLower.includes(c))) {
    industry = 'Technology & Software'
  } else if (['tcs', 'infosys', 'wipro', 'cognizant', 'hcl', 'accenture'].some(c => nameLower.includes(c))) {
    industry = 'IT Consulting & Services'
  } else if (['jpmorgan', 'goldman', 'morgan stanley', 'bank of america', 'wells fargo'].some(c => nameLower.includes(c))) {
    industry = 'Finance & Banking'
  }

  // Determine hiring focus based on company size
  let hiringFocus = ''
  if (size === 'enterprise') {
    hiringFocus = 'Structured DSA + Core Fundamentals. Expect rigorous algorithmic rounds with emphasis on time/space complexity, system design at scale, and deep computer science fundamentals.'
  } else if (size === 'mid-size') {
    hiringFocus = 'Balanced approach: DSA fundamentals + practical problem solving. Focus on building scalable features and working with modern tech stacks.'
  } else {
    hiringFocus = 'Practical problem solving + Stack depth. Emphasis on getting things done, end-to-end ownership, and deep expertise in relevant technologies.'
  }

  return {
    name,
    industry,
    size,
    sizeLabel,
    hiringFocus
  }
}

export function getSizeBadgeColor(size: CompanySize): string {
  switch (size) {
    case 'enterprise':
      return 'bg-purple-100 text-purple-700 border-purple-300'
    case 'mid-size':
      return 'bg-blue-100 text-blue-700 border-blue-300'
    case 'startup':
      return 'bg-green-100 text-green-700 border-green-300'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}
