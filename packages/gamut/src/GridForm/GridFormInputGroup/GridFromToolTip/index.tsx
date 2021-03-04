import { MiniInfoCircleIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTip } from '../../../ToolTip';
import { GridFormField } from '../../types';

export type GridFormToolTipProps = {
  field: GridFormField;
};

const StyledToolTip = styled.span`
  position: relative;
  right: 20px;
  height: 16px;
  width: 16px;
  bottom: 20px;
  pointer-events: none;
`;

export const GridFormToolTip: React.FC<GridFormToolTipProps> = ({
  field: { toolTip },
}) => {
  return (
    <StyledToolTip>
      <ToolTip
        focusable
        position={toolTip?.position}
        target={<MiniInfoCircleIcon />}
        id={toolTip!.id}
      >
        {toolTip?.children}
      </ToolTip>
    </StyledToolTip>
  );
};
