import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { IconButton } from '../../Button';
import { Text } from '../../Typography';
import { CalendarHeaderProps } from './types';
import { formatMonthYear } from './utils/format';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonthYear,
  onCurrentMonthYearChange,
  onPreviousMonthClick,
  onNextMonthClick,
  locale,
  headingId,
}) => {
  const monthYear = formatMonthYear(currentMonthYear, locale);

  const handlePreviousMonth = () => {
    const previousMonth = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth() - 1,
      1
    );
    onCurrentMonthYearChange?.(previousMonth);
    onPreviousMonthClick?.();
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth() + 1,
      1
    );
    onCurrentMonthYearChange?.(nextMonth);
    onNextMonthClick?.();
  };

  return (
    <FlexBox alignItems="center" justifyContent="space-between" pb={16}>
      <IconButton
        aria-label="Previous month"
        icon={MiniChevronLeftIcon}
        size="small"
        tip="Previous month"
        onClick={handlePreviousMonth}
      />

      <Text aria-live="polite" as="h2" id={headingId} variant="title-sm">
        {monthYear}
      </Text>
      <IconButton
        aria-label="Next month"
        icon={MiniChevronRightIcon}
        size="small"
        tip="Next month"
        onClick={handleNextMonth}
      />
    </FlexBox>
  );
};
