import { states, theme, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';

export const cardVariants = variant({
  defaultVariant: 'default',
  base: {
    border: 1,
    p: 16,
    color: 'text',
    maxWidth: '100%',
    position: 'relative',
  },
  variants: {
    default: {
      bg: 'background',
    },
    white: {
      bg: 'white',
    },
    yellow: {
      bg: 'yellow',
    },
    beige: {
      bg: 'beige',
    },
    navy: {
      bg: 'navy',
    },
    hyper: {
      bg: 'hyper',
    },
  },
});

export const shadowVariants = variant({
  defaultVariant: 'none',
  prop: 'shadow',
  variants: {
    none: {},
    patternLeft: {},
    patternRight: {},
    outline: {
      boxShadow: `-6px 6px ${theme.colors['background-current']}, -6px 6px 0 1px ${theme.colors['border-primary']}`,
      transition: 'box-shadow 200ms ease, transform 200ms ease',
    },
  },
});

export const hoverShadowVariant = variant({
  defaultVariant: 'default',
  prop: 'hoverShadow',
  variants: {
    default: {},
    shadowLeft: {
      [ButtonSelectors.HOVER]: {
        transform: 'translate(4px, -4px)',
        boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
        // boxShadow: `-8px 8px 0 navy`,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      },
    },
    shadowRight: {
      [ButtonSelectors.HOVER]: {
        transform: 'translate(-4px, -4px)',
        boxShadow: `8px 8px 0 ${theme.colors['shadow-primary']}`,
        // boxShadow: `-8px 8px 0 navy`,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      },
    },
  },
});

export const patternState = states({
  hidePattern: {
    display: 'none',
  }
})
