import { ColorModes } from '@codecademy/gamut-styles';
import { ComponentProps } from 'react';
import * as React from 'react';

import { GridBox } from '../../Box';
import { ButtonProps, CTAButton, FillButton, TextButton } from '../../Button';
import { ButtonBaseProps } from '../../Button/shared/types';
import { SubmitButton, SubmitButtonProps } from '../../ConnectedForm';
import { Column } from '../../Layout';
import { DataAttributes } from '../../utils';

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

/*
 * `onClick` is re-declared with `ButtonBaseProps`' own flat (button-only)
 * signature rather than left as `ButtonProps`'s version - `ButtonProps` is
 * `ButtonBaseProps & ComponentProps<typeof ButtonBase>`, and `ButtonBase`
 * unions button/anchor variants, so its `onClick` still carries that union.
 * Intersecting `DataAttributes` onto the still-unioned `onClick` is what
 * degrades a consumer-side `keyof`/mapped type over `cancel` into TS2590
 * "union type too complex", confirmed empirically. See the equivalent note on
 * `DataAttributes` in `utils/types.ts`.
 */
export type CancelButtonProps = {
  cancel?: Omit<ButtonProps, 'onClick'> & {
    onClick?: ButtonBaseProps['onClick'];
  } & DataAttributes;
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
          <TextButton {...props.cancel} data-testid="cancel-button" mr={32} />
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
