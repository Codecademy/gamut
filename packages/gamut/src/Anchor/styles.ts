import { variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';

const outlineFocusVisible = {
  [ButtonSelectors.OUTLINE]: {
    content: "''",
    position: 'absolute',
    inset: -4,
    borderRadius: 'md',
    border: 2,
    borderColor: 'primary',
    opacity: 0,
    zIndex: 0,
  },

  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: {
    opacity: 1,
  },
} as const;

const underlineFocusVisible = {
  [ButtonSelectors.FOCUS_VISIBLE]: {
    outline: 'currentColor solid 2px',
    borderRadius: 'sm',
    outlineOffset: '1.5px',
    textDecoration: 'underline',
  },
} as const;

export const anchorVariants = variant({
  base: {
    display: 'inline-block',
    bg: 'transparent',
    boxShadow: 'none',
    border: 'none',
    p: 0,
    fontSize: 'inherit',
    position: 'relative',
    color: 'primary',
    whiteSpace: 'nowrap',
    [ButtonSelectors.HOVER]: {
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [ButtonSelectors.DISABLED]: {
      cursor: 'not-allowed',
      textDecoration: 'none',
      color: 'text-disabled',
    },
  },
  variants: {
    standard: {
      color: 'primary',
      fontWeight: 'bold',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      [ButtonSelectors.HOVER]: {
        textDecoration: 'underline',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        outline: 'none',
      },
      ...outlineFocusVisible,
    },
    inline: {
      display: 'inline',
      whiteSpace: 'initial',
      textDecoration: 'underline',
      ...underlineFocusVisible,
    },
    interface: {
      color: 'text',
      whiteSpace: 'initial',
      [ButtonSelectors.HOVER]: {
        color: 'primary',
      },
      [ButtonSelectors.FOCUS_VISIBLE]: {
        color: 'primary',
        outline: 'none',
      },
      ...outlineFocusVisible,
    },
    'standard-secondary': {
      color: 'text',
      textDecoration: 'underline',
      ...underlineFocusVisible,
    },
  },
});
