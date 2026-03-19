import { ColorModes } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import type { ComponentPropsWithoutRef } from 'react';
import { ComponentProps } from 'react';

import { ButtonBase } from '../../ButtonBase';
import { IconComponentType } from '../../utils';
import { CTAButton } from '../CTAButton';
import { FillButton } from '../FillButton';
import { IconButton } from '../IconButton';
import { StrokeButton } from '../StrokeButton';
import { TextButton } from '../TextButton';
import { buttonProps, buttonVariants } from './styles';

/** Shared HTML attributes for button/anchor elements used by ButtonBase. */
export type ButtonElementProps = ComponentPropsWithoutRef<'button'>;

export interface ButtonBaseProps extends StyleProps<typeof buttonProps> {
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

export type ButtonTypes =
  | typeof CTAButton
  | typeof FillButton
  | typeof IconButton
  | typeof StrokeButton
  | typeof TextButton;
