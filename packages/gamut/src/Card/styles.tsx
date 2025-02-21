import { states, theme, variant } from '@codecademy/gamut-styles';

import { ButtonSelectors } from '../ButtonBase/ButtonBase';

export const cardVariants = variant({
  defaultVariant: 'default',
  base: {
    border: 1,
    borderRadius: 'md',
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

export const hoverState = states({
  isInteractive: {
    '&:hover': {
      transition: 'box-shadow 200ms ease',
      boxShadow: `0px 0px ${theme.colors['shadow-primary']}`,
    },
  },
});

export const patternHoverState = states({
  hidePattern: {
    [ButtonSelectors.HOVER]: {
      display: 'none',
    },
  },
});

export const cardAnchorVariants = variant({
  prop: 'hoverState',
  base: {
    color: 'text',
    width: 1,
    borderRadius: 'md',
  },
  variants: {
    default: {
      [ButtonSelectors.HOVER]: {
        transform: 'translate(4px, -4px)',
        boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      },
    },
    hoverRight: {
      [ButtonSelectors.HOVER]: {
        transform: 'translate(-4px, -4px)',
        boxShadow: `8px 8px 0 ${theme.colors['shadow-primary']}`,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      },
    },
  },
});
