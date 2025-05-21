import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { ToolTip, ToolTipProps } from '../ToolTip';

export const ToolTipMock: React.FC<
  ToolTipProps & ComponentProps<typeof FillButton>
> = ({ info, placement, onClick }) => {
  return (
    <ToolTip info={info} placement={placement} id="tip-id">
      <FillButton aria-describedby="tip-id" onClick={onClick}>
        Click me
      </FillButton>
    </ToolTip>
  );
};
