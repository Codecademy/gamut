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

export const CalendarNavLastMonth: React.FC<CalendarNavProps> = ({
  displayDate,
  onDisplayDateChange,
  onLastMonthClick,
  onTabIntoGrid,
  interceptTabToGrid,
  locale,
}) => {
  const resolvedLocale = useResolvedLocale(locale);
  const { lastMonth } = getRelativeMonthLabels(resolvedLocale);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isRtl = useElementDir(buttonRef) === 'rtl';

  const handleClick = (e: React.MouseEvent) => {
    const lastMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() - 1,
      1
    );
    onDisplayDateChange?.(lastMonth);
    onLastMonthClick?.();
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
      alignSelf="flex-start"
      aria-label={lastMonth}
      data-calendar-month-nav
      icon={isRtl ? MiniChevronRightIcon : MiniChevronLeftIcon}
      ref={buttonRef}
      size="small"
      tip={lastMonth}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
};
