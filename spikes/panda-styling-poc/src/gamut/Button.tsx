import {
  type ComponentProps,
  type ComponentType,
  type ReactNode,
  forwardRef,
} from 'react';
import { styled } from 'styled-system/jsx';
import {
  ctaButton,
  fillButton,
  iconButton,
  strokeButton,
  textButton,
} from 'styled-system/recipes';

import { type ButtonBaseElements, ButtonBase } from './ButtonBase';
import { type ToolTipProps, ToolTip } from './ToolTip';

/* Reproduces the real Gamut Button atoms so consumers' external API is
 * unchanged: FillButton / StrokeButton / TextButton / CTAButton / IconButton,
 * each with variant / size / icon(+iconPosition) / href / disabled / system
 * props. Only difference vs today: they're imported from Gamut (as they already
 * are), and `styled` underneath is Panda's, not Emotion's. */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'interface';
export type ButtonSize = 'small' | 'normal' | 'large';
export type IconComponentType = { icon: ComponentType<{ size?: number }> };

// styled(ButtonBase, recipe) — Panda applies recipe classes to the polymorphic base
const FillButtonBase = styled(ButtonBase, fillButton);
const StrokeButtonBase = styled(ButtonBase, strokeButton);
const TextButtonBase = styled(ButtonBase, textButton);
const IconButtonBase = styled(ButtonBase, iconButton);

/** CTAButton is primary-only (no variant/size), same as gamut. */
export const CTAButton = styled(ButtonBase, ctaButton);
export type CTAButtonProps = ComponentProps<typeof CTAButton>;

// InlineIconButton behavior — prepend/append an icon around children.
const inlineIcon = (
  Icon: IconComponentType['icon'] | undefined,
  iconPosition: 'left' | 'right',
  size: unknown,
  children: ReactNode
): ReactNode => {
  if (!Icon) return children;
  const iconSize = size === 'small' ? 12 : 16;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {iconPosition === 'left' && <Icon size={iconSize} />}
      {children}
      {iconPosition === 'right' && <Icon size={iconSize} />}
    </span>
  );
};

type InlineIconProps = Partial<IconComponentType> & {
  iconPosition?: 'left' | 'right';
};

export type FillButtonProps = ComponentProps<typeof FillButtonBase> &
  InlineIconProps;
export const FillButton = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ icon, iconPosition = 'left', children, size, ...props }, ref) => (
    <FillButtonBase ref={ref} size={size} {...props}>
      {inlineIcon(icon, iconPosition, size, children)}
    </FillButtonBase>
  )
);

export type StrokeButtonProps = ComponentProps<typeof StrokeButtonBase> &
  InlineIconProps;
export const StrokeButton = forwardRef<ButtonBaseElements, StrokeButtonProps>(
  ({ icon, iconPosition = 'left', children, size, ...props }, ref) => (
    <StrokeButtonBase ref={ref} size={size} {...props}>
      {inlineIcon(icon, iconPosition, size, children)}
    </StrokeButtonBase>
  )
);

export type TextButtonProps = ComponentProps<typeof TextButtonBase> &
  InlineIconProps;
export const TextButton = forwardRef<ButtonBaseElements, TextButtonProps>(
  ({ icon, iconPosition = 'left', children, size, ...props }, ref) => (
    <TextButtonBase ref={ref} size={size} {...props}>
      {inlineIcon(icon, iconPosition, size, children)}
    </TextButtonBase>
  )
);

/** IconButton — icon-only, wrapped in the (Panda-native) ToolTip, matching
 *  gamut's prop surface: icon, aria-label, tip, tipProps. */
export type IconButtonProps = ComponentProps<typeof IconButtonBase> &
  IconComponentType & {
    'aria-label'?: string;
    tip: string;
    tipProps?: Omit<ToolTipProps, 'info' | 'children'>;
  };
export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  (
    { icon: Icon, 'aria-label': ariaLabel, tip, tipProps, size, ...props },
    ref
  ) => {
    const iconPx = size === 'small' ? 16 : 24;
    return (
      <ToolTip closeOnClick info={tip} {...tipProps}>
        <IconButtonBase
          ref={ref}
          aria-label={ariaLabel ?? tip}
          size={size}
          {...props}
        >
          <Icon size={iconPx} />
        </IconButtonBase>
      </ToolTip>
    );
  }
);
