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
  hideAriaToolTip,
}) => {
  return (
    <ToolTip
      hasRepetitiveLabel={hasRepetitiveLabel}
      hideAriaToolTip={hideAriaToolTip}
      id="tip-id"
      info={info}
      placement={placement}
    >
      <FillButton
        aria-describedby="tip-id"
        aria-label={ariaLabel}
        onClick={onClick}
      >
        Click me
      </FillButton>
    </ToolTip>
  );
};
