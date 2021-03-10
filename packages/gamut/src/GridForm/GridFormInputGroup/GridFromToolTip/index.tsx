import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTip, ToolTipProps } from '../../../ToolTip';

export type GridFormToolTipProps = {
  tooltip: ToolTipProps;
};

const StyledToolTip = styled.span`
  position: absolute;
  left: calc(100% - 1.1rem);
`;

const StyledIcon = styled(MiniInfoOutlineIcon)`
  width: 0.75rem;
  height: 0.75rem;
`;

export const GridFormToolTip: React.FC<GridFormToolTipProps> = ({
  tooltip,
}) => {
  return (
    <StyledToolTip>
      <ToolTip
        focusable={tooltip?.focusable}
        wrapperClassName={tooltip?.wrapperClassName}
        tipClassName={tooltip?.tipClassName}
        theme={tooltip?.theme}
        position={tooltip?.position}
        target={<StyledIcon />}
        id={tooltip.id}
      >
        {tooltip?.children}
      </ToolTip>
    </StyledToolTip>
  );
};
