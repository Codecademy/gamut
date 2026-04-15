import * as React from 'react';

import { FlexBox } from '../../../Box';
import { Text } from '../../../Typography';
import { useResolvedLocale } from '../../utils/locale';
import { CalendarNavLastMonth } from './CalendarNavLastMonth';
import { CalendarNavNextMonth } from './CalendarNavNextMonth';
import { CalendarHeaderProps } from './types';
import { formatMonthYear } from './utils/format';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  displayDate,
  locale,
  headingId,
  onDisplayDateChange,
  hideLastNav,
  hideNextNav,
  onLastMonthClick,
  onNextMonthClick,
}) => {
  const resolvedLocale = useResolvedLocale(locale);

  return (
    <FlexBox alignItems="center" pb={8}>
      {!hideLastNav && (
        <CalendarNavLastMonth
          displayDate={displayDate}
          locale={locale}
          onDisplayDateChange={onDisplayDateChange}
          onLastMonthClick={onLastMonthClick}
        />
      )}
      <FlexBox justifyContent="center" width="100%">
        <Text
          aria-live="polite"
          fontSize={16}
          fontWeight="title"
          id={headingId}
          textAlign="center"
        >
          {formatMonthYear({ date: displayDate, locale: resolvedLocale })}
        </Text>
      </FlexBox>
      {!hideNextNav && (
        <CalendarNavNextMonth
          displayDate={displayDate}
          locale={locale}
          onDisplayDateChange={onDisplayDateChange}
          onNextMonthClick={onNextMonthClick}
        />
      )}
    </FlexBox>
  );
};
