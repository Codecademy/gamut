import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { ToolTipProps } from '../../../ToolTip';
import { GridFormToolTip } from '../GridFromToolTip';

export type GridForToolTipWrapper = {
  children: ReactNode;
  tooltip?: ToolTipProps;
};
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const GridFormToolTipWrapper: React.FC<GridForToolTipWrapper> = ({
  children,
  tooltip,
}) => {
  return (
    <StyledWrapper>
      {children}
      {tooltip && <GridFormToolTip tooltip={tooltip} />}
    </StyledWrapper>
  );
};
