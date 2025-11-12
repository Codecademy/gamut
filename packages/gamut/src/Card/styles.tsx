import { theme, timingValues, variant } from '@codecademy/gamut-styles';

export const cardVariants = variant({
  defaultVariant: 'default',
  base: {
    color: 'text',
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
    },
  },
});

export const patternFadeInOut = {
  initial: {
    opacity: 1,
    transition: {
      duration: timingValues.medium / 1000,
      ease: 'easeOut',
    },
  },
  animate: {
    opacity: 0,
    transition: {
      duration: timingValues.medium / 1000,
      ease: 'easeIn',
    },
  },
};

export const hoverShadowLeft = {
  initial: {
    boxShadow: `0px 0px 0 ${theme.colors['shadow-primary']}`,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeOut',
    },
  },
  animate: {
    transform: 'translate(4px, -4px)',
    boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeIn',
    },
  },
};

export const hoverShadowRight = {
  initial: {
    boxShadow: `0px 0px 0 ${theme.colors['shadow-primary']}`,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeOut',
    },
  },
  animate: {
    transform: 'translate(-4px, -4px)',
    boxShadow: `8px 8px 0 ${theme.colors['shadow-primary']}`,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeIn',
    },
  },
};
