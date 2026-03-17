/**
 * Validation helpers for DatePicker (single-date).
 * Used to mark invalid dates as unselectable and for manual entry validation.
 */

/**
 * Check if a date is in the past (before today at start of day).
 * Useful for disabling past dates in the calendar.
 */
export const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate.getTime() < today.getTime();
};

/**
 * Check if a date is valid (finite and not NaN).
 */
export const isValidDate = (date: Date) => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};
