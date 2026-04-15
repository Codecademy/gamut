import type { CalendarBodyProps } from '../types';
import { type DateWithRow, isDateDisabled } from './dateGrid';

/** Calendar grid props and callbacks used by `keyHandler`, aligned with `CalendarBodyProps`. */
export type KeyHandlerParams = Pick<
  CalendarBodyProps,
  | 'onFocusedDateChange'
  | 'onDateSelect'
  | 'onDisplayDateChange'
  | 'onEscapeKeyPress'
  | 'hasAdjacentMonthRight'
  | 'hasAdjacentMonthLeft'
  | 'disabledDates'
> & {
  e: React.KeyboardEvent;
  /** The date for the day cell that received the key event */
  date: Date;
  datesWithRow: DateWithRow[];
  month: number;
  year: number;
};

/**
 * Clamp a day to the last day of the given month (e.g. Jan 31 -> Feb 28).
 */
const clampToMonth = (year: number, month: number, day: number) => {
  const last = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, last));
};

export const keyHandler = ({
  e,
  date,
  onFocusedDateChange,
  datesWithRow,
  month,
  year,
  disabledDates = [],
  onDateSelect,
  onEscapeKeyPress,
  onDisplayDateChange,
  hasAdjacentMonthRight,
  hasAdjacentMonthLeft,
}: KeyHandlerParams) => {
  const idx = datesWithRow.findIndex(
    ({ date: dateWithRow }) => dateWithRow.getTime() === date.getTime()
  );
  if (idx < 0) return;

  const currentRow = datesWithRow[idx].rowIndex;
  const day = date.getDate();
  const hasRight = !!hasAdjacentMonthRight;
  const hasLeft = !!hasAdjacentMonthLeft;

  let newDate: Date | null = null;
  let newDisplayDate: Date | null = null;

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      if (idx > 0) {
        newDate = datesWithRow[idx - 1].date;
      } else {
        const lastDayPrevMonth = new Date(year, month, 0);
        newDate = lastDayPrevMonth;
        if (!hasLeft) {
          newDisplayDate = new Date(year, month - 1, 1);
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
          newDisplayDate = new Date(year, month + 1, 1);
        }
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 7);
      if (newDate.getMonth() !== month || newDate.getFullYear() !== year) {
        if (!hasLeft) {
          newDisplayDate = new Date(
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
          newDisplayDate = new Date(
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
      newDisplayDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
      break;
    case 'PageUp':
      e.preventDefault();
      if (e.shiftKey) {
        newDate = clampToMonth(year - 1, month, day);
      } else {
        newDate = clampToMonth(year, month - 1, day);
      }
      newDisplayDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
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
    if (newDisplayDate !== null) onDisplayDateChange?.(newDisplayDate);
  }
};
