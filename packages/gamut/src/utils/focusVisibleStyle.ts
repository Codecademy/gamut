import { theme } from '@codecademy/gamut-styles';

export const focusVisibleStyle = (outlineOffset = '4px') => ({
  '&:focus-visible': {
    outlineOffset,
    outline: `2px solid ${theme.colors.primary} !important`,
  },
});
