import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { IconButton } from '../../Button';
import { Text } from '../../Typography';
import { CalendarHeaderProps } from './types';
import { formatMonthYear, getRelativeMonthLabels } from './utils/format';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonthYear,
  onCurrentMonthYearChange,
  secondMonthYear,
  onLastMonthClick,
  onNextMonthClick,
  locale,
  headingId,
}) => {
  const { nextMonth, lastMonth } = getRelativeMonthLabels(locale);

  const handleLastMonth = () => {
    const lastMonth = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth() - 1,
      1
    );
    onCurrentMonthYearChange?.(lastMonth);
    onLastMonthClick?.();
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
        aria-label={lastMonth}
        icon={MiniChevronLeftIcon}
        size="small"
        tip={lastMonth}
        onClick={handleLastMonth}
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
      {secondMonthYear && (
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
      )}
      <IconButton
        aria-label={nextMonth}
        icon={MiniChevronRightIcon}
        size="small"
        tip={nextMonth}
        onClick={handleNextMonth}
      />
    </FlexBox>
  );
};
