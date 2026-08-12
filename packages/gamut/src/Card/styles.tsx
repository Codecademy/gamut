import { theme, timingValues, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { useTheme } from '@emotion/react';

const SHADOW_OFFSET = 8;
const SHADOW_OFFSET_INITIAL = 6;

const REST_TRANSITION = {
  duration: timingValues.fast / 1000,
  ease: 'easeOut',
} as const;

const HOVER_TRANSITION = {
  duration: timingValues.fast / 1000,
  ease: 'easeIn',
} as const;

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

/**
 * Motion variants for a Card's hover elevation, read from the active theme's
 * `elevation` scale so each theme controls its own shadow and lift.
 * `patternRight` cards cast their shadow on the opposite side, so they use the
 * `hoverMirrored` tokens.
 */
export const useCardElevation = (
  shadow: StyleProps<typeof shadowVariants>['shadow'],
  borderRadius?: string
) => {
  const { elevation } = useTheme();
  const isMirrored = shadow === 'patternRight';

  return {
    initial: {
      boxShadow: elevation['rest-shadow'],
      transform: elevation['rest-transform'],
      borderRadius,
      transition: REST_TRANSITION,
    },
    initialOutline: {
      boxShadow: `-${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 0px ${theme.colors['background-current']}, -${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 1px ${theme.colors['border-primary']}`,
      transform: elevation['rest-transform'],
      borderRadius,
      transition: REST_TRANSITION,
    },
    animate: {
      boxShadow: isMirrored
        ? elevation['hoverMirrored-shadow']
        : elevation['hover-shadow'],
      transform: isMirrored
        ? elevation['hoverMirrored-transform']
        : elevation['hover-transform'],
      borderRadius,
      transition: HOVER_TRANSITION,
    },
    animateOutline: {
      boxShadow: `-${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 0px ${theme.colors['shadow-primary']}, -${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 1px ${theme.colors['shadow-primary']}`,
      transform: elevation['hover-transform'],
      borderRadius,
      transition: HOVER_TRANSITION,
    },
  };
};
