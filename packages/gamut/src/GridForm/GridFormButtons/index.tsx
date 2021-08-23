import { ColorModes } from '@codecademy/gamut-styles';
import React, { ComponentProps } from 'react';
import { Mode, useFormContext } from 'react-hook-form';

import { Box } from '../../Box';
import { CTAButton, FillButton, TextButton } from '../../Button';
import { ButtonProps } from '../../Button/shared';
import { SubmitButton, SubmitButtonProps } from '../../Form';
import { Column } from '../../Layout';

export type GridFormButtonsPosition = keyof typeof positions;

export type SubmitButtonType = keyof typeof buttonMap;

export type GridFormSubmitProps = {
  contents: React.ReactNode;
  position?: GridFormButtonsPosition;
  size: ComponentProps<typeof Column>['size'];
  disabled?: SubmitButtonProps['disabled'];
  loading?: SubmitButtonProps['loading'];
  mode?: ColorModes;
  type?: SubmitButtonType;
  validation?: Mode;
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

const buttonMap = {
  cta: CTAButton,
  fill: FillButton,
};

export const GridFormButtons: React.FC<
  GridFormSubmitProps & CancelButtonProps
> = ({ type = 'fill', ...props }) => {
  return (
    <Column size={size}>
      <Box
        mb={8}
        alignSelf="center"
        justifySelf={positions[position || 'left']}
      >
        {cancel && (
          <TextButton {...cancel} mr={32} data-testid="cancel-button" />
        )}
        <SubmitButton
          as={buttonMap[type]}
          mode={props.mode}
          disabled={props.disabled}
          loading={props.loading}
        >
          {props.contents}
        </SubmitButton>
      </Box>
    </Column>
  );
};
