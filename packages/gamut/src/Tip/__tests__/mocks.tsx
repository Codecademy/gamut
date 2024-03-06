import { ComponentProps } from 'react';

import { Box } from '../../Box';
import { FillButton } from '../../Button';
import { NewToolTip, NewToolTipProps } from '../ToolTip';

export const NewToolTipMock: React.FC<
  NewToolTipProps & ComponentProps<typeof FillButton>
> = ({ info, placement, onClick }) => {
  return (
    <Box width="500px">
      <Box width="200px">
        <NewToolTip info={info} placement={placement} id="tip-id">
          <FillButton aria-describedby="tip-id" onClick={onClick}>
            Click me
          </FillButton>
        </NewToolTip>
      </Box>
    </Box>
  );
};
