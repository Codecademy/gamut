import { theme } from '@codecademy/gamut-styles';

import {
  alignedStylesAfter,
  tooltipBackgroundColor,
} from '../Tip/shared/styles';
import { PopoverProps } from './types';

export const getBeakFromAlignment = ({
  align = 'left',
  position = 'below',
}: Pick<PopoverProps, 'beak' | 'align' | 'position'>):
  | 'above'
  | 'below'
  | 'left'
  | 'right' => {
  if (position === 'center') {
    return align;
  }
  return position;
};

const popoverAbove = {
  borderLeft: 'none',
  borderTop: 'none',
  top: 'calc(100% - 10px)',
} as const;

const popoverBelow = {
  borderRight: 'none',
  borderBottom: 'none',
  top: '-10px',
} as const;

const beakRight = {
  right: '25px',
};

const beakLeft = {
  left: '25px',
};

const beakXCenter = {
  left: 'calc(50% - 10px)',
};

const beakYCenter = {
  top: 'calc(50% - 10px)',
};

const popoverAboveSml = {
  borderLeft: 'none',
  borderTop: 'none',
  top: 'calc(100% - 8px)',
} as const;

const popoverBelowSml = {
  borderRight: 'none',
  borderBottom: 'none',
  top: '-8px',
} as const;

const beakRightSml = {
  right: '1.5rem',
  bg: tooltipBackgroundColor,
};

const beakLeftSml = {
  left: '1.5rem',
  bg: tooltipBackgroundColor,
};

const beakCenterSml = {
  left: 'calc(50% - 8px)',
};

const beakYSml = {
  top: 'calc(50% - 8px)',
};

const beakYLeftSml = {
  left: '-7px',
};

const beakYRightSml = {
  right: '7px',
};
const beakCenterSmlAbove = {
  backgroundImage: `linear-gradient(to top left, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

const beakCenterSmlBelow = {
  backgroundImage: `linear-gradient(to bottom right, ${theme.colors[tooltipBackgroundColor]} 55%, rgba(0,0,0,0) 20%)`,
};

export const createBeakVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  const isAbove = alignment.includes('above');
  const isBelow = alignment.includes('below');
  const isRight = alignment.includes('right');
  const isXCenter = alignment.includes('-center');
  const isYCenter = alignment.includes('center-');

  if (alignment.includes('sml')) {
    if (isYCenter) {
      styleObject = { ...beakYSml };
    } else {
      if (isAbove) {
        styleObject = { ...popoverAboveSml };
      } else {
        styleObject = { ...popoverBelowSml };
      }
      if (isRight) {
        styleObject = { ...beakRightSml, ...styleObject };
      } else if (isXCenter) {
        styleObject = { ...beakCenterSml, ...styleObject };
        if (isAbove) {
          styleObject = { ...beakCenterSmlAbove, ...styleObject };
        } else if (isBelow) {
          styleObject = { ...beakCenterSmlBelow, ...styleObject };
        }
      } else {
        styleObject = { ...beakLeftSml, ...styleObject };
      }
    }
  } else if (isYCenter) {
    styleObject = { ...beakYCenter };
  } else {
    if (isAbove) {
      styleObject = { ...popoverAbove };
    } else {
      styleObject = { ...popoverBelow };
    }
    if (isRight) {
      styleObject = { ...beakRight, ...styleObject };
    } else if (isXCenter) {
      styleObject = { ...beakXCenter, ...styleObject };
    } else {
      styleObject = { ...beakLeft, ...styleObject };
    }
  }

  return { ...styleObject };
};

const patternAbove = {
  top: '-8px',
};

const patternBelow = {
  top: '8px',
};

const patternRight = {
  left: '-8px',
};

const patternLeft = {
  left: '8px',
};

export const createPatternVariantFromAlignment = (alignment: string) => {
  let styleObject = {};

  if (alignment.includes('above')) {
    styleObject = { ...patternAbove };
  } else {
    styleObject = { ...patternBelow };
  }
  if (alignment.includes('right')) {
    styleObject = { ...patternRight, ...styleObject };
  } else {
    styleObject = { ...patternLeft, ...styleObject };
  }

  return { ...styleObject };
};
