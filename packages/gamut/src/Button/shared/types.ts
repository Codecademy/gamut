import { ColorModes } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps, ComponentPropsWithoutRef } from 'react';

import { ButtonBase } from '../../ButtonBase';
import { IconComponentType } from '../../utils';
import { CTAButton } from '../CTAButton';
import { FillButton } from '../FillButton';
import { IconButton } from '../IconButton';
import { StrokeButton } from '../StrokeButton';
import { TextButton } from '../TextButton';
import { buttonProps, buttonVariants } from './styles';

/*
 * `WithoutRef` because `ButtonBase` attaches the ref one layer down; this
 * gives named access to `aria-*`/`data-*` and other native button attributes
 * without producing a `ref` prop this layer never forwards.
 */
export interface ButtonBaseProps
  extends StyleProps<typeof buttonProps>,
    Omit<ComponentPropsWithoutRef<'button'>, 'size' | 'onClick'> {
  onClick?: ComponentPropsWithoutRef<'button'>['onClick'];
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
