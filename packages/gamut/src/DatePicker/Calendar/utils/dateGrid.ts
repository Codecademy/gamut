/**
 * Builds a grid of days for a calendar month using native Date and Intl.
 * Each row has 7 cells; leading/trailing cells may be null (padding from adjacent months).
 */

const DAYS_PER_WEEK = 7;

/**
 * Normalize to start of day in local time for comparison.
 */
function toDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Get the weekday for a date (0 = Sunday, 6 = Saturday).
 * Optionally use weekStartsOn to compute "offset" for display (e.g. Monday = 0).
 */
export function getDayOfWeek(date: Date, weekStartsOn: 0 | 1 = 0): number {
  const sundayBased = date.getDay();
  if (weekStartsOn === 0) return sundayBased;
  return (sundayBased + 6) % 7; // Monday = 0
}

/**
 * Returns an array of weeks for the given month. Each week is an array of 7 items:
 * each item is either a Date (that day) or null (padding from previous/next month).
 *
 * @param year - Full year (e.g. 2026)
 * @param month - Month 0-11 (0 = January)
 * @param weekStartsOn - 0 = Sunday, 1 = Monday
 */
export function getMonthGrid(
  year: number,
  month: number,
  weekStartsOn: 0 | 1 = 0
): (Date | null)[][] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const firstDayOfWeek = getDayOfWeek(first, weekStartsOn);
  const daysInMonth = last.getDate();

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // Pad start of first week with nulls
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, month, day));
    if (currentWeek.length === DAYS_PER_WEEK) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Pad end of last week with nulls
  if (currentWeek.length > 0) {
    while (currentWeek.length < DAYS_PER_WEEK) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Check if two dates are the same calendar day (ignoring time).
 */
export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) return false;
  return toDateOnly(a).getTime() === toDateOnly(b).getTime();
}

/**
 * Check if `date` is between `start` and `end` (inclusive), ignoring time.
 */
export function isDateInRange(
  date: Date,
  start: Date | null,
  end: Date | null
): boolean {
  if (start === null) return false;
  const d = toDateOnly(date).getTime();
  const s = toDateOnly(start).getTime();
  const e = end !== null ? toDateOnly(end).getTime() : s;
  const low = Math.min(s, e);
  const high = Math.max(s, e);
  return d >= low && d <= high;
}

/**
 * Check if `date` is in the `disabledDates` list (by calendar day).
 */
export function isDateDisabled(
  date: Date,
  disabledDates: Date[] = []
): boolean {
  return disabledDates.some((d) => isSameDay(date, d));
}
