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
  secondMonthYear,
  onPreviousMonthClick,
  onNextMonthClick,
  locale,
  headingId,
}) => {
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
      <Text
        aria-live="polite"
        as="h2"
        fontSize={16}
        fontWeight="title"
        id={headingId}
      >
        {formatMonthYear(currentMonthYear, locale)}
      </Text>
      <Text
        aria-live="polite"
        as="h2"
        display={{ _: 'none', xs: 'initial' }}
        fontSize={16}
        fontWeight="title"
        id={headingId}
      >
        {formatMonthYear(secondMonthYear, locale)}
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
