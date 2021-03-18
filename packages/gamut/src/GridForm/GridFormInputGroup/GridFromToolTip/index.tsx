import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTip, ToolTipPosition, ToolTipProps } from '../../../ToolTip';

const StyledToolTip = styled.span`
  position: absolute;
  left: calc(100% - 1.1rem);

  div {
    > *:last-child {
      z-index: 1;
      left: calc(100% - 1.7rem);
    }
  }
`;

export const GridFormToolTip: React.FC<ToolTipProps> = (props) => {
  return (
    <StyledToolTip>
      <ToolTip
        {...props}
        position={ToolTipPosition.BottomRight}
        target={<MiniInfoOutlineIcon height="0.8rem" width="0.8rem" />}
      />
    </StyledToolTip>
  );
};
