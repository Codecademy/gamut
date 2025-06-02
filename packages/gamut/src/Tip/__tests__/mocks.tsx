import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { ToolTip, ToolTipProps } from '../ToolTip';

export const ToolTipMock: React.FC<
  ToolTipProps & ComponentProps<typeof FillButton>
> = ({ info, placement, onClick }) => {
  return (
    <ToolTip id="tip-id" info={info} placement={placement}>
      <FillButton aria-describedby="tip-id" onClick={onClick}>
        Click me
      </FillButton>
    </ToolTip>
  );
};
