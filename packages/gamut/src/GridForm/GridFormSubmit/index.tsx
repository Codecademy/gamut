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

export type ButtonType = 'cta' | 'fill' | 'business';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  type?: ButtonType;
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
  size,
  disabled,
  outline,
  mode = 'light',
  position = 'left',
  type = 'fill',
  theme = 'brand-purple',
}) => {
  const getButton = () => {
    switch (type) {
      case 'cta':
        return (
          <CTAButton type="submit" mode={mode} disabled={disabled}>
            {contents}
          </CTAButton>
        );
      case 'business':
        /**
         * There are current designs that currently rely on the deprecated button.
         * Primarily business components such as /WorkerSupportApplication/index.tsx,
         * /PlanInvitationBulkForm/PlanInvitationBulkForm.tsx and /PlanInvitationForm/PlanInvitationForm.tsx
         * currently using brand-blue variant of the deprecated button. With the later two also using the also
         * using the outline button. Once work is finished for the colorMode changes for buttons the deprecated button
         * can be removed.
         */
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
      default:
        return (
          <FillButton type="submit" mode={mode} disabled={disabled}>
            {contents}
          </FillButton>
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
