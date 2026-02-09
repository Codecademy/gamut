import { ColorModes } from '@codecademy/gamut-styles';
import { ComponentProps } from 'react';
import * as React from 'react';

import { GridBox } from '../../Box';
import { ButtonProps, CTAButton, FillButton, TextButton } from '../../Button';
import { SubmitButton, SubmitButtonProps } from '../../ConnectedForm';
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
    <Column size={props.size}>
      <GridBox
        alignSelf="center"
        gridTemplateColumns={props.cancel ? 'auto auto' : undefined}
        justifySelf={positions[props.position || 'left']}
        mb={8}
      >
        {props.cancel && (
          <TextButton
            {...(props.cancel as React.ComponentProps<
              typeof TextButton
            > as any)}
            data-testid="cancel-button"
            mr={32}
          />
        )}
        <SubmitButton
          as={buttonMap[type]}
          disabled={props.disabled}
          loading={props.loading}
          mode={props.mode}
        >
          {props.contents}
        </SubmitButton>
      </GridBox>
    </Column>
  );
};
