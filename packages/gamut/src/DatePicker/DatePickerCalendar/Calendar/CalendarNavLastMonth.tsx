import { MiniChevronLeftIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

import { IconButton } from '../../../Button';
import { useResolvedLocale } from '../../utils/locale';
import { CalendarNavProps } from './types';
import { getRelativeMonthLabels } from './utils/format';

export const CalendarNavLastMonth: React.FC<CalendarNavProps> = ({
  displayDate,
  onDisplayDateChange,
  onLastMonthClick,
  locale,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const { lastMonth } = getRelativeMonthLabels(resolvedLocale);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleLastMonth = () => {
    const lastMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() - 1,
      1
    );
    onDisplayDateChange?.(lastMonth);
    onLastMonthClick?.();
    buttonRef.current?.blur();
  };

  return (
    <IconButton
      alignSelf="flex-start"
      aria-label={lastMonth}
      icon={MiniChevronLeftIcon}
      ref={buttonRef}
      size="small"
      tip={lastMonth}
      onClick={handleLastMonth}
    />
  );
};
