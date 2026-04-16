/**
 * Builds a grid of days for a calendar month using native Date and Intl.
 * Each row has 7 cells; leading/trailing cells may be null (padding from adjacent months).
 */

import type { IsoWeekday } from '../../../utils/locale';

const DAYS_PER_WEEK = 7;

/**
 * Normalize to start of day in local time for comparison.
 */
export const normalizeDate = (date: Date) => {
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
export const getWeekdayOffsetInGrid = ({
  date,
  firstWeekday,
}: {
  date: Date;
  firstWeekday: IsoWeekday;
}) => {
  const dayOfWeek = date.getDay();
  const iso = dayOfWeek === 0 ? 7 : dayOfWeek;
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
export const getMonthGrid = ({
  year,
  month,
  firstWeekday,
}: {
  year: number;
  month: number;
  firstWeekday: IsoWeekday;
}) => {
  const first = getFirstOfMonth(new Date(year, month, 1));
  const last = new Date(year, month + 1, 0);
  const firstDayOfWeek = getWeekdayOffsetInGrid({ date: first, firstWeekday });
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
 * Calendar-ordered local-midnight instants for two possibly unordered `Date` values.
 * Matches the bounds used by {@link isDateInRange} (and range selection).
 */
export const getOrderedCalendarEndpoints = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const normalizedStartDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const normalizedEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  return normalizedStartDate <= normalizedEndDate
    ? { low: normalizedStartDate, high: normalizedEndDate }
    : { low: normalizedEndDate, high: normalizedStartDate };
};

/**
 * Check if `date` is between `startDate` and `endDate` (exclusive), ignoring time.
 */
export const isDateInRange = ({
  date,
  startDate,
  endDate,
}: {
  date: Date;
  startDate: Date | null;
  endDate: Date | null;
}) => {
  if (startDate === null) return false;
  const endBound = endDate ?? startDate;
  const { low, high } = getOrderedCalendarEndpoints({
    startDate,
    endDate: endBound,
  });
  const normalizedDate = normalizeDate(date);
  return (
    normalizedDate > normalizeDate(low) && normalizedDate < normalizeDate(high)
  );
};

/**
 * Build a `shouldDisableDate` that disables each listed calendar day (time-of-day ignored).
 *
 * @example
 * ```tsx
 * <DatePicker shouldDisableDate={matchDisabledDates([new Date(2026, 3, 14)])} />
 * ```
 */
export const matchDisabledDates =
  (dates: readonly Date[] = []) =>
  (date: Date): boolean =>
    dates.some((d) => isSameDay(date, d));

/** True when `shouldDisableDate` returns true for this calendar day. */
export const isDateDisabled = ({
  date,
  shouldDisableDate,
}: {
  date: Date;
  shouldDisableDate?: (date: Date) => boolean;
}) => Boolean(shouldDisableDate?.(date));

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
export const addMonths = ({ date, n }: { date: Date; n: number }) =>
  new Date(date.getFullYear(), date.getMonth() + n, 1);

/**
 * True when `date` falls in the left visible month (`displayDate`) or, when two months are
 * shown, the following month. Used to avoid jumping the strip when the user selects a day
 * already visible, while still syncing when the selection moves off-strip (e.g. typed input).
 */
export const isDateInVisibleCalendarStrip = ({
  date,
  displayDate,
  showTwoMonths,
}: {
  date: Date;
  displayDate: Date;
  showTwoMonths: boolean;
}): boolean => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d0y = displayDate.getFullYear();
  const d0m = displayDate.getMonth();
  if (y === d0y && m === d0m) return true;
  if (showTwoMonths) {
    const second = addMonths({ date: displayDate, n: 1 });
    return y === second.getFullYear() && m === second.getMonth();
  }
  return false;
};
