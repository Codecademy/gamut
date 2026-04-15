import * as React from 'react';

import { FlexBox } from '../../../Box';
import { TextButton } from '../../../Button';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../utils/translations';
import { CalendarFooterProps } from './types';

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
  clear,
  quickActions = [],
}) => {
  // if there are no quick actions and the clear button is not shown, don't render anything
  if (quickActions.length === 0 && !clear) return null;

  const actions = quickActions.slice(0, 3);

  return (
    <FlexBox
      alignItems={{ _: 'flex-start', xs: 'center' }}
      borderTop={1}
      flexDirection={{ _: 'column', xs: 'row' }}
      gap={12}
      justifyContent={clear ? 'space-between' : 'flex-end'}
      p={12}
    >
      {clear && (
        <FlexBox order={{ _: 2, xs: 1 }}>
          <TextButton
            alignSelf={{ _: 'flex-start', xs: 'center' }}
            disabled={clear.disabled}
            onClick={() => clear.onClick?.()}
          >
            {clear.text ?? DEFAULT_DATE_PICKER_TRANSLATIONS.clearText}
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
