import { states, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';


export const tagLabelFontSize = 14;

export const tagBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100%',
  width: 'fit-content',
};

export const colorVariants = variant({
  defaultVariant: 'readOnly',
  base: {
    ...tagBaseStyles,
    borderRadius: 'md',
  },
  variants: {
    readOnly: {
      bg: 'text-secondary',
      color: 'background',
      borderRadius: 'none',
    },
    selection: {
      bg: 'text-secondary',
      color: 'background',
      borderRadiusRight: 'none',
    },
    navigation: {
      border: 1,
      borderColor: 'border-secondary',
    },
    suggestion: {
      border: 1,
      borderColor: 'primary',
    }
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
      minHeight: 24,
    },
    large: {
      minHeight: 32,
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
