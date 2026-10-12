/**
 * Valence UI Core Types
 */

/**
 * Common Sizes used across components
 */
export type ValenceSize = 'sm' | 'md' | 'lg';

/**
 * Semantic Severities for alerts, toasts, and feedback
 */
export type ValenceSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'primary';

/**
 * Visual Variants for buttons and containers
 */
export type ValenceColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Positioning for overlays and sidebars
 */
export type ValencePosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Common state interfaces
 */
export interface ValenceChangeEvent<T = any> {
  value: T;
  originalEvent?: Event;
}

/**
 * Constants for internal use
 */
export const VALENCE_DEFAULTS = {
  ripple: true,
  toastLife: 3000,
  position: 'top' as ValencePosition,
  size: 'md' as ValenceSize
};
