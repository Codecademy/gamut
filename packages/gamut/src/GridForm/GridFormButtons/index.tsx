import React, { ComponentProps } from 'react';

import { Box } from '../../Box';
import { CTAButton, FillButton, TextButton } from '../../Button';
import { ButtonProps } from '../../Button/shared';
import { Column } from '../../Layout';
import { VisualTheme } from '../../theming/VisualTheme';

export type GridFormButtonsPosition = keyof typeof positions;

export type SubmitButtonType = 'cta' | 'fill';

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  position?: GridFormButtonsPosition;
  size: ComponentProps<typeof Column>['size'];
  disabled?: ButtonProps['disabled'];
  mode?: VisualTheme;
  type?: SubmitButtonType;
};

export type GridFormCancelButtonProps = {
  children: React.ReactNode;
  href?: 'string';
  onClick?: () => void;
};

type CancelButtonProps = {
  cancel?: ButtonProps;
};

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch',
};

export const GridFormButtons: React.FC<
  GridFormSubmitProps & CancelButtonProps
> = (props) => {
  const getButton = () => {
    switch (props.type) {
      case 'cta':
        return (
          <CTAButton type="submit" mode={props.mode} disabled={props.disabled}>
            {props.contents}
          </CTAButton>
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
    <Column size={props.size}>
      <Box
        mb={8}
        alignSelf="center"
        justifySelf={positions[props.position || 'left']}
      >
        {props.cancel && (
          <TextButton {...props.cancel} mr={32} data-testid="cancel-button" />
        )}
        {getButton()}
      </Box>
    </Column>
  );
};
