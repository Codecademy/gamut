import {
  ElevationState,
  theme,
  timingValues,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { Theme, useTheme } from '@emotion/react';

import type { CardWrapperProps } from './types';

/**
 * The theme's elevation scale is flattened to dashcase tokens (`rest-shadow`,
 * `hoverMirrored-transform`, ...), so per-state groups don't exist on the
 * theme at runtime. This regroups one state's tokens into a spreadable style
 * object, mapping the `shadow` token onto the `boxShadow` property
 * framer-motion animates.
 */
const getElevationStyles = (
  elevation: Theme['elevation'],
  state: ElevationState
) => ({
  boxShadow: elevation[`${state}-shadow`],
  transform: elevation[`${state}-transform`],
});

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

export const useCardElevation = (
  shadow: StyleProps<typeof shadowVariants>['shadow'],
  borderRadius: CardWrapperProps['borderRadius']
) => {
  const { borderRadii, elevation } = useTheme();
  const hoverState: ElevationState =
    shadow === 'patternRight' ? 'hoverMirrored' : 'hover';

  // framer-motion can only animate a concrete value, so responsive or
  // function-valued radii are not resolved
  const resolvedBorderRadius =
    typeof borderRadius === 'string'
      ? borderRadii[borderRadius as keyof Theme['borderRadii']] ?? borderRadius
      : undefined;

  return {
    initial: {
      ...getElevationStyles(elevation, 'rest'),
      borderRadius: resolvedBorderRadius,
      transition: REST_TRANSITION,
    },
    animate: {
      ...getElevationStyles(elevation, hoverState),
      borderRadius: resolvedBorderRadius,
      transition: HOVER_TRANSITION,
    },
    // Outline styles are specific to Codecademy and will not be included in a theme
    initialOutline: {
      ...getElevationStyles(elevation, 'rest'),
      boxShadow: `-${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 0px ${theme.colors['background-current']}, -${SHADOW_OFFSET_INITIAL}px ${SHADOW_OFFSET_INITIAL}px 0 1px ${theme.colors['border-primary']}`,
      borderRadius: resolvedBorderRadius,
      transition: REST_TRANSITION,
    },
    animateOutline: {
      ...getElevationStyles(elevation, 'hover'),
      boxShadow: `-${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 0px ${theme.colors['shadow-primary']}, -${SHADOW_OFFSET}px ${SHADOW_OFFSET}px 0 1px ${theme.colors['shadow-primary']}`,
      borderRadius: resolvedBorderRadius,
      transition: HOVER_TRANSITION,
    },
  };
};
