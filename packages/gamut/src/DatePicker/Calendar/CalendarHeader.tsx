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
    <FlexBox alignItems="center" pb={16} width="100%">
      <IconButton
        aria-label={lastMonth}
        icon={MiniChevronLeftIcon}
        size="small"
        tip={lastMonth}
        onClick={handleLastMonth}
      />
      <FlexBox
        flexGrow={1}
        gap={{ _: 0, xs: secondMonthYear ? 32 : 0 }}
        minWidth={0}
      >
        <FlexBox flexGrow={1} justifyContent="center" minWidth={0}>
          <Text
            aria-live="polite"
            as="h2"
            fontSize={16}
            fontWeight="title"
            id={headingId}
            textAlign="center"
          >
            {formatMonthYear(currentMonthYear, locale)}
          </Text>
        </FlexBox>
        {secondMonthYear && (
          <FlexBox
            display={{ _: 'none', xs: 'flex' }}
            flexGrow={1}
            justifyContent="center"
            minWidth={0}
          >
            <Text
              aria-live="polite"
              as="h2"
              fontSize={16}
              fontWeight="title"
              textAlign="center"
            >
              {formatMonthYear(secondMonthYear, locale)}
            </Text>
          </FlexBox>
        )}
      </FlexBox>
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
