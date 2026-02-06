import { ColorModes } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import type { ComponentProps, HTMLProps, JSX } from 'react';

import { ButtonBase } from '../../ButtonBase';
import { IconComponentType } from '../../utils';
import { CTAButton } from '../CTAButton';
import { FillButton } from '../FillButton';
import { IconButton } from '../IconButton';
import { StrokeButton } from '../StrokeButton';
import { TextButton } from '../TextButton';
import { buttonProps, buttonVariants } from './styles';

/** Optional anchor props so link-style buttons (with href) type-check. */
type ButtonAnchorProps = Pick<
  HTMLProps<HTMLAnchorElement>,
  'href' | 'target' | 'rel' | 'download'
>;

export interface ButtonBaseProps
  extends StyleProps<typeof buttonProps>,
    Partial<ButtonAnchorProps> {
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

export type ButtonTypes =
  | typeof CTAButton
  | typeof FillButton
  | typeof IconButton
  | typeof StrokeButton
  | typeof TextButton;
