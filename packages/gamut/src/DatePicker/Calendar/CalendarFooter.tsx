import * as React from 'react';

import { FlexBox } from '../../Box';
import { TextButton } from '../../Button';
import { CalendarFooterProps, QuickAction } from './types';

// function formatQuickActionLabel(action: QuickAction): string {
//   const { num, timePeriod } = action;
//   const period =
//     timePeriod === 'day'
//       ? num === 1
//         ? 'day'
//         : 'days'
//       : timePeriod === 'week'
//       ? num === 1
//         ? 'week'
//         : 'weeks'
//       : timePeriod === 'month'
//       ? num === 1
//         ? 'month'
//         : 'months'
//       : num === 1
//       ? 'year'
//       : 'years';
//   return `${num} ${period}`;
// }

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  onClearDate,
  onTodayClick,
  onSelectedDateChange,
  onCurrentMonthYearChange,
  quickActions = [],
}) => {
  const handleClearDate = () => {
    onSelectedDateChange(null);
    onClearDate?.();
  };

  const handleTodayClick = () => {
    const today = new Date();
    onSelectedDateChange(today);
    onCurrentMonthYearChange(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
    onTodayClick?.();
  };
  // const actions = quickActions.slice(0, 3);

  return (
    <FlexBox
      alignItems="center"
      borderTop={1}
      justifyContent="space-between"
      py={12}
    >
      <TextButton onClick={handleClearDate}>Clear</TextButton>
      <FlexBox gap={32}>
        <TextButton onClick={handleTodayClick}>Today</TextButton>
      </FlexBox>
    </FlexBox>
  );
};
