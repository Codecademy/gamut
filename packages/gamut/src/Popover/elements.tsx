import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';
import {
  tooltipArrowHeight,
  toolTipBodyAlignments,
  toolTipBodyCss,
} from '../ToolTip/styles';

const outlineState = states({
  outline: {
    borderColor: 'secondary',
    border: 1,
    boxShadow: 'none',
  },
  widthRestricted: {
    minWidth: '4rem',
    maxWidth: '16rem',
  },
});

const raisedDivVariants = variant({
  prop: 'size',
  variants: {
    lrg: {
      bg: 'background',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 0 16px rgba(0, 0, 0, 0.1), 0 0 24px rgba(0, 0, 0, 0.15)',
      zIndex: 1,
    },
    sml: { ...toolTipBodyCss, zIndex: 1 },
  },
});

export const RaisedDiv = styled.div<
  StyleProps<typeof outlineState> &
    StyleProps<typeof toolTipBodyAlignments> &
    StyleProps<typeof raisedDivVariants>
>(outlineState, toolTipBodyAlignments, raisedDivVariants);

const popoverAbove = {
  borderRight: 'inherit',
  borderBottom: 'inherit',
  top: 'calc(100% - 10px)',
} as const;

const popoverBelow = {
  borderLeft: 'inherit',
  borderTop: 'inherit',
  top: '-10px',
} as const;

const beakRight = {
  right: '25px',
};

const beakLeft = {
  left: '25px',
};

const popoverAboveSml = {
  borderRight: 'inherit',
  borderBottom: 'inherit',
  top: 'calc(100% - 8px)',
} as const;

const popoverBelowSml = {
  borderLeft: 'inherit',
  borderTop: 'inherit',
  top: '-8px',
} as const;

const beakRightSml = {
  right: '1.5rem',
};

const beakLeftSml = {
  left: '1.5rem',
};

const beakVariants = variant({
  base: {
    bg: 'background-current',
    position: 'absolute',
    transform: 'rotate(45deg)',
  },
  prop: 'beak',
  variants: {
    'below-left': {
      ...popoverBelow,
      ...beakLeft,
    },
    'below-right': {
      ...popoverBelow,
      ...beakRight,
    },

    'above-left': {
      ...popoverAbove,
      ...beakLeft,
    },
    'above-right': {
      ...popoverAbove,
      ...beakRight,
    },
    'below-left-sml': {
      ...popoverBelowSml,
      ...beakLeftSml,
    },
    'below-right-sml': {
      ...popoverBelowSml,
      ...beakRightSml,
    },
    'above-left-sml': {
      ...popoverAboveSml,
      ...beakLeftSml,
    },
    'above-right-sml': {
      ...popoverAboveSml,
      ...beakRightSml,
    },
  },
});

const beakSize = variant({
  prop: 'size',
  variants: {
    sml: {
      height: tooltipArrowHeight,
      width: tooltipArrowHeight,
    },
    lrg: {
      height: '20px',
      width: '20px',
    },
  },
});

// TO-DO -- prob should use variance compose, only needs left

export const Beak = styled(Box)<
  StyleProps<typeof outlineState> &
    StyleProps<typeof beakVariants> &
    StyleProps<typeof beakSize>
>(beakVariants, beakSize);

const patternBelow = {
  top: '8px',
};

const patternAbove = {
  top: '-8px',
};

const patternLeft = {
  left: '8px',
};

const patternRight = {
  left: '-8px',
};

export const PatternContainer = styled.div(
  variant({
    base: {
      width: '100%',
      height: '100%',
      borderRadius: '2px',
      overflow: 'hidden',
      bg: 'background',
      position: 'absolute',
    },
    variants: {
      'below-left': {
        ...patternBelow,
        ...patternLeft,
      },
      'below-right': {
        ...patternBelow,
        ...patternRight,
      },
      'above-left': {
        ...patternAbove,
        ...patternLeft,
      },
      'above-right': {
        ...patternAbove,
        ...patternRight,
      },
    },
  })
);
