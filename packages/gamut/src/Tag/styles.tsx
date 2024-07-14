import { variant } from '@codecademy/gamut-styles';

export const tagLabelPadding = 8;
export const tagLabelFontSize = 14;
export const tagBorderRadius = '4px';

export const tagBaseStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tagBorderRadius,
  height: '24px',
  width: 'fit-content',
  maxWidth: '100%',
};

// KENNY: can clean this up? add to base styles or just use CSS
export const colorVariants = variant({
  defaultVariant: 'default',
  base: tagBaseStyles,
  variants: {
    default: {
      color: 'text',
    },
    grey: {
      color: 'text',
    },
  },
});

export const tagBg = {
  light: {
    grey: 'navy-600',
    // grey: 'white-600',
    // grey: 'text-secondary',
    // KENNY: Shouldn't this be navy-800?
    default: 'navy-900',
  },
  dark: {
    grey: 'white-600',
    // grey: 'gray-600',
    // grey: 'text-secondary',
    default: 'white',
  },
} as const;

export const dismissSharedStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minWidth: '24px',
};
