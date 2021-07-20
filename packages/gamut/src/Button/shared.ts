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
  variants: ReadonlyArray<Variant>,
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

export const buttonVariants = ['primary', 'secondary', 'danger'] as const;

export const buttonStyles = system.css({
  position: 'relative',
  fontWeight: 'title',
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

export interface ButtonProps
  extends ComponentProps<typeof ButtonBase>,
    StyleProps<typeof buttonProps> {
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  variant?: typeof buttonVariants[number];
  size?: 'normal' | 'small';
  as?: never;
  mode?: ColorModes;
}

export const createButtonComponent = <P>(
  ...args: (<T extends ThemeProps>(props: T) => CSSObject)[]
) =>
  styled(ButtonBase)<ButtonProps & P>(
    fontSmoothPixel,
    modeColorProps,
    buttonStyles,
    ...args,
    buttonProps
  );
