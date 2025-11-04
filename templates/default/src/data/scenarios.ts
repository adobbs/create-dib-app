/**
 * Data Scenarios for Prototyping
 *
 * Switch between different data states to test your UI:
 * - Empty state (new users)
 * - Normal state (typical usage)
 * - Edge cases (long names, many items)
 * - Error states (validation issues)
 */

export type Scenario = 'empty' | 'normal' | 'edge-case' | 'error';

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

export function getScenarioName(scenario: Scenario): string {
  return scenarios[scenario]?.name || 'Unknown';
}

export function getScenarioDescription(scenario: Scenario): string {
  return scenarios[scenario]?.description || '';
}
