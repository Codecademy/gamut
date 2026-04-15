import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as React from 'react';

import { useIsoFirstWeekday, useResolvedLocale } from '../../utils/locale';
import { CalendarBodyProps } from './types';
import {
  getDatesWithRow,
  getMonthGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from './utils/dateGrid';
import { CalendarTable, DateCell, TableHeader } from './utils/elements';
import { formatDateForAriaLabel, getWeekdayNames } from './utils/format';
import { keyHandler } from './utils/keyHandler';

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  displayDate,
  selectedDate,
  endDate = null,
  shouldDisableDate,
  onDateSelect,
  locale,
  weekStartsOn,
  labelledById,
  focusedDate,
  onFocusedDateChange,
  onDisplayDateChange,
  onEscapeKeyPress,
  hasAdjacentMonthRight,
  hasAdjacentMonthLeft,
  focusGridSync,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const firstWeekday = useIsoFirstWeekday(resolvedLocale, weekStartsOn);
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const weeks = getMonthGrid({ year, month, firstWeekday });
  const weekdayLabels = getWeekdayNames({
    format: 'short',
    locale: resolvedLocale,
    firstWeekday,
  });
  const weekdayFullNames = getWeekdayNames({
    format: 'long',
    locale: resolvedLocale,
    firstWeekday,
  });
  const buttonRefs = useRef<Map<number, HTMLElement>>(new Map());
  const tableRef = useRef<HTMLTableElement>(null);

  const datesWithRow = useMemo(() => getDatesWithRow(weeks), [weeks]);
  const focusTarget = focusedDate ?? selectedDate;

  const isToday = useCallback(
    (date: Date | null) => date !== null && isSameDay(date, new Date()),
    []
  );

  const focusButton = useCallback((date: Date | null): boolean => {
    if (date === null) return false;
    const key = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const el = buttonRefs.current.get(key);
    if (!el) return false;
    el.focus();
    return true;
  }, []);

  useEffect(() => {
    // Keep the roving tabindex / focused day aligned with `focusTarget` when it makes sense for a11y.
    if (focusTarget === null) return;

    // Standalone calendar (e.g. Storybook): always move DOM focus to the active day.
    if (!focusGridSync) {
      focusButton(focusTarget);
      return;
    }

    const inGrid = tableRef.current?.contains(document.activeElement);
    const requested = focusGridSync.gridFocusRequested;

    // Focus is already in this grid (keyboard nav): update which day is focused as `focusTarget` changes.
    if (inGrid) {
      focusButton(focusTarget);
      return;
    }

    // DatePicker opened via keyboard / ArrowDown: parent asked to move focus into the grid once.
    if (requested) {
      const success = focusButton(focusTarget);
      if (success) {
        focusGridSync.onGridFocusRequestHandled();
      }
    }
    // If !inGrid && !requested (e.g. calendar opened with the mouse): leave focus on the input — do not call focusButton.
  }, [focusTarget, focusButton, focusGridSync]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date) =>
      keyHandler({
        e,
        date,
        onFocusedDateChange,
        datesWithRow,
        month,
        year,
        shouldDisableDate,
        onDateSelect,
        onEscapeKeyPress,
        onDisplayDateChange,
        hasAdjacentMonthRight,
        hasAdjacentMonthLeft,
      }),
    [
      onFocusedDateChange,
      datesWithRow,
      month,
      year,
      shouldDisableDate,
      onDateSelect,
      onEscapeKeyPress,
      onDisplayDateChange,
      hasAdjacentMonthLeft,
      hasAdjacentMonthRight,
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
    <CalendarTable aria-labelledby={labelledById} ref={tableRef} role="grid">
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
                  // eslint-disable-next-line jsx-a11y/control-has-associated-label
                  <td
                    // fix this error
                    // eslint-disable-next-line react/no-array-index-key, jsx-a11y/control-has-associated-label
                    key={`empty-${rowIndex}-${colIndex}`}
                    role="gridcell"
                  />
                );
              }
              const selected =
                isSameDay(date, selectedDate) || isSameDay(date, endDate);
              const range = !!selectedDate && !!endDate;
              const inRange =
                range &&
                isDateInRange({
                  date,
                  start: selectedDate,
                  end: endDate,
                });
              const disabled = isDateDisabled({ date, shouldDisableDate });
              const today = isToday(date);
              // this is making the selected date a differnet color bc it is focused, look into further
              const isFocused =
                focusTarget !== null && isSameDay(date, focusTarget);

              return (
                <DateCell
                  aria-current={today ? 'date' : undefined}
                  aria-disabled={disabled}
                  aria-label={formatDateForAriaLabel({
                    date,
                    locale: resolvedLocale,
                  })}
                  aria-selected={selected || inRange}
                  isDisabled={disabled}
                  isInRange={inRange}
                  isRangeEnd={range && isSameDay(date, endDate)}
                  isRangeStart={range && isSameDay(date, selectedDate)}
                  isSelected={selected}
                  isToday={today}
                  key={date.getTime()}
                  ref={(el) => setButtonRef(date, el as HTMLElement | null)}
                  role="gridcell"
                  tabIndex={isFocused ? 0 : -1}
                  onClick={() => {
                    if (!disabled) onDateSelect(date);
                  }}
                  onFocus={() => onFocusedDateChange?.(date)}
                  onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, date)}
                >
                  {date.getDate()}
                </DateCell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </CalendarTable>
  );
};
