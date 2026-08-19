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
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
> = ComponentProps<BaseButtonType> &
  Partial<IconComponentType> & {
    iconPosition?: 'right' | 'left';
  };

/*
 * These button components currently share a structural type, but ButtonTypes
 * intentionally enumerates the full set — so no-duplicate-type-constituents is
 * disabled here rather than letting it silently narrow the union.
 */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
export type ButtonTypes =
  | typeof CTAButton
  | typeof FillButton
  | typeof IconButton
  | typeof StrokeButton
  | typeof TextButton;
/* eslint-enable @typescript-eslint/no-duplicate-type-constituents */
