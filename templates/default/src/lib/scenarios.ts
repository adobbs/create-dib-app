import { Scenario } from '@/types';

/**
 * Scenario metadata for prototyping toolbar
 *
 * Each scenario provides:
 * - id: The scenario identifier (matches Scenario type)
 * - name: Display name for UI
 * - description: Help text explaining the scenario
 */
export const scenarios = {
  empty: {
    id: 'empty' as Scenario,
    name: 'Empty State',
    description: 'No data, first-time user experience',
  },
  normal: {
    id: 'normal' as Scenario,
    name: 'Normal',
    description: 'Typical user with standard data',
  },
  'edge-case': {
    id: 'edge-case' as Scenario,
    name: 'Edge Cases',
    description: 'Long text, many items, boundary conditions',
  },
  error: {
    id: 'error' as Scenario,
    name: 'Error State',
    description: 'Validation errors and problem scenarios',
  },
} as const;

/**
 * Get the display name for a scenario
 */
export function getScenarioName(scenario: Scenario): string {
  return scenarios[scenario]?.name || 'Unknown';
}

/**
 * Get the description for a scenario
 */
export function getScenarioDescription(scenario: Scenario): string {
  return scenarios[scenario]?.description || '';
}
