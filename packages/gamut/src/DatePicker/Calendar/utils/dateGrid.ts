/**
 * Builds a grid of days for a calendar month using native Date and Intl.
 * Each row has 7 cells; leading/trailing cells may be null (padding from adjacent months).
 */

const DAYS_PER_WEEK = 7;

/**
 * Normalize to start of day in local time for comparison.
 */
const normalizeDate = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
};

/**
 * Get the weekday for a date (0 = Sunday, 6 = Saturday).
 * Optionally use weekStartsOn to compute "offset" for display (e.g. Monday = 0).
 */
export const getDayOfWeek = (date: Date, weekStartsOn: 0 | 1 = 0) => {
  const sundayBased = date.getDay();
  if (weekStartsOn === 0) return sundayBased;
  return (sundayBased + 6) % 7; // Monday = 0
};

/**
 * Returns an array of weeks for the given month. Each week is an array of 7 items:
 * each item is either a Date (that day) or null (padding from previous/next month).
 *
 * @param year - Full year (e.g. 2026)
 * @param month - Month 0-11 (0 = January)
 * @param weekStartsOn - 0 = Sunday, 1 = Monday
 */
export const getMonthGrid = (
  year: number,
  month: number,
  weekStartsOn: 0 | 1 = 0
) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const firstDayOfWeek = getDayOfWeek(first, weekStartsOn);
  const daysInMonth = last.getDate();

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // Pad start of first week with nulls
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // fix these
  // eslint-disable-next-line no-plusplus
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
};

/**
 * Check if two dates are the same calendar day (ignoring time).
 */
export const isSameDay = (a: Date | null, b: Date | null) => {
  if (a === null || b === null) return false;
  return normalizeDate(a) === normalizeDate(b);
};

/**
 * Check if `date` is between `start` and `end` (exclusive), ignoring time.
 */
export const isDateInRange = (
  date: Date,
  start: Date | null,
  end: Date | null
) => {
  if (start === null) return false;
  const normalizedDateTime = normalizeDate(date);
  const normalizedStartDateTime = normalizeDate(start);
  const normalizedEndDateTime =
    end !== null ? normalizeDate(end) : normalizedStartDateTime;
  const low = Math.min(normalizedStartDateTime, normalizedEndDateTime);
  const high = Math.max(normalizedStartDateTime, normalizedEndDateTime);
  return normalizedDateTime > low && normalizedDateTime < high;
};

/**
 * Check if `date` is in the `disabledDates` list (by calendar day).
 */
export const isDateDisabled = (date: Date, disabledDates: Date[] = []) => {
  return disabledDates.some((d) => isSameDay(date, d));
};
