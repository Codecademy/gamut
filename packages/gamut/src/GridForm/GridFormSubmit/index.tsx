import { flex } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../../Box';
import { CTAButton, FillButton } from '../../Button';
import {
  ButtonDeprecated,
  ButtonDeprecatedProps,
} from '../../ButtonDeprecated';
import { Column, ColumnSizes } from '../../Layout';
import { VisualTheme } from '../../theming/VisualTheme';
import { ResponsiveProperty } from '../../typings/responsive-properties';

export type GridFormSubmitPosition = keyof typeof positions;

export type ButtonType = 'cta-button' | 'fill-button' | 'deprecated-button';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  buttonType: ButtonType;
  disabled?: ButtonDeprecatedProps['disabled'];
  position?: GridFormSubmitPosition;
  size: ResponsiveProperty<ColumnSizes>;
  mode?: VisualTheme;
  theme?: ButtonDeprecatedProps['theme'];
  outline?: ButtonDeprecatedProps['outline'];
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
  position = 'left',
  size,
  buttonType,
  disabled,
  mode,
  outline,
  theme = 'brand-purple',
}) => {
  const getButton = () => {
    switch (buttonType) {
      case 'cta-button':
        return (
          <CTAButton type="submit" mode={mode} disabled={disabled}>
            {contents}
          </CTAButton>
        );
      case 'fill-button':
        return (
          <FillButton type="submit" mode={mode} disabled={disabled}>
            {contents}
          </FillButton>
        );
      case 'deprecated-button':
        // There are current designs that currently rely on the deprecated button
        return (
          <ButtonDeprecated
            disabled={disabled}
            outline={outline}
            theme={theme}
            type="submit"
          >
            {contents}
          </ButtonDeprecated>
        );
    }
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
