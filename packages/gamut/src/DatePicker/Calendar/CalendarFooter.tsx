import * as React from 'react';

import { FlexBox } from '../../Box';
import { TextButton } from '../../Button';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../utils/translations';
import { CalendarFooterProps } from './types';

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  onClearDate,
  clearText = DEFAULT_DATE_PICKER_TRANSLATIONS.clearText,
  disabled,
  showClearButton,
  quickActions = [],
}) => {
  const actions = quickActions.slice(0, 3);

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
      <FlexBox gap={8}>
        {actions.map((action, index) => (
          <TextButton
            // eslint-disable-next-line react/no-array-index-key -- displayText may duplicate
            key={`${action.displayText}-${index}`}
            onClick={action.onClick}
          >
            {action.displayText}
          </TextButton>
        ))}
      </FlexBox>
    </FlexBox>
  );
};
