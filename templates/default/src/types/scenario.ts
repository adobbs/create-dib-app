/**
 * Scenario type for prototyping different data states
 *
 * Use scenarios to test your UI with different data conditions:
 * - empty: New users, no data
 * - normal: Typical usage
 * - edge-case: Boundary conditions, long text, many items
 * - error: Validation errors and problem scenarios
 */
export type Scenario = 'empty' | 'normal' | 'edge-case' | 'error';
