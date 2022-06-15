import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { toolTipBodyAlignments, toolTipBodyCss } from '../ToolTip/elements';

const outlineState = states({
  outline: {
    borderColor: 'secondary',
    border: 1,
    boxShadow: 'none',
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
    sml: { ...toolTipBodyCss },
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
  },
});

const beakSize = variant({
  prop: 'size',
  variants: {
    sml: {
      height: '1rem',
      width: '1rem',
    },
    lrg: {
      height: '20px',
      width: '20px',
    },
  },
});

export const Beak = styled.div<
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
