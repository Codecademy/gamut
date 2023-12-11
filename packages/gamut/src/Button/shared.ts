import { GamutIconProps } from '@codecademy/gamut-icons';
import {
  ColorModes,
  fontSmoothPixel,
  modeColorProps,
  styledOptions,
  system,
  transitionConcat,
} from '@codecademy/gamut-styles';
import {
  CSSObject,
  StyleProps,
  ThemeProps,
  variance,
} from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, HTMLProps } from 'react';

import { ButtonBase, ButtonSelectors } from '../ButtonBase/ButtonBase';

export const config = styledOptions<'button', 'size'>(['size']);

export const buttonProps = variance.compose(
  system.layout,
  system.positioning,
  system.space,
  system.border
);

export const templateVariants = <Variant extends string, Styles>(
  variants: readonly Variant[],
  template: (colors: Variant) => Styles
) => {
  const variantConfig = {} as Record<Variant, ReturnType<typeof template>>;
  variants.forEach((key: Variant) => {
    variantConfig[key] = template(key);
  });
  return system.variant({
    defaultVariant: variants[0],
    variants: variantConfig,
  });
};

export const buttonVariants = [
  'primary',
  'secondary',
  'danger',
  'interface',
] as const;

export const buttonStyles = system.css({
  position: 'relative',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 2,
  borderRadius: '4px',
  borderColor: 'transparent',
  transition: transitionConcat(
    ['border-color', 'color', 'background-color', 'box-shadow'],
    'fast',
    'ease-in'
  ),
  [ButtonSelectors.SHADOW]: {
    content: '""',
    transition: transitionConcat(['opacity'], 'fast', 'ease-in'),
    position: 'absolute',
    borderRadius: '4px',
    bg: 'text',
    inset: -2,
    opacity: 0,
    zIndex: 0,
  },
  [ButtonSelectors.SHADOW_HOVER]: {
    opacity: 0.06,
  },
  [ButtonSelectors.SHADOW_ACTIVE]: {
    opacity: 0.025,
  },
  [ButtonSelectors.SHADOW_DISABLED]: {
    opacity: 0,
  },
  [ButtonSelectors.DISABLED]: {
    cursor: 'not-allowed',
    userSelect: 'none',
  },
  [ButtonSelectors.OUTLINE]: {
    content: '""',
    transition: transitionConcat(['opacity'], 'fast'),
    position: 'absolute',
    borderRadius: '6px',
    border: 2,
    inset: -5,
    opacity: 0,
    zIndex: 0,
  },
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
  },
});

export interface ButtonBaseProps
  extends ComponentProps<typeof ButtonBase>,
    StyleProps<typeof buttonProps> {
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  variant?: typeof buttonVariants[number];
  size?: 'normal' | 'small' | 'large';
  as?: never;
  mode?: ColorModes;
  icon?: React.ComponentType<GamutIconProps>;
}

export interface CTAIconTestProps extends ButtonBaseProps {
  icon?: never;
}
export interface IconInnerButtonProps extends ButtonBaseProps {
  'aria-label': string;
}

export interface IconButtonProps extends IconInnerButtonProps {
  icon: React.ComponentType<GamutIconProps>;
}

export interface ButtonIconVariantProps extends ButtonBaseProps {
  'aria-label'?: string;
  iconSide?: 'right' | 'left';
}

export type ButtonProps =
  | ButtonBaseProps
  | IconButtonProps
  | ButtonIconVariantProps;

export type ButtonTypes = 'CTA' | 'Icon' | 'Fill' | 'Stroke' | 'Text';

export const createButtonComponent = <P>(
  buttonType: ButtonTypes,
  ...args: (<T extends ThemeProps>(props: T) => CSSObject)[]
) => {
  if (buttonType === 'CTA') {
    return styled(ButtonBase)<CTAIconTestProps & P>(
      fontSmoothPixel,
      modeColorProps,
      buttonStyles,
      ...args,
      buttonProps
    );
  }
  if (buttonType === 'Icon') {
    return styled(ButtonBase)<IconInnerButtonProps & P>(
      fontSmoothPixel,
      modeColorProps,
      buttonStyles,
      ...args,
      buttonProps
    );
  }

  return styled(ButtonBase)<ButtonIconVariantProps & P>(
    fontSmoothPixel,
    modeColorProps,
    buttonStyles,
    ...args,
    buttonProps
  );
};
