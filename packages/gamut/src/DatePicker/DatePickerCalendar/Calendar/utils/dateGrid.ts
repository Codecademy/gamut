import type { IsoWeekday } from '../../../utils/locale';

const DAYS_PER_WEEK = 7;

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

export const isSameDay = (a: Date | null, b: Date | null) => {
  if (a === null || b === null) return false;
  return normalizeDate(a) === normalizeDate(b);
};

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
 * Returns a `disableDate` callback: for each calendar `date`, `true` if it’s the same day as
 * any in `dates`
 *
 * @example
 * ```tsx
 * <DatePicker
 *   mode="single"
 *   selectedDate={null}
 *   onSelected={() => {}}
 *   disableDate={matchDisabledDates([new Date(2026, 3, 14)])}
 * />
 * ```
 */
export const matchDisabledDates =
  (dates: readonly Date[] = []) =>
  (date: Date): boolean =>
    dates.some((d) => isSameDay(date, d));

export const isDateDisabled = ({
  date,
  disableDate,
}: {
  date: Date;
  disableDate?: (date: Date) => boolean;
}) => Boolean(disableDate?.(date));

export type DateWithRow = { date: Date; rowIndex: number };

export const getDatesWithRow = (weeks: (Date | null)[][]) => {
  const result: DateWithRow[] = [];
  weeks.forEach((week, rowIndex) => {
    week.forEach((date) => {
      if (date !== null) result.push({ date, rowIndex });
    });
  });
  return result;
};

export const addMonths = ({ date, n }: { date: Date; n: number }) =>
  new Date(date.getFullYear(), date.getMonth() + n, 1);

export const isDateWithinVisibleMonths = ({
  date,
  startOfLeftVisibleMonth,
  showSecondMonth,
}: {
  date: Date;
  /** First day of the month rendered in the left calendar column (`displayDate`). */
  startOfLeftVisibleMonth: Date;
  showSecondMonth: boolean;
}) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const leftYear = startOfLeftVisibleMonth.getFullYear();
  const leftMonth = startOfLeftVisibleMonth.getMonth();
  if (year === leftYear && month === leftMonth) return true;
  if (showSecondMonth) {
    const rightMonthStart = addMonths({ date: startOfLeftVisibleMonth, n: 1 });
    const rightYear = rightMonthStart.getFullYear();
    const rightMonth = rightMonthStart.getMonth();
    return year === rightYear && month === rightMonth;
  }
  return false;
};
