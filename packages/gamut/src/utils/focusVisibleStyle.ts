import { theme } from '@codecademy/gamut-styles';

export const focusVisibleStyle = (outlineOffset = '4px') => ({
  '&:focus-visible': {
    outlineOffset,
    /*
    We use !important here to ensure this overrides other browser default focus styles.
     Gamut's reset css does a good job wiping most of these out but this accounts for some edge cases.
    */
    outline: `2px solid ${theme.colors.primary} !important`,
  },
});
