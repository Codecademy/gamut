import { states, variant } from '@codecademy/gamut-styles';

import {
  tooltipArrowHeight,
  tooltipBackgroundColor,
  toolTipBodyCss,
} from '../ToolTip/styles';
import { createVariantsFromAlignments } from '../ToolTip/utils';
import {
  createBeakVariantFromAlignment,
  createPatternVariantFromAlignment,
} from './utils';

export const popoverStates = states({
  widthRestricted: {
    minWidth: '4rem',
    maxWidth: '16rem',
  },
});

export const raisedDivVariants = variant({
  base: {
    zIndex: 1,
  },
  defaultVariant: 'primary',
  variants: {
    primary: {
      bg: 'background',
      borderRadius: '2px',
    },
    secondary: { ...toolTipBodyCss },
  },
});

export const outlineVariants = variant({
  defaultVariant: 'boxShadow',
  prop: 'outline',
  variants: {
    boxShadow: {
      boxShadow: '0 0 16px rgba(0, 0, 0, 0.1), 0 0 24px rgba(0, 0, 0, 0.15)',
    },
    outline: {
      borderColor: 'secondary',
      border: 1,
      boxShadow: 'none',
    },
  },
});

const beakVariantsArray = [
  'below-left',
  'below-right',
  'below-center',
  'above-left',
  'above-right',
  'above-center',
  'below-left-sml',
  'below-right-sml',
  'below-center-sml',
  'above-left-sml',
  'above-right-sml',
  'above-center-sml',
];

const beakVariantStyles = createVariantsFromAlignments(
  beakVariantsArray,
  createBeakVariantFromAlignment
);

export const beakVariants = variant({
  base: {
    bg: tooltipBackgroundColor,
    position: 'absolute',
    transform: 'rotate(45deg)',
  },
  prop: 'beak',
  variants: beakVariantStyles,
});

export const beakSize = variant({
  prop: 'size',
  defaultVariant: 'lrg',
  variants: {
    sml: {
      bg: tooltipBackgroundColor,
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

const patternVariantArray = [
  'above-left',
  'above-right',
  'below-left',
  'below-right',
];

export const patternVariantStyles = createVariantsFromAlignments(
  patternVariantArray,
  createPatternVariantFromAlignment
);

export const transformValues = {
  right: 'translateX(-100%)',
  left: 'translateX(0%)',
  above: 'translateY(-100%)',
  below: 'translateY(0%)',
};
