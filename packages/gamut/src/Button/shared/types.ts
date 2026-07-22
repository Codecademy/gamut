import { ColorModes } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps, HTMLProps } from 'react';

import { ButtonBase } from '../../ButtonBase';
import { IconComponentType } from '../../utils';
import { CTAButton } from '../CTAButton';
import { FillButton } from '../FillButton';
import { IconButton } from '../IconButton';
import { StrokeButton } from '../StrokeButton';
import { TextButton } from '../TextButton';
import { buttonProps, buttonVariants } from './styles';

export interface ButtonBaseProps extends StyleProps<typeof buttonProps> {
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  variant?: (typeof buttonVariants)[number];
  size?: 'normal' | 'small' | 'large';
  as?: never;
  mode?: ColorModes;
}

export type ButtonProps = ButtonBaseProps & ComponentProps<typeof ButtonBase>;

export type InlineIconButtonProps<
  BaseButtonType extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
> = ComponentProps<BaseButtonType> &
  Partial<IconComponentType> & {
    iconPosition?: 'right' | 'left';
  };

/* eslint-disable @typescript-eslint/no-duplicate-type-constituents -- createButtonComponent yields structurally identical typeofs; union documents distinct components */
export type ButtonTypes =
  | typeof CTAButton
  | typeof FillButton
  | typeof IconButton
  | typeof StrokeButton
  | typeof TextButton;
/* eslint-enable @typescript-eslint/no-duplicate-type-constituents */
