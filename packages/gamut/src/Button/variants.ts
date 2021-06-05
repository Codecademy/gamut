import { theme, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors, buttonVariants, templateVariants } from './shared';

export const fillButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    bg: variant,
    textColor: 'background',
    [ButtonSelectors.OUTLINE]: { borderColor: variant },
    [ButtonSelectors.HOVER]: {
      bg: `${variant}-hover`,
      textColor: 'background',
    },
    [ButtonSelectors.ACTIVE]: {
      borderColor: 'text',
      bg: variant,
      textColor: 'background',
    },
    [ButtonSelectors.DISABLED]: {
      textColor: 'background-disabled',
      bg: 'text-disabled',
    },
  })
);

export const textButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    borderColor: 'transparent',
    textColor: variant,
    [ButtonSelectors.OUTLINE]: { borderColor: variant },
    [ButtonSelectors.HOVER]: {
      bg: 'background-disabled',
    },
    [ButtonSelectors.ACTIVE]: {
      bg: 'transparent',
      textColor: 'text',
    },
    [ButtonSelectors.DISABLED]: {
      textColor: 'text-disabled',
      bg: 'transparent',
    },
  })
);

export const strokeButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    borderColor: variant,
    bg: 'transparent',
    textColor: variant,
    [ButtonSelectors.OUTLINE]: {
      borderColor: variant,
    },
    [ButtonSelectors.HOVER]: {
      textColor: `${variant}-hover`,
      bg: 'background-disabled',
    },
    [ButtonSelectors.ACTIVE]: {
      bg: variant,
      textColor: 'background',
    },
    [ButtonSelectors.DISABLED]: {
      borderColor: 'text-disabled',
      textColor: 'text-disabled',
      bg: 'transparent',
    },
  })
);

export const ctaButtonVariants = templateVariants(
  ['primary', 'secondary', 'danger'],
  (variant) => ({
    borderRadius: '2px',
    fontFamily: 'accent',
    fontWeight: 'title',
    boxShadow: `-4px 4px 0 0 ${theme.colors.text}`,
    textColor: 'background',
    py: 12,
    px: 24,
    bg: variant,
    [ButtonSelectors.OUTLINE]: {
      borderColor: variant,
      bottom: -9,
      left: -9,
    },
    [ButtonSelectors.HOVER]: {
      boxShadow: `-8px 8px 0 0 ${theme.colors.text}`,
    },
    [ButtonSelectors.ACTIVE]: {
      boxShadow: 'none',
      bg: 'secondary',
    },
    [ButtonSelectors.DISABLED]: {
      boxShadow: 'none',
      bg: 'text-disabled',
    },
  })
);

export const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'normal',
  variants: {
    normal: {
      fontSize: 16,
      height: 40,
      minWidth: 40,
      py: 4,
      px: 16,
    },
    small: {
      fontSize: 14,
      height: 32,
      minWidth: 32,
      py: 4,
      px: 8,
    },
  },
});

export const iconSizeVariants = variant({
  prop: 'size',
  defaultVariant: 'normal',
  variants: {
    normal: {
      height: 40,
      width: 40,
    },
    small: {
      height: 32,
      width: 32,
    },
  },
});
