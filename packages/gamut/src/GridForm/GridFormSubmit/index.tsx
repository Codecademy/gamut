import { flex } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../../Box';
import { CTAButton, FillButton } from '../../Button';
import { ButtonDeprecatedProps } from '../../ButtonDeprecated';
import { Column, ColumnSizes } from '../../Layout';
import { VisualTheme } from '../../theming/VisualTheme';
import { ResponsiveProperty } from '../../typings/responsive-properties';

export type GridFormSubmitPosition = keyof typeof positions;

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  buttonType: string;
  disabled?: ButtonDeprecatedProps['disabled'];
  position?: GridFormSubmitPosition;
  size: ResponsiveProperty<ColumnSizes>;
  mode?: VisualTheme;
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
  position = 'left',
  size,
  mode = 'light',
  buttonType,
}) => {
  const getButton = () => {
    if (buttonType === 'cta') {
      return (
        <CTAButton mode={mode} disabled={disabled}>
          {contents}
        </CTAButton>
      );
    }

    return (
      <FillButton mode={mode} disabled={disabled}>
        {contents}
      </FillButton>
    );
  };

  return (
    <StyledColumn
      justifyContent={positions[position]}
      alignItems="center"
      size={size}
    >
      <Box marginBottom={8}>{getButton()}</Box>
    </StyledColumn>
  );
};
