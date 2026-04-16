import * as React from 'react';

import { FlexBox } from '../../../Box';
import { TextButton } from '../../../Button';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../utils/translations';
import { CalendarFooterProps } from './types';

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  clearButton,
  quickActions = [],
}) => {
  if (quickActions.length === 0 && !clearButton) return null;

  const actions = quickActions.slice(0, 3);

  return (
    <FlexBox
      alignItems={{ _: 'flex-start', xs: 'center' }}
      borderTop={1}
      flexDirection={{ _: 'column', xs: 'row' }}
      gap={12}
      justifyContent={clearButton ? 'space-between' : 'flex-end'}
      p={12}
    >
      {clearButton && (
        <FlexBox order={{ _: 2, xs: 1 }}>
          <TextButton
            alignSelf={{ _: 'flex-start', xs: 'center' }}
            disabled={clearButton.disabled}
            onClick={() => clearButton.onClick?.()}
          >
            {clearButton.text ??
              DEFAULT_DATE_PICKER_TRANSLATIONS.clearButtonText}
          </TextButton>
        </FlexBox>
      )}
      <FlexBox
        flexDirection={{ _: 'column', xs: 'row' }}
        gap={8}
        order={{ _: 1, xs: 2 }}
        wrap
      >
        {actions.map((action, index) => (
          <TextButton
            alignSelf={{ _: 'flex-start', xs: 'center' }}
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
