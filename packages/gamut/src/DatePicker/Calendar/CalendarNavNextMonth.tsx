import { MiniChevronRightIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { IconButton } from '../../Button';
import { useResolvedLocale } from '../utils/locale';
import { CalendarNavProps } from './types';
import { getRelativeMonthLabels } from './utils/format';

export const CalendarNavNextMonth: React.FC<CalendarNavProps> = ({
  displayDate,
  onDisplayDateChange,
  onNextMonthClick,
  locale,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const { nextMonth } = getRelativeMonthLabels(resolvedLocale);

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
    <IconButton
      alignSelf="flex-end"
      aria-label={nextMonth}
      icon={MiniChevronRightIcon}
      size="small"
      tip={nextMonth}
      onClick={handleNextMonth}
    />
  );
};
