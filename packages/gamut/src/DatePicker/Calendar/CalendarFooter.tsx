import * as React from 'react';

import { FlexBox } from '../../Box';
import { TextButton } from '../../Button';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../translations';
import { CalendarFooterProps } from './types';
import { getRelativeTodayLabel } from './utils/format';

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
  locale,
  clearText = DEFAULT_DATE_PICKER_TRANSLATIONS.clearText,
  disabled,
  showClearButton,
}) => {
  // const actions = quickActions.slice(0, 3);

  return (
    <FlexBox
      alignItems="center"
      borderTop={1}
      justifyContent="space-between"
      p={12}
    >
      {showClearButton && (
        <TextButton disabled={disabled} onClick={() => onClearDate?.()}>
          {clearText}
        </TextButton>
      )}
      <FlexBox gap={32}>
        <TextButton onClick={() => onTodayClick?.()}>
          {getRelativeTodayLabel(locale)}
        </TextButton>
      </FlexBox>
    </FlexBox>
  );
};
