import { theme, timingValues, variant } from '@codecademy/gamut-styles';

const SHADOW_OFFSET = 8;
const SHADOW_OFFSET_INITIAL = 6;
const TRANSFORM_OFFSET = 4;

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
      boxShadow: `-${SHADOW_OFFSET}px ${SHADOW_OFFSET}px ${theme.colors['background-current']}, -${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 1px ${theme.colors['border-primary']}`,
    },
  },
});

export const patternFadeInOut = {
  initial: {
    opacity: 1,
    transition: {
      duration: timingValues.medium / 1000,
      ease: 'easeOut' as const,
    },
  },
  animate: {
    opacity: 0,
    transition: {
      duration: timingValues.medium / 1000,
      ease: 'easeIn' as const,
    },
  },
};

export const hoverShadowLeft = (borderRadius?: string) => ({
  initial: {
    boxShadow: `0px 0px 0 ${theme.colors['shadow-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeOut' as const,
    },
  },
  initialOutline: {
    boxShadow: `-${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 0px ${theme.colors['background-current']}, -${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 1px ${theme.colors['border-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeOut' as const,
    },
  },
  animate: {
    transform: `translate(${TRANSFORM_OFFSET}px, -${TRANSFORM_OFFSET}px)`,
    boxShadow: `-${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 ${theme.colors['shadow-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeIn' as const,
    },
  },
  animateOutline: {
    transform: `translate(${TRANSFORM_OFFSET}px, -${TRANSFORM_OFFSET}px)`,
    boxShadow: `-${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 0px ${theme.colors['shadow-primary']}, -${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 1px ${theme.colors['shadow-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeIn' as const,
    },
  },
});

export const hoverShadowRight = (borderRadius?: string) => ({
  initial: {
    boxShadow: `0px 0px 0 ${theme.colors['shadow-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeOut' as const,
    },
  },
  animate: {
    transform: `translate(-${TRANSFORM_OFFSET}px, -${TRANSFORM_OFFSET}px)`,
    boxShadow: `${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 ${theme.colors['shadow-primary']}`,
    borderRadius,
    transition: {
      duration: timingValues.fast / 1000,
      ease: 'easeIn' as const,
    },
  },
});
