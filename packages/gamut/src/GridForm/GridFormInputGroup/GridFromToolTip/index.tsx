import { MiniInfoCircleIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTip, ToolTipProps } from '../../../ToolTip';

export type GridFormToolTipProps = {
  tooltip: ToolTipProps;
};

const StyledToolTip = styled.span`
  position: absolute;
  left: calc(100% - 1.5rem);
  bottom: 50px;
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
        target={<MiniInfoCircleIcon />}
        id={tooltip.id}
      >
        {tooltip?.children}
      </ToolTip>
    </StyledToolTip>
  );
};
