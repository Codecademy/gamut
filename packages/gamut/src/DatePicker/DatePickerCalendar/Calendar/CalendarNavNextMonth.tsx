import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import { useElementDir } from '@codecademy/gamut-styles';
import * as React from 'react';

import { IconButton } from '../../../Button';
import { useResolvedLocale } from '../../utils/locale';
import { CalendarNavProps } from './types';
import { getRelativeMonthLabels } from './utils/format';

export const CalendarNavNextMonth: React.FC<CalendarNavProps> = ({
  displayDate,
  onDisplayDateChange,
  onNextMonthClick,
  onTabIntoGrid,
  interceptTabToGrid,
  locale,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const { nextMonth } = getRelativeMonthLabels(resolvedLocale);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isRtl = useElementDir(buttonRef) === 'rtl';

  const handleClick = (e: React.MouseEvent) => {
    const nextMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() + 1,
      1
    );
    onDisplayDateChange?.(nextMonth);
    onNextMonthClick?.();
    if (e.detail > 0) {
      buttonRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey && interceptTabToGrid && onTabIntoGrid) {
      e.preventDefault();
      onTabIntoGrid();
    }
  };

  return (
    <IconButton
      alignSelf="flex-end"
      aria-label={nextMonth}
      data-calendar-month-nav
      icon={isRtl ? MiniChevronLeftIcon : MiniChevronRightIcon}
      ref={buttonRef}
      size="small"
      tip={nextMonth}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
};
