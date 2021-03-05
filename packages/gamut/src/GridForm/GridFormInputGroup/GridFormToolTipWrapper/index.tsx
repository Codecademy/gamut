import styled from '@emotion/styled';
import React from 'react';

import { GridFormField } from '../../types';
import { GridFormToolTip } from '../GridFromToolTip';

export type GridForToolTipWrapper = {
  children: React.ReactNode;
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
      {field.toolTip && <GridFormToolTip field={field} />}
    </StyledWrapper>
  );
};
