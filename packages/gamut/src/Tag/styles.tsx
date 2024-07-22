import { variant } from '@codecademy/gamut-styles';

export const tagLabelPadding = 8;
export const tagLabelFontSize = 14;
export const tagBorderRadius = '4px';

export const tagBaseStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: "4px 0 0 4px",
  height: '24px',
  width: 'fit-content',
  maxWidth: '100%',
};

// KENNY: can clean this up? add to base styles or just use CSS
export const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    ...tagBaseStyles,
    color: 'background',
    borderRight: 'transparent',
  },
  variants: {
    default: {
      bg: 'secondary',
    },
    grey: {
      bg: 'text-secondary',
    },
  },
});

export const dismissSharedStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minWidth: '24px',
  '&::before, &::after': {
    display: 'none',
  }
};
