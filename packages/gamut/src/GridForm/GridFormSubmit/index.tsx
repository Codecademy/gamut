import styled from '@emotion/styled';
import React from 'react';

import {
  ButtonDeprecated,
  ButtonDeprecatedProps,
} from '../../ButtonDeprecated';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';

export type GridFormSubmitPosition = 'left' | 'center' | 'right' | 'stretch';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled?: ButtonDeprecatedProps['disabled'];
  position?: GridFormSubmitPosition;
  outline?: ButtonDeprecatedProps['outline'];
  size: ResponsiveProperty<ColumnSizes>;
  theme?: ButtonDeprecatedProps['theme'];
};

const styles: Record<string, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const StyledColumn = styled(Column)<{ position: GridFormSubmitPosition }>`
  align-items: center;
  justify-content: ${({ position }) => styles[position]};
`;

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  outline,
  position = 'left',
  size,
  theme = 'brand-purple',
}) => {
  return (
    <StyledColumn position={position} size={size}>
      <ButtonDeprecated
        disabled={disabled}
        outline={outline}
        theme={theme}
        type="submit"
      >
        {contents}
      </ButtonDeprecated>
    </StyledColumn>
  );
};
