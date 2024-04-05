import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { ToolTip, ToolTipProps } from '../ToolTip';

export const ToolTipMock: React.FC<
  ToolTipProps & ComponentProps<typeof FillButton>
> = ({
  'aria-label': ariaLabel,
  info,
  placement,
  onClick,
  hasRepetitiveLabel,
}) => {
  return (
    <ToolTip
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
    </ToolTip>
  );
};
