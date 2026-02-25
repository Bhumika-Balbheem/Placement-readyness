/**
 * Test Checklist Types for Placement Readiness Platform
 * Step 8: Built-in testing framework
 */

export interface TestItem {
  id: string
  label: string
  hint: string
  checked: boolean
}

export interface TestChecklist {
  items: TestItem[]
  lastUpdated: string
}

export const DEFAULT_TEST_ITEMS: Omit<TestItem, 'checked'>[] = [
  {
    id: 'jd-required',
    label: 'JD required validation works',
    hint: 'Go to Assessments page, try clicking Analyze without entering JD. Should not proceed.',
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter <200 characters in JD textarea. Amber warning should appear below.',
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Paste a JD with known skills (e.g., "React, Node.js, Python"). Verify they appear in correct categories.',
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Analyze JD for "Google" (enterprise) vs "StartupXYZ" (startup). Round count and titles should differ.',
  },
  {
    id: 'score-deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice. Base score should be identical both times.',
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On results page, click a skill to toggle. Score should change by +/-2 immediately.',
  },
  {
    id: 'persist-after-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle some skills, refresh page. Toggles and score should remain.',
  },
  {
    id: 'history-saves-loads',
    label: 'History saves and loads correctly',
    hint: 'Create multiple analyses. Visit History page. All should appear with correct scores.',
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click "Copy 7-Day Plan" on results. Paste in notepad. Should match displayed plan.',
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open browser DevTools console. Navigate through all pages. No red errors should appear.',
  },
]

export const TEST_CHECKLIST_KEY = 'placement_test_checklist'
export const TEST_CHECKLIST_COMPLETED_KEY = 'placement_test_checklist_completed'
