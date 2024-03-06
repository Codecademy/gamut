import { ComponentProps } from 'react';

import { FillButton } from '../../Button';
import { NewToolTip, NewToolTipProps } from '../ToolTip';

export const NewToolTipMock: React.FC<
  NewToolTipProps & ComponentProps<typeof FillButton>
> = ({ info, placement, onClick }) => {
  return (
    <NewToolTip info={info} placement="floating" id="tip-id" zIndex={14}>
      <FillButton aria-describedby="tip-id" onClick={onClick}>
        Click me
      </FillButton>
    </NewToolTip>
  );
};
