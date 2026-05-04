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
      alignItems={{ _: 'flex-start', sm: 'center' }}
      borderTop={1}
      flexDirection={{ _: 'column', sm: 'row' }}
      gap={12}
      justifyContent={clearButton ? 'space-between' : 'flex-end'}
      p={12}
    >
      {clearButton && (
        <FlexBox order={{ _: 2, sm: 1 }}>
          <TextButton
            alignSelf={{ _: 'flex-start', sm: 'center' }}
            disabled={clearButton.disabled}
            variant="secondary"
            onClick={() => clearButton.onClick?.()}
          >
            {clearButton.text ??
              DEFAULT_DATE_PICKER_TRANSLATIONS.clearButtonText}
          </TextButton>
        </FlexBox>
      )}
      <FlexBox
        flexDirection={{ _: 'column', sm: 'row' }}
        gap={8}
        order={{ _: 1, sm: 2 }}
        wrap
      >
        {actions.map((action, index) => (
          <TextButton
            alignSelf={{ _: 'flex-start', sm: 'center' }}
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
