import { MiniInfoCircleIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ToolTip } from '../../../ToolTip';
import { GridFormField } from '../../types';

export type GridFormToolTipProps = {
  field: GridFormField;
};

const StyledToolTip = styled.span`
  position: absolute;
  left: calc(100% - 1.5rem);
  bottom: 50px;
`;

export const GridFormToolTip: React.FC<GridFormToolTipProps> = ({
  field: { toolTip },
}) => {
  return (
    <StyledToolTip>
      <ToolTip
        focusable={toolTip?.focusable}
        wrapperClassName={toolTip?.wrapperClassName}
        tipClassName={toolTip?.tipClassName}
        theme={toolTip?.theme}
        position={toolTip?.position}
        target={<MiniInfoCircleIcon />}
        id={toolTip!.id}
      >
        {toolTip?.children}
      </ToolTip>
    </StyledToolTip>
  );
};
