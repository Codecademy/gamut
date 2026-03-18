import { isDateDisabled } from './dateGrid';

/**
 * Clamp a day to the last day of the given month (e.g. Jan 31 -> Feb 28).
 */
export const clampToMonth = (year: number, month: number, day: number) => {
  const last = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, last));
};

/** Flat list of dates in grid order (row-major, non-null only) with row index for Home/End */
export const getDatesWithRow = (weeks: (Date | null)[][]) => {
  const result: { date: Date; rowIndex: number }[] = [];
  weeks.forEach((week, rowIndex) => {
    week.forEach((date) => {
      if (date !== null) result.push({ date, rowIndex });
    });
  });
  return result;
};

export const keyHandler = (
  e: React.KeyboardEvent,
  date: Date,
  onFocusedDateChange: (date: Date | null) => void,
  datesWithRow: { date: Date; rowIndex: number }[],
  month: number,
  year: number,
  disabledDates: Date[],
  onDateSelect: (date: Date) => void,
  onEscapeKeyPress?: () => void,
  onVisibleDateChange?: (newDate: Date) => void,
  /** When true, adjacent month to the right is visible; don't change visible date when moving focus there. */
  hasAdjacentMonthRight?: boolean,
  /** When true, adjacent month to the left is visible; don't change visible date when moving focus there. */
  hasAdjacentMonthLeft?: boolean
) => {
  const idx = datesWithRow.findIndex(
    ({ date: dateWithRow }) => dateWithRow.getTime() === date.getTime()
  );
  if (idx < 0) return;

  const currentRow = datesWithRow[idx].rowIndex;
  const day = date.getDate();
  const hasRight = !!hasAdjacentMonthRight;
  const hasLeft = !!hasAdjacentMonthLeft;

  let newDate: Date | null = null;
  let newVisibleDate: Date | null = null;

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      if (idx > 0) {
        newDate = datesWithRow[idx - 1].date;
      } else {
        const lastDayPrevMonth = new Date(year, month, 0);
        newDate = lastDayPrevMonth;
        if (!hasLeft) {
          newVisibleDate = new Date(year, month - 1, 1);
        }
      }
      break;
    case 'ArrowRight':
      e.preventDefault();
      if (idx < datesWithRow.length - 1) {
        newDate = datesWithRow[idx + 1].date;
      } else {
        newDate = new Date(year, month + 1, 1);
        if (!hasRight) {
          newVisibleDate = new Date(year, month + 1, 1);
        }
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 7);
      if (newDate.getMonth() !== month || newDate.getFullYear() !== year) {
        if (!hasLeft) {
          newVisibleDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            1
          );
        }
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 7);
      if (newDate.getMonth() !== month || newDate.getFullYear() !== year) {
        if (!hasRight) {
          newVisibleDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            1
          );
        }
      }
      break;
    case 'Home':
      e.preventDefault();
      newDate =
        datesWithRow.find(({ rowIndex }) => rowIndex === currentRow)?.date ??
        date;
      break;
    case 'End':
      e.preventDefault();
      newDate =
        [...datesWithRow]
          .reverse()
          .find(({ rowIndex }) => rowIndex === currentRow)?.date ?? date;
      break;
    case 'PageDown':
      e.preventDefault();
      if (e.shiftKey) {
        newDate = clampToMonth(year + 1, month, day);
      } else {
        newDate = clampToMonth(year, month + 1, day);
      }
      newVisibleDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      break;
    case 'PageUp':
      e.preventDefault();
      if (e.shiftKey) {
        newDate = clampToMonth(year - 1, month, day);
      } else {
        newDate = clampToMonth(year, month - 1, day);
      }
      newVisibleDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (!isDateDisabled(date, disabledDates)) onDateSelect(date);
      return;
    case 'Escape':
      e.preventDefault();
      onEscapeKeyPress?.();
      return;
    default:
      return;
  }

  if (newDate !== null) {
    onFocusedDateChange(newDate);
    if (newVisibleDate !== null) onVisibleDateChange?.(newVisibleDate);
  }
};
