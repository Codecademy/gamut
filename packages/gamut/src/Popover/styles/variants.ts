import { states, variant } from '@codecademy/gamut-styles';

import { createVariantsFromAlignments } from '../../Tip/shared/styles/createVariantsUtils';
import { tooltipArrowHeight } from '../../Tip/shared/styles/styles';
import { borderStyles } from './base';
import {
  beakBoxX,
  beakBoxY,
  beakVariantsArray,
  createBeakVariantFromAlignment,
} from './beak';
import {
  createPatternVariantFromAlignment,
  patternVariantArray,
} from './pattern';

export const outlineVariants = variant({
  defaultVariant: 'boxShadow',
  prop: 'outline',
  variants: {
    boxShadow: {
      boxShadow: '0 0 16px rgba(0, 0, 0, 0.1), 0 0 24px rgba(0, 0, 0, 0.15)',
    },
    outline: {
      ...borderStyles,
      boxShadow: 'none',
    },
  },
});

export const widthStates = states({
  widthRestricted: {
    minWidth: '4rem',
    maxWidth: '16rem',
  },
});

export const beakBorderStates = states({
  hasBorder: borderStyles,
});

const beakVariantStyles = createVariantsFromAlignments(
  beakVariantsArray,
  createBeakVariantFromAlignment
);

export const beakVariants = variant({
  base: {
    background: 'transparent',
    zIndex: 1,
    position: 'fixed',
  },
  prop: 'beak',
  variants: beakVariantStyles,
});

export const beakSize = variant({
  prop: 'size',
  defaultVariant: 'lrg',
  variants: {
    sml: {
      height: tooltipArrowHeight,
      width: tooltipArrowHeight,
    },
    lrg: {
      bg: 'background',
      height: '20px',
      width: '20px',
    },
  },
});

export const patternVariantStyles = createVariantsFromAlignments(
  patternVariantArray,
  createPatternVariantFromAlignment
);

export const beakBoxVariants = variant({
  base: {
    position: 'absolute',
  },
  variants: {
    above: {
      bottom: -15,
      ...beakBoxX,
    },
    below: {
      top: -15,
      ...beakBoxX,
    },
    center: {
      ...beakBoxY,
    },
  },
});
