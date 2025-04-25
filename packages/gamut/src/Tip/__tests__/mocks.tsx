import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { ToolTip, ToolTipProps } from '../ToolTip';

export const ToolTipMock: React.FC<
  ToolTipProps & ComponentProps<typeof FillButton>
> = ({ 'aria-label': ariaLabel, info, placement, onClick }) => {
  return (
    <ToolTip info={info} placement={placement} id="tip-id">
      <FillButton aria-label={ariaLabel} onClick={onClick}>
        Click me
      </FillButton>
    </ToolTip>
  );
};
