/**
 * Builds a grid of days for a calendar month using native Date and Intl.
 * Each row has 7 cells; leading/trailing cells may be null (padding from adjacent months).
 */

import type { IsoWeekday } from '../../../utils/locale';

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
 * Number of empty cells before the 1st of the month, for a grid whose first column is
 * `firstWeekday` (ISO: 1 = Monday … 7 = Sunday from `Intl.Locale#getWeekInfo`).
 */
export const getWeekdayOffsetInGrid = (
  date: Date,
  firstWeekday: IsoWeekday
) => {
  const js = date.getDay();
  const iso = js === 0 ? 7 : js;
  return (iso - firstWeekday + 14) % 7;
};

export const getFirstOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Returns an array of weeks for the given month. Each week is an array of 7 items:
 * each item is either a Date (that day) or null (padding from previous/next month).
 *
 * @param year - Full year (e.g. 2026)
 * @param month - Month 0-11 (0 = January)
 * @param firstWeekday - First day of the week for the calendar row (ISO 1–7, from `getWeekInfo().firstDay`)
 */
export const getMonthGrid = (
  year: number,
  month: number,
  firstWeekday: IsoWeekday
) => {
  const first = getFirstOfMonth(new Date(year, month, 1));
  const last = new Date(year, month + 1, 0);
  const firstDayOfWeek = getWeekdayOffsetInGrid(first, firstWeekday);
  const daysInMonth = last.getDate();

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i += 1) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
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

/** One visible day in the month grid with its row (for Home/End and keyboard nav). */
export type DateWithRow = { date: Date; rowIndex: number };

/** Flat list of dates in grid order (row-major, non-null only) with row index for Home/End */
export const getDatesWithRow = (weeks: (Date | null)[][]) => {
  const result: DateWithRow[] = [];
  weeks.forEach((week, rowIndex) => {
    week.forEach((date) => {
      if (date !== null) result.push({ date, rowIndex });
    });
  });
  return result;
};

/** Add `n` months to the given date. */
export const addMonths = (date: Date, n: number) =>
  new Date(date.getFullYear(), date.getMonth() + n, 1);
