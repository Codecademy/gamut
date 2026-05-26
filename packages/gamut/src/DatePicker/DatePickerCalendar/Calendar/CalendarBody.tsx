import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import * as React from 'react';

import { useIsoFirstWeekday, useResolvedLocale } from '../../utils/locale';
import { CalendarBodyProps } from './types';
import {
  getDatesWithRow,
  getMonthGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
  normalizeDate,
} from './utils/dateGrid';
import { CalendarTable, DateCell, TableHeader } from './utils/elements';
import { formatDateForAriaLabel, getWeekdayNames } from './utils/format';
import { keyHandler } from './utils/keyHandler';

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  displayDate,
  selectedDate,
  endDate = null,
  disableDate,
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
  pauseGridRoving,
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
    const key = normalizeDate(date);
    const el = buttonRefs.current.get(key);
    if (!el) return false;
    el.focus();
    return true;
  }, []);

  useLayoutEffect(() => {
    if (focusTarget === null) return;

    if (!focusGridSync) {
      focusButton(focusTarget);
      return;
    }

    const activeEl = document.activeElement;
    const inThisGrid = tableRef.current?.contains(activeEl) ?? false;
    const containerEl = focusGridSync.calendarContainerRef.current;
    const focusInCalendarContainer = containerEl?.contains(activeEl) ?? false;
    const requested = focusGridSync.gridFocusRequested;
    const focusOnNavChevron =
      activeEl instanceof Element &&
      activeEl.closest('[data-calendar-month-nav]') !== null;

    if (!requested && (pauseGridRoving || focusOnNavChevron)) {
      return;
    }

    // Month navigation unmounts the active cell; focus often lands on <body>, the dialog shell,
    // or another non-grid node — not inside the container, so we must still sync.
    const focusLostFromCellUnmount =
      activeEl === document.body ||
      activeEl === document.documentElement ||
      (activeEl instanceof HTMLElement &&
        containerEl?.contains(activeEl) === false &&
        activeEl.contains(containerEl));

    // Sync DOM focus when: navigating inside this table; first focus from input (keyboard open);
    // focus is in the multi-month strip (cross-grid arrows); or focus was lost after the grid updated.
    // Do not pull focus from the input when the user opened with the mouse and never entered the surface.
    const shouldSyncFocus =
      inThisGrid ||
      requested ||
      focusInCalendarContainer ||
      (focusLostFromCellUnmount && containerEl !== null);

    if (!shouldSyncFocus) return;

    const finish = (success: boolean) => {
      if (success && requested) {
        focusGridSync.onGridFocusRequestHandled();
      }
    };

    let success = focusButton(focusTarget);
    if (success) {
      finish(true);
      return;
    }

    // New cells may not have refs until after this layout pass (e.g. display month just changed).
    if (shouldSyncFocus) {
      requestAnimationFrame(() => {
        success = focusButton(focusTarget);
        if (success) finish(true);
      });
    }
  }, [focusTarget, focusButton, focusGridSync, year, month, pauseGridRoving]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date) =>
      keyHandler({
        e,
        date,
        onFocusedDateChange,
        datesWithRow,
        month,
        year,
        disableDate,
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
      disableDate,
      onDateSelect,
      onEscapeKeyPress,
      onDisplayDateChange,
      hasAdjacentMonthLeft,
      hasAdjacentMonthRight,
    ]
  );

  const setButtonRef = useCallback((date: Date, el: HTMLElement | null) => {
    const normalizedDateTime = normalizeDate(date);
    if (el) buttonRefs.current.set(normalizedDateTime, el);
    else buttonRefs.current.delete(normalizedDateTime);
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
                  // eslint-disable-next-line jsx-a11y/control-has-associated-label -- this is a false positive
                  <td
                    // eslint-disable-next-line react/no-array-index-key -- padding slots have no date; position in grid is the stable id
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
                  startDate: selectedDate,
                  endDate,
                });
              const disabled = isDateDisabled({ date, disableDate });
              const today = isToday(date);
              const isFocused =
                focusTarget !== null && isSameDay(date, focusTarget);
              const rovingTabIndex = pauseGridRoving ? -1 : isFocused ? 0 : -1;

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
                  tabIndex={rovingTabIndex}
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
