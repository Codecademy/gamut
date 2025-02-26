import { theme, transitionConcat, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../../ButtonBase/ButtonBase';
import { buttonVariants, templateVariants } from './styles';

const hoverBackgroundTransition = transitionConcat(
  ['background-color', 'box-shadow'],
  'fast',
  'ease-in'
);

export const fillButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    bg: variant,
    color: 'background',
    [ButtonSelectors.OUTLINE]: { borderColor: variant },
    [ButtonSelectors.HOVER]: {
      bg: `${variant}-hover`,
      color: 'background',
      transition: hoverBackgroundTransition,
    },
    [ButtonSelectors.ACTIVE]: {
      borderColor: 'border-primary',
      bg: variant,
      color: 'background',
    },
    [ButtonSelectors.DISABLED]: {
      color: 'text-disabled',
      bg: 'background-disabled',
    },
  })
);

export const textButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    borderColor: 'transparent',
    color: variant === 'interface' ? 'text' : variant,
    [ButtonSelectors.HOVER]: {
      color: variant,
      bg: 'background-hover',
      transition: hoverBackgroundTransition,
    },
    [ButtonSelectors.FOCUS_VISIBLE]: {
      color: variant,
    },
    [ButtonSelectors.OUTLINE]: {
      borderColor: variant,
    },
    [ButtonSelectors.ACTIVE]: {
      color: 'text',
    },
    [ButtonSelectors.DISABLED]: {
      color: 'text-disabled',
      bg: 'transparent',
    },
  })
);

export const strokeButtonVariants = templateVariants(
  buttonVariants,
  (variant) => ({
    borderColor: variant,
    bg: 'transparent',
    color: variant,
    [ButtonSelectors.HOVER]: {
      bg: 'background-hover',
      transition: hoverBackgroundTransition,
    },
    [ButtonSelectors.OUTLINE]: {
      borderColor: variant,
    },
    [ButtonSelectors.ACTIVE]: {
      bg: variant,
      color: 'background',
    },
    [ButtonSelectors.DISABLED]: {
      borderColor: 'background-disabled',
      color: 'text-disabled',
      bg: 'transparent',
    },
  })
);

export const ctaButtonVariants = templateVariants(['primary'], (variant) => ({
  borderRadius: 'md',
  fontFamily: 'accent',
  fontWeight: 'title',
  boxShadow: `-4px 4px 0 0 ${theme.colors.text}`,
  color: 'background',
  py: 12,
  px: 24,
  bg: variant,
  [ButtonSelectors.OUTLINE]: {
    borderColor: variant,
    bottom: -9,
    left: -9,
  },
  [ButtonSelectors.HOVER]: {
    bg: `${variant}-hover`,
    transition: hoverBackgroundTransition,
    boxShadow: `-8px 8px 0 0 ${theme.colors.text}`,
  },
  [ButtonSelectors.ACTIVE]: {
    boxShadow: 'none',
    bg: 'secondary',
  },
  [ButtonSelectors.DISABLED]: {
    boxShadow: 'none',
    color: 'text-disabled',
    bg: 'background-disabled',
  },
}));

export const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'normal',
  base: { fontWeight: 'title' },
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
    large: {
      fontSize: 18,
      height: 56,
      minWidth: 40,
      py: 4,
      px: 16,
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
    large: {
      width: 56,
      height: 56,
    },
  },
});
