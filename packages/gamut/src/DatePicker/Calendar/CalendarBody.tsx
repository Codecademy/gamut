import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as React from 'react';

import { TextButton } from '../../Button';
import { CalendarBodyProps } from './types';
import {
  getDatesWithRow,
  getMonthGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from './utils/dateGrid';
import { getWeekdayNames } from './utils/format';
import { keyHandler } from './utils/keyHandler';

const TableHeader = styled.th(
  css({
    fontSize: 14,
    fontWeight: 'base',
    color: 'text-disabled',
    textAlign: 'center',
  })
);

const DateCell = styled.td(
  css({
    padding: 0,
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
    isRangeStart: {
      borderRadiusRight: 'none',
    },
    isRangeEnd: {
      borderRadiusLeft: 'none',
    },
    isInRange: {
      bg: 'text-disabled',
      color: 'background',
      borderRadius: 'none',
      '&:hover, &:focus': {
        bg: 'secondary-hover',
        color: 'background',
      },
      '&::after': {
        bg: 'background',
      },
    },
    disabled: {
      color: 'text-disabled',
      textDecoration: 'line-through',
      '&:hover': {
        textDecoration: 'line-through',
      },
    },
  }),
  css({
    fontWeight: 'base',
    width: '32px',
  })
);

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  displayDate,
  selectedDate,
  endDate = null,
  disabledDates = [],
  onDateSelect,
  locale,
  weekStartsOn = 0,
  labelledById,
  focusedDate,
  onFocusedDateChange,
  onDisplayDateChange,
  onEscapeKeyPress,
  hasAdjacentMonthRight,
  hasAdjacentMonthLeft,
}) => {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const weeks = getMonthGrid(year, month, weekStartsOn);
  const weekdayLabels = getWeekdayNames('short', locale, weekStartsOn);
  const weekdayFullNames = getWeekdayNames('long', locale, weekStartsOn);
  const buttonRefs = useRef<Map<number, HTMLElement>>(new Map());

  const datesWithRow = useMemo(() => getDatesWithRow(weeks), [weeks]);
  const focusTarget = focusedDate ?? selectedDate;

  const isToday = useCallback(
    (date: Date | null) => date !== null && isSameDay(date, new Date()),
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
    (e: React.KeyboardEvent, date: Date) =>
      keyHandler(
        e,
        date,
        onFocusedDateChange,
        datesWithRow,
        month,
        year,
        disabledDates,
        onDateSelect,
        onEscapeKeyPress,
        onDisplayDateChange,
        hasAdjacentMonthRight,
        hasAdjacentMonthLeft
      ),
    [
      onFocusedDateChange,
      datesWithRow,
      month,
      year,
      disabledDates,
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
                  <DateCell
                    key={`empty-${rowIndex}-${colIndex}`}
                    role="gridcell"
                  />
                );
              }
              const selected =
                isSameDay(date, selectedDate) || isSameDay(date, endDate);
              const range = !!selectedDate && !!endDate;
              const inRange =
                range && isDateInRange(date, selectedDate, endDate);
              const disabled = isDateDisabled(date, disabledDates);
              const today = isToday(date);
              // this is making the selected date a differnet color bc it is focused, look into further
              const isFocused =
                focusTarget !== null && isSameDay(date, focusTarget);

              return (
                <DateCell
                  aria-selected={selected}
                  key={date.getTime()}
                  role="gridcell"
                >
                  <DateButton
                    disabled={disabled}
                    isInRange={inRange}
                    isRangeEnd={range && isSameDay(date, endDate)}
                    isRangeStart={range && isSameDay(date, selectedDate)}
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
                </DateCell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
