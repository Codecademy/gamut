import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import * as React from 'react';

import { CalendarBodyProps } from './types';
import {
  getMonthGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from './utils/dateGrid';
import { getWeekdayFullNames, getWeekdayLabels } from './utils/format';
import { TextButton } from '../../Button';

const DateButton = styled(TextButton)(
  states({
    isToday: {
      bg: 'navy-200',
    },
    isSelected: {
      color: 'background',
      bg: 'text',
      // '&:hover': { bg: 'shadow-secondary' },
    },
    isInRange: {
      bg: 'border-secondary',
    },
  })
);

export const CalendarBody: React.FC<CalendarBodyProps> = ({
  visibleDate,
  selectedDate,
  endDate = null,
  disabledDates = [],
  onDateSelect,
  locale,
  weekStartsOn = 0,
  labelledById,
}) => {
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const weeks = getMonthGrid(year, month, weekStartsOn);
  const weekdayLabels = getWeekdayLabels(locale, weekStartsOn);
  const weekdayFullNames = getWeekdayFullNames(locale, weekStartsOn);

  const isToday = useCallback(
    (d: Date | null) => d !== null && isSameDay(d, new Date()),
    []
  );

  return (
    <table aria-labelledby={labelledById} role="grid" width="100%">
      <thead>
        <tr>
          {weekdayLabels.map((label, i) => (
            <th abbr={weekdayFullNames[i]} key={label} scope="col">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, rowIndex) => (
          <tr key={rowIndex} role="row">
            {week.map((date, colIndex) => {
              if (date === null) {
                return (
                  <td key={`empty-${rowIndex}-${colIndex}`} role="gridcell" />
                );
              }
              const selected =
                isSameDay(date, selectedDate) || isSameDay(date, endDate);
              const inRange =
                (selectedDate !== null || endDate !== null) &&
                isDateInRange(date, selectedDate, endDate);
              const disabled = isDateDisabled(date, disabledDates);
              const today = isToday(date);

              return (
                <td
                  aria-selected={selected}
                  key={date.getTime()}
                  role="gridcell"
                >
                  <DateButton
                    variant="secondary"
                    width="36px"
                    disabled={disabled}
                    isToday={today}
                    isSelected={selected}
                    isInRange={inRange}
                    onClick={() => onDateSelect(date)}
                    tabIndex={selected ? 0 : -1} // isnt entirely right
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
