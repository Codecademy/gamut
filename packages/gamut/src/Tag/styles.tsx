import { states, variant } from '@codecademy/gamut-styles';
import { background } from '@codecademy/gamut-styles/dist/variance/props';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';

export const tagLabelPadding = 8;
export const tagLabelFontSize = 14;

export const tagBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100%',
  width: 'fit-content',
};

export const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    ...tagBaseStyles,
    color: 'text',
    borderRadius: 'md',
  },
  variants: {
    default: {
      bg: 'text-secondary',
      color: 'background',
      borderRadius: 'none',
    },
    grey: {
      bg: 'text-secondary',
    },
  },
});

export const sizeVariants = variant({
  defaultVariant: 'default',
  prop: 'size',
  base: {
    px: 8,
  },
  variants: {
    default: {
      height: 24,
    },
    large: {
      height: 32,
      py: 4,
    },
  },
})

export const tagWrapperStates = states({
  readOnly: {
    borderRadius: 'md',
  },
});

export const dismissSharedStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  minWidth: '24px',
};

export const iconButtonOverrides = {
  // These pseudo elements add an extra slightly opaque border on hover/focus
  '::before, ::after': {
    display: 'none',
  },
  // This removes a black solid outline on focus
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 0,
  },
};
