/**
 * Test Checklist Storage Utilities
 * Manages persistence of test checklist state
 */

import {
  TestChecklist,
  TestItem,
  DEFAULT_TEST_ITEMS,
  TEST_CHECKLIST_KEY,
  TEST_CHECKLIST_COMPLETED_KEY,
} from '@/types/testChecklist'

/**
 * Checks if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

/**
 * Initializes test checklist with all items unchecked
 */
function initializeChecklist(): TestChecklist {
  return {
    items: DEFAULT_TEST_ITEMS.map(item => ({
      ...item,
      checked: false,
    })),
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Gets the current test checklist from localStorage
 * Creates default if not exists
 */
export function getTestChecklist(): TestChecklist {
  if (!isLocalStorageAvailable()) {
    return initializeChecklist()
  }

  const stored = localStorage.getItem(TEST_CHECKLIST_KEY)
  if (!stored) {
    const defaultChecklist = initializeChecklist()
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(defaultChecklist))
    return defaultChecklist
  }

  try {
    const parsed = JSON.parse(stored) as TestChecklist
    // Validate structure
    if (!parsed.items || !Array.isArray(parsed.items) || parsed.items.length !== 10) {
      const defaultChecklist = initializeChecklist()
      localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(defaultChecklist))
      return defaultChecklist
    }
    return parsed
  } catch {
    const defaultChecklist = initializeChecklist()
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(defaultChecklist))
    return defaultChecklist
  }
}

/**
 * Updates a single test item's checked state
 */
export function updateTestItem(itemId: string, checked: boolean): void {
  if (!isLocalStorageAvailable()) return

  const checklist = getTestChecklist()
  const itemIndex = checklist.items.findIndex(item => item.id === itemId)
  
  if (itemIndex >= 0) {
    checklist.items[itemIndex].checked = checked
    checklist.lastUpdated = new Date().toISOString()
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(checklist))
    
    // Update completion status
    updateCompletionStatus()
  }
}

/**
 * Gets count of passed tests
 */
export function getPassedTestCount(): number {
  const checklist = getTestChecklist()
  return checklist.items.filter(item => item.checked).length
}

/**
 * Gets total test count
 */
export function getTotalTestCount(): number {
  return DEFAULT_TEST_ITEMS.length
}

/**
 * Checks if all tests are passed
 */
export function areAllTestsPassed(): boolean {
  return getPassedTestCount() === getTotalTestCount()
}

/**
 * Updates the completion status flag
 */
function updateCompletionStatus(): void {
  if (!isLocalStorageAvailable()) return
  
  const allPassed = areAllTestsPassed()
  localStorage.setItem(TEST_CHECKLIST_COMPLETED_KEY, JSON.stringify(allPassed))
}

/**
 * Checks if checklist is marked as completed
 */
export function isChecklistCompleted(): boolean {
  if (!isLocalStorageAvailable()) return false
  
  const stored = localStorage.getItem(TEST_CHECKLIST_COMPLETED_KEY)
  if (!stored) return false
  
  try {
    return JSON.parse(stored) === true
  } catch {
    return false
  }
}

/**
 * Resets all test items to unchecked
 */
export function resetTestChecklist(): void {
  if (!isLocalStorageAvailable()) return

  const defaultChecklist = initializeChecklist()
  localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(defaultChecklist))
  localStorage.setItem(TEST_CHECKLIST_COMPLETED_KEY, JSON.stringify(false))
}

/**
 * Toggles a test item's checked state
 * Returns the new checked state
 */
export function toggleTestItem(itemId: string): boolean {
  if (!isLocalStorageAvailable()) return false

  const checklist = getTestChecklist()
  const item = checklist.items.find(item => item.id === itemId)
  
  if (item) {
    const newState = !item.checked
    updateTestItem(itemId, newState)
    return newState
  }
  
  return false
}
