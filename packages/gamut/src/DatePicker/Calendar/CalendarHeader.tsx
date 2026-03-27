import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { IconButton } from '../../Button';
import { Text } from '../../Typography';
import { useResolvedLocale } from '../utils/locale';
import { CalendarHeaderProps } from './types';
import { formatMonthYear, getRelativeMonthLabels } from './utils/format';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  displayDate,
  onDisplayDateChange,
  secondDisplayDate,
  onLastMonthClick,
  onNextMonthClick,
  locale,
  headingId,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const { nextMonth, lastMonth } = getRelativeMonthLabels(resolvedLocale);

  const handleLastMonth = () => {
    const lastMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() - 1,
      1
    );
    onDisplayDateChange?.(lastMonth);
    onLastMonthClick?.();
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() + 1,
      1
    );
    onDisplayDateChange?.(nextMonth);
    onNextMonthClick?.();
  };

  return (
    <FlexBox alignItems="center" pb={8} width="100%">
      <IconButton
        aria-label={lastMonth}
        icon={MiniChevronLeftIcon}
        size="small"
        tip={lastMonth}
        onClick={handleLastMonth}
      />
      <FlexBox
        flexGrow={1}
        gap={{ _: 0, xs: secondDisplayDate ? 32 : 0 }}
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
            {formatMonthYear(displayDate, resolvedLocale)}
          </Text>
        </FlexBox>
        {secondDisplayDate && (
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
              {formatMonthYear(secondDisplayDate, resolvedLocale)}
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
