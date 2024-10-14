import {
  fontSmoothPixel,
  modeColorProps,
  styledOptions,
  system,
  transitionConcat,
} from '@codecademy/gamut-styles';
import { CSSObject, ThemeProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { ButtonBase, ButtonSelectors } from '../../ButtonBase/ButtonBase';
import { ButtonBaseProps } from './types';

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
  borderRadius: 'md',
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
    borderRadius: 'lg',
    border: 2,
    inset: -5,
    opacity: 0,
    zIndex: 0,
  },
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
  },
});

export const createButtonComponent = <P>(
  ...args: (<T extends ThemeProps>(props: T) => CSSObject)[]
) =>
  styled(ButtonBase)<ButtonBaseProps & P>(
    fontSmoothPixel,
    modeColorProps,
    buttonStyles,
    ...args,
    buttonProps
  );

export const iconSizeMapping = {
  normal: 24,
  small: 16,
  large: 40,
};
