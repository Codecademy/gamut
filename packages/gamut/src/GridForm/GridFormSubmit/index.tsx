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

export type ButtonType = 'cta-button' | 'fill-button';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  buttonType: ButtonType;
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
  position = 'left',
  size,
  buttonType,
  ...rest
}) => {
  const getButton = () => {
    if (buttonType === 'cta-button') {
      return (
        <CTAButton type="submit" {...rest}>
          {contents}
        </CTAButton>
      );
    }

    return (
      <FillButton type="submit" {...rest}>
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
