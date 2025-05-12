import { states, theme, variant } from '@codecademy/gamut-styles';

import {
  beakTopCenterStylesAfter,
  tooltipArrowHeight,
  tooltipBackgroundColor,
  toolTipBodyCss,
} from '../Tip/shared/styles';
import { createVariantsFromAlignments } from '../Tip/shared/utils';
import {
  createBeakVariantFromAlignment,
  createPatternVariantFromAlignment,
} from './utils';

export const transformValues = {
  right: 'translateX(-100%)',
  left: 'translateX(0%)',
  above: 'translateY(-100%)',
  below: 'translateY(0%)',
  center: '',
};

export const popoverAbove = {
  top: 'calc(100% - 10px)',
} as const;

export const popoverBelow = {
  top: '-10px',
} as const;

export const beakRight = {
  right: '25px',
};

export const beakLeft = {
  left: '25px',
};

export const beakXCenter = {
  left: 'calc(50% - 10px)',
};

export const beakYCenter = {
  top: 'calc(50% - 10px)',
};

export const popoverAboveSml = {
  borderLeft: 'none',
  borderTop: 'none',
  top: 'calc(100% - 8px)',
} as const;

export const popoverBelowSml = {
  borderRight: 'none',
  borderBottom: 'none',
  top: '-8px',
} as const;

export const beakRightSml = {
  right: '1.5rem',
  bg: tooltipBackgroundColor,
};

export const beakLeftSml = {
  left: '1.5rem',
  bg: tooltipBackgroundColor,
};

export const beakCenterSml = {
  left: 'calc(50% - 8px)',
};

export const beakYSml = {
  top: 'calc(50% - 8px)',
};

// dedupe these
export const beakCenterSmlAbove = beakTopCenterStylesAfter;

export const beakCenterSmlBelow = {
  backgroundImage: `linear-gradient(to bottom right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const beakCenterRightSml = {
  backgroundImage: `linear-gradient(to top right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
  borderRight: 'none',
  borderTop: 'none',
};

export const beakCenterLeftSml = {
  backgroundImage: `linear-gradient(to bottom left, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
  borderLeft: 'none',
  borderBottom: 'none',
};

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
      borderRadius: 'sm',
    },
    secondary: { ...toolTipBodyCss },
  },
});

const borderStyles = { border: 1 } as const;
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

const beakBoxX = {
  alignItems: 'flex-end',
  height: '15px',
  width: '100%',
  justifyContent: 'center',
  left: 0,
};

const beakBoxY = {
  height: '100%',
  width: '15px',
};

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
    right: {
      left: -8,
      ...beakBoxY,
    },
    left: {
      right: -7,
      ...beakBoxY,
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
  'center-center',
  'center-right-sml',
  'center-left-sml',
];

const beakVariantStyles = createVariantsFromAlignments(
  beakVariantsArray,
  createBeakVariantFromAlignment
);

export const beakVariants = variant({
  base: {
    transform: 'rotate(45deg)',
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

export const patternContainerBaseStyles = {
  bg: 'transparent',
  borderRadius: 'sm',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
} as const;

const patternVariantArray = [
  'above-left',
  'above-right',
  'below-left',
  'below-right',
];

export const patternAbove = {
  top: '-8px',
};

export const patternBelow = {
  top: '8px',
};

export const patternRight = {
  left: '-8px',
};

export const patternLeft = {
  left: '8px',
};

export const patternVariantStyles = createVariantsFromAlignments(
  patternVariantArray,
  createPatternVariantFromAlignment
);
