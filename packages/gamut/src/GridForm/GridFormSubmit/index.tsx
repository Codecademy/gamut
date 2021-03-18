import { flex } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../../Box';
import {
  ButtonDeprecated,
  ButtonDeprecatedProps,
} from '../../ButtonDeprecated';
import { Column, ColumnSizes } from '../../Layout';
import { ResponsiveProperty } from '../../typings/responsive-properties';

export type GridFormSubmitPosition = keyof typeof positions;

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  disabled?: ButtonDeprecatedProps['disabled'];
  position?: GridFormSubmitPosition;
  outline?: ButtonDeprecatedProps['outline'];
  size: ResponsiveProperty<ColumnSizes>;
  theme?: ButtonDeprecatedProps['theme'];
};

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
};

const StyledColumn = styled(Column)(flex);

export const GridFormSubmit: React.FC<GridFormSubmitProps> = ({
  contents,
  disabled,
  outline,
  position = 'left',
  size,
  theme = 'brand-purple',
}) => {
  return (
    <StyledColumn
      justifyContent={positions[position]}
      alignItems="center"
      size={size}
    >
      <Box marginBottom={8}>
        <ButtonDeprecated
          disabled={disabled}
          outline={outline}
          theme={theme}
          type="submit"
        >
          {contents}
        </ButtonDeprecated>
      </Box>
    </StyledColumn>
  );
};
