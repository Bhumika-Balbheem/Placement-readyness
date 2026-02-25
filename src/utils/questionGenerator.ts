import { ExtractedSkills } from '@/types/analysis'

export function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = []

  // Core CS Questions
  if (skills.coreCS.includes('DSA')) {
    questions.push(
      'How would you optimize search in a sorted array? Compare linear vs binary search.',
      'Explain the time and space complexity of merge sort and quick sort.',
      'When would you use a hash table vs a balanced BST?',
      'How do you detect a cycle in a linked list?',
      'Explain dynamic programming with a real example.'
    )
  }

  if (skills.coreCS.includes('OOP')) {
    questions.push(
      'Explain the four pillars of OOP with examples.',
      'What is the difference between abstraction and encapsulation?',
      'When would you use inheritance vs composition?',
      'Explain the SOLID principles and why they matter.'
    )
  }

  if (skills.coreCS.includes('DBMS')) {
    questions.push(
      'Explain database normalization and its various forms.',
      'What is indexing and when does it help vs hurt performance?',
      'Explain ACID properties and why they are important.',
      'Compare SQL vs NoSQL databases. When would you use each?'
    )
  }

  if (skills.coreCS.includes('OS')) {
    questions.push(
      'Explain the difference between processes and threads.',
      'What is virtual memory and how does it work?',
      'Explain deadlock and how to prevent it.',
      'Compare different CPU scheduling algorithms.'
    )
  }

  if (skills.coreCS.includes('Networks')) {
    questions.push(
      'Explain the OSI model and its layers.',
      'What is the difference between TCP and UDP?',
      'How does HTTPS work? Explain the handshake process.',
      'What is DNS and how does it resolve domain names?'
    )
  }

  // Language-specific Questions
  if (skills.languages.includes('Java')) {
    questions.push(
      'Explain the Java memory model and garbage collection.',
      'What is the difference between String, StringBuilder, and StringBuffer?',
      'Explain Java generics and type erasure.',
      'What are the differences between abstract classes and interfaces?'
    )
  }

  if (skills.languages.includes('Python')) {
    questions.push(
      'Explain Python decorators with examples.',
      'What are generators and how do they differ from iterators?',
      'Explain the GIL and its impact on multithreading.',
      'What is the difference between lists and tuples?'
    )
  }

  if (skills.languages.includes('JavaScript') || skills.languages.includes('TypeScript')) {
    questions.push(
      'Explain closures in JavaScript with an example.',
      'What is the event loop and how does it work?',
      'Explain the difference between var, let, and const.',
      'What are promises and how do they differ from async/await?'
    )
  }

  if (skills.languages.includes('C++')) {
    questions.push(
      'Explain pointers and references in C++.',
      'What is the difference between stack and heap memory?',
      'Explain virtual functions and polymorphism.',
      'What are smart pointers and why are they useful?'
    )
  }

  // Web Technologies
  if (skills.web.includes('React')) {
    questions.push(
      'Explain React state management options (useState, useReducer, Context, Redux).',
      'What is the virtual DOM and how does React use it?',
      'Explain useEffect and its dependency array.',
      'What are React hooks and what problems do they solve?'
    )
  }

  if (skills.web.includes('Node.js')) {
    questions.push(
      'Explain the Node.js event-driven architecture.',
      'What is the difference between blocking and non-blocking I/O?',
      'How does the Node.js module system work?',
      'Explain clustering in Node.js and its benefits.'
    )
  }

  if (skills.web.includes('REST') || skills.web.includes('GraphQL')) {
    questions.push(
      'Design a RESTful API for a blogging platform.',
      'What are the differences between REST and GraphQL?',
      'Explain HTTP methods and their appropriate use cases.',
      'How would you version your API?'
    )
  }

  // Data Technologies
  if (skills.data.includes('SQL')) {
    questions.push(
      'Write a query to find the second highest salary.',
      'Explain JOINs and their different types with examples.',
      'What are window functions and when would you use them?',
      'How would you optimize a slow-running query?'
    )
  }

  if (skills.data.includes('MongoDB')) {
    questions.push(
      'Explain the document model in MongoDB.',
      'When would you choose MongoDB over a relational database?',
      'Explain sharding and replication in MongoDB.',
      'How do you design schemas for NoSQL databases?'
    )
  }

  if (skills.data.includes('Redis')) {
    questions.push(
      'What are the common use cases for Redis?',
      'Explain Redis data structures and their applications.',
      'How would you handle cache invalidation?',
      'What is the difference between caching and session storage?'
    )
  }

  // Cloud/DevOps
  if (skills.cloud.includes('AWS') || skills.cloud.includes('Azure') || skills.cloud.includes('GCP')) {
    questions.push(
      'Explain the benefits of cloud computing over on-premise.',
      'What is auto-scaling and how does it work?',
      'Explain the difference between IaaS, PaaS, and SaaS.',
      'How would you design a highly available architecture?'
    )
  }

  if (skills.cloud.includes('Docker')) {
    questions.push(
      'What is containerization and how does Docker work?',
      'Explain the difference between images and containers.',
      'What is a Dockerfile and what are its key instructions?',
      'How do you manage multi-container applications?'
    )
  }

  if (skills.cloud.includes('Kubernetes')) {
    questions.push(
      'Explain Kubernetes architecture and its components.',
      'What are pods, deployments, and services?',
      'How does Kubernetes handle scaling?',
      'Explain ConfigMaps and Secrets in Kubernetes.'
    )
  }

  if (skills.cloud.includes('CI/CD')) {
    questions.push(
      'What is CI/CD and why is it important?',
      'Explain the difference between continuous integration and continuous deployment.',
      'How would you set up a CI/CD pipeline?',
      'What are common CI/CD tools and their use cases?'
    )
  }

  // Testing
  if (skills.testing.length > 0) {
    questions.push(
      'Explain the difference between unit, integration, and end-to-end testing.',
      'What is test-driven development (TDD)?',
      'How do you mock dependencies in tests?',
      'What are the qualities of a good test suite?'
    )
  }

  // General questions if no specific skills detected
  if (questions.length === 0) {
    questions.push(
      'Tell me about yourself and your technical background.',
      'What projects have you worked on? Explain your role.',
      'Why do you want to work at our company?',
      'Where do you see yourself in 5 years?',
      'What are your strengths and weaknesses?',
      'Describe a challenging problem you solved.',
      'How do you stay updated with new technologies?',
      'Explain your approach to learning a new technology.',
      'How do you handle conflicts in a team?',
      'What questions do you have for us?'
    )
  }

  // Return up to 10 questions
  return questions.slice(0, 10)
}
