import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { NewToolTip, NewToolTipProps } from '../ToolTip';

export const NewToolTipMock: React.FC<
  NewToolTipProps & ComponentProps<typeof FillButton>
> = ({
  'aria-label': ariaLabel,
  info,
  placement,
  onClick,
  hasRepetitiveLabel,
}) => {
  return (
    <NewToolTip
      info={info}
      placement={placement}
      id="tip-id"
      hasRepetitiveLabel={hasRepetitiveLabel}
    >
      <FillButton
        aria-label={ariaLabel}
        aria-describedby="tip-id"
        onClick={onClick}
      >
        Click me
      </FillButton>
    </NewToolTip>
  );
};
