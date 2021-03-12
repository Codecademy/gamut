import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { GridFormField } from '../..';
import { GridFormToolTip } from '../GridFromToolTip';

export type GridForToolTipWrapper = {
  children: ReactNode;
  field: GridFormField;
};
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const GridFormToolTipWrapper: React.FC<GridForToolTipWrapper> = ({
  children,
  field,
}) => {
  return (
    <StyledWrapper>
      {children}
      {field.toolTip && (
        <GridFormToolTip {...field.toolTip} id={`${field.id}-tooltip`} />
      )}
    </StyledWrapper>
  );
};
