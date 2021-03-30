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

export type ButtonType = 'cta' | 'fill';
export type ButtonDeprecatedType = 'business';

type GridFormBase = {
  contents: React.ReactNode;
  position?: GridFormSubmitPosition;
  size: ResponsiveProperty<ColumnSizes>;
  disabled?: ButtonDeprecatedProps['disabled'];
  mode?: VisualTheme;
};

type GridFormButtonSubmitPropsDeprecated = GridFormBase & {
  type?: ButtonDeprecatedType;
  theme?: ButtonDeprecatedProps['theme'];
  outline?: ButtonDeprecatedProps['outline'];
};

type GridFormSubmitPropsStandard = GridFormBase & {
  type?: ButtonType;
};
export type GridFormSubmitProps =
  | GridFormButtonSubmitPropsDeprecated
  | GridFormSubmitPropsStandard;

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
};

const StyledColumn = styled(Column)(flex);

export const GridFormSubmit: React.FC<GridFormSubmitProps> = (props) => {
  const getButton = () => {
    switch (props.type) {
      case 'cta':
        return (
          <CTAButton type="submit" mode={props.mode} disabled={props.disabled}>
            {props.contents}
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
            disabled={props.disabled}
            outline={props.outline}
            theme={props.theme}
            type="submit"
          >
            {props.contents}
          </ButtonDeprecated>
        );
      default:
        return (
          <FillButton type="submit" mode={props.mode} disabled={props.disabled}>
            {props.contents}
          </FillButton>
        );
    }
  };

  return (
    <StyledColumn
      justifyContent={positions[props.position || 'left']}
      alignItems="center"
      size={props.size}
    >
      <Box marginBottom={8}>{getButton()}</Box>
    </StyledColumn>
  );
};
