import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as React from 'react';

import { TextButton } from '../../Button';
import { CalendarBodyProps } from './types';
import {
  clampToMonth,
  getMonthGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from './utils/dateGrid';
import { getWeekdayFullNames, getWeekdayLabels } from './utils/format';

const TableHeader = styled.th(
  css({
    fontSize: 14,
    fontWeight: 'base',
    color: 'text-disabled',
    textAlign: 'center',
  })
);

const DateButton = styled(TextButton)(
  states({
    isToday: {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 4,
        left: '50%',
        width: 4,
        height: 4,
        borderRadius: 'full',
        bg: 'hyper',
      },
    },
    isSelected: {
      bg: 'text',
      color: 'background',
      '&:hover, &:focus': {
        bg: 'secondary-hover',
        color: 'background',
      },
      '&::after': {
        bg: 'background',
      },
    },
    isInRange: {
      bg: 'text-disabled',
      color: 'background',
      borderRadius: 'none',
      '&:hover, &:focus': {
        bg: 'secondary-hover',
        color: 'background',
      },
    },
    disabled: {
      color: 'text-disabled',
      textDecoration: 'line-through',
    },
  }),
  css({
    fontWeight: 'base',
    width: '32px',
    // '&:hover, &:focus': {
    //   bg: 'background-hover',
    // },
  })
);

/** Flat list of dates in grid order (row-major, non-null only) with row index for Home/End */
function getDatesWithRow(
  weeks: (Date | null)[][]
): { date: Date; rowIndex: number }[] {
  const result: { date: Date; rowIndex: number }[] = [];
  weeks.forEach((week, rowIndex) => {
    week.forEach((date) => {
      if (date !== null) result.push({ date, rowIndex });
    });
  });
  return result;
}

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  visibleDate,
  selectedDate,
  endDate = null,
  disabledDates = [],
  onDateSelect,
  locale,
  weekStartsOn = 0,
  labelledById,
  focusedDate,
  onFocusedDateChange,
  onVisibleDateChange,
  onEscapeKeyPress,
}) => {
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const weeks = getMonthGrid(year, month, weekStartsOn);
  const weekdayLabels = getWeekdayLabels(locale, weekStartsOn);
  const weekdayFullNames = getWeekdayFullNames(locale, weekStartsOn);
  const buttonRefs = useRef<Map<number, HTMLElement>>(new Map());

  const datesWithRow = useMemo(() => getDatesWithRow(weeks), [weeks]);
  const focusTarget = focusedDate ?? selectedDate;

  const isToday = useCallback(
    (d: Date | null) => d !== null && isSameDay(d, new Date()),
    []
  );

  const focusButton = useCallback((date: Date | null) => {
    if (date === null) return;
    const key = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    buttonRefs.current.get(key)?.focus();
  }, []);

  useEffect(() => {
    if (focusTarget !== null) focusButton(focusTarget);
  }, [focusTarget, focusButton]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date) => {
      if (!onFocusedDateChange) return;
      const key = date.getTime();
      const idx = datesWithRow.findIndex(({ date: d }) => d.getTime() === key);
      if (idx < 0) return;

      const currentRow = datesWithRow[idx].rowIndex;
      const day = date.getDate();

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
            newVisibleDate = new Date(year, month - 1, 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (idx < datesWithRow.length - 1) {
            newDate = datesWithRow[idx + 1].date;
          } else {
            newDate = new Date(year, month + 1, 1);
            newVisibleDate = new Date(year, month + 1, 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          newDate = new Date(date);
          newDate.setDate(newDate.getDate() - 7);
          if (newDate.getMonth() !== month || newDate.getFullYear() !== year) {
            newVisibleDate = new Date(
              newDate.getFullYear(),
              newDate.getMonth(),
              1
            );
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 7);
          if (newDate.getMonth() !== month || newDate.getFullYear() !== year) {
            newVisibleDate = new Date(
              newDate.getFullYear(),
              newDate.getMonth(),
              1
            );
          }
          break;
        case 'Home':
          e.preventDefault();
          newDate =
            datesWithRow.find(({ rowIndex }) => rowIndex === currentRow)
              ?.date ?? date;
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
          newVisibleDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            1
          );
          break;
        case 'PageUp':
          e.preventDefault();
          if (e.shiftKey) {
            newDate = clampToMonth(year - 1, month, day);
          } else {
            newDate = clampToMonth(year, month - 1, day);
          }
          newVisibleDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            1
          );
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
    },
    [
      onFocusedDateChange,
      datesWithRow,
      month,
      year,
      disabledDates,
      onDateSelect,
      onEscapeKeyPress,
      onVisibleDateChange,
    ]
  );

  const setButtonRef = useCallback((date: Date, el: HTMLElement | null) => {
    const k = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    if (el) buttonRefs.current.set(k, el);
    else buttonRefs.current.delete(k);
  }, []);

  return (
    <table aria-labelledby={labelledById} role="grid" width="100%">
      <thead>
        <tr>
          {weekdayLabels.map((label, i) => (
            <TableHeader abbr={weekdayFullNames[i]} key={label} scope="col">
              {label}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, rowIndex) => (
          <tr key={week.join('-')}>
            {week.map((date, colIndex) => {
              if (date === null) {
                return (
                  // fix this error
                  // eslint-disable-next-line react/no-array-index-key, jsx-a11y/control-has-associated-label
                  <td key={`empty-${rowIndex}-${colIndex}`} role="gridcell" />
                );
              }
              const selected =
                isSameDay(date, selectedDate) || isSameDay(date, endDate);
              const inRange =
                !!selectedDate &&
                !!endDate &&
                isDateInRange(date, selectedDate, endDate);
              const disabled = isDateDisabled(date, disabledDates);
              const today = isToday(date);
              // this is making the selected date a differnet color bc it is focused, look into further
              const isFocused =
                focusTarget !== null && isSameDay(date, focusTarget);

              return (
                <td
                  aria-selected={selected}
                  key={date.getTime()}
                  role="gridcell"
                >
                  <DateButton
                    disabled={disabled}
                    isInRange={inRange}
                    isSelected={selected}
                    isToday={today}
                    ref={(el) => setButtonRef(date, el as HTMLElement | null)}
                    tabIndex={isFocused ? 0 : -1}
                    variant="secondary"
                    onClick={() => onDateSelect(date)}
                    onFocus={() => onFocusedDateChange?.(date)}
                    onKeyDown={(e: React.KeyboardEvent) =>
                      handleKeyDown(e, date)
                    }
                  >
                    {date.getDate()}
                  </DateButton>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
