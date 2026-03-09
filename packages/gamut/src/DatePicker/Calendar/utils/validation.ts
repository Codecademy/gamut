/**
 * Validation helpers for DatePicker (single-date).
 * Used to mark invalid dates as unselectable and for manual entry validation.
 */

/**
 * Check if a date is in the past (before today at start of day).
 * Useful for disabling past dates in the calendar.
 */
export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

/**
 * Check if a date is valid (finite and not NaN).
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}
