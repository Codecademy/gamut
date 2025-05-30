import {
  beakBottomStylesAfter,
  beakLeftCenterStylesAfter,
  beakRightCenterStylesAfter,
  beakTopStylesAfter,
  tooltipBackgroundColor,
} from '../../Tip/shared/styles';
import { PopoverProps } from '../types';

export const positionAbove = {
  top: 'calc(100% - 10px)',
  ...beakTopStylesAfter,
} as const;

export const positionBelow = {
  top: '-10px',
  ...beakBottomStylesAfter,
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

export const positionAboveSml = {
  top: 'calc(100% - 8px)',
  ...beakTopStylesAfter,
} as const;

export const positionBelowSml = {
  top: '-8px',
  ...beakBottomStylesAfter,
} as const;

export const beakRightSml = {
  right: '1.5rem',
  bg: tooltipBackgroundColor,
};

export const beakLeftSml = {
  left: '1.5rem',
  bg: tooltipBackgroundColor,
};

export const beakXCenterSml = {
  left: 'calc(50% - 8px)',
};

export const beakYCenterSml = {
  top: 'calc(50% - 8px)',
};

export const beakRightCenterStylesAfterSml = {
  ...beakRightCenterStylesAfter,
  left: -8,
};
export const beakRightCenterStylesAfterLrg = {
  ...beakRightCenterStylesAfter,
  left: -10,
};

export const beakLeftCenterStylesAfterSml = {
  ...beakLeftCenterStylesAfter,
  right: -7,
};
export const beakLeftCenterStylesAfterLrg = {
  ...beakLeftCenterStylesAfter,
  right: -10,
};

export const beakBoxX = {
  alignItems: 'flex-end',
  height: '15px',
  width: '100%',
  justifyContent: 'center',
  left: 0,
};

export const beakBoxY = {
  height: '100%',
  width: '15px',
};

export const beakVariantsArray = [
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
  'center-right',
  'center-left-sml',
  'center-right-sml',
  'center-left-sml',
];

export const getBeakVariant = ({
  align,
  position,
  beak,
  variant,
}: Pick<PopoverProps, 'align' | 'position' | 'beak' | 'variant'>) => {
  const beakAlignment = position === 'center' ? align : beak;
  return `${position}-${beakAlignment}${variant === 'secondary' ? '-sml' : ''}`;
};

export const createBeakVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  const isAbove = alignment.includes('above');
  const isBelow = alignment.includes('below');
  const isRight = alignment.includes('right');
  const isXCentered = alignment.includes('-center');
  const isYCentered = alignment.startsWith('center-');

  if (alignment.includes('sml')) {
    if (isYCentered) {
      // center-x-sml
      styleObject = { ...beakYCenterSml };
      if (isRight) {
        // center-right-sml
        styleObject = {
          ...styleObject,
          ...beakRightCenterStylesAfterSml,
        };
      } else {
        // center-left-sml
        styleObject = {
          ...styleObject,
          ...beakLeftCenterStylesAfterSml,
        };
      }
    } else {
      if (isAbove) {
        // above-x-sml
        styleObject = { ...positionAboveSml };
      } else {
        // below-x-sml
        styleObject = { ...positionBelowSml };
      }
      if (isRight) {
        // above-right-sml + below-right-sml
        styleObject = { ...styleObject, ...beakRightSml };
      } else if (isXCentered) {
        // above-center-sml + below-center-sml
        styleObject = { ...styleObject, ...beakXCenterSml };
        if (isAbove) {
          // above-center-sml
          styleObject = { ...styleObject, ...beakTopStylesAfter };
        } else if (isBelow) {
          // below-center-sml
          styleObject = { ...styleObject, ...beakBottomStylesAfter };
        }
      } else {
        // above-left-sml + below-left-sml
        styleObject = { ...styleObject, ...beakLeftSml };
      }
    }
  } else if (isYCentered) {
    // center-x
    styleObject = { ...beakYCenter };
    if (isRight) {
      // center-right
      styleObject = { ...styleObject, ...beakRightCenterStylesAfterLrg };
    } else {
      // center-left
      styleObject = { ...styleObject, ...beakLeftCenterStylesAfterLrg };
    }
  } else {
    if (isAbove) {
      // above-x
      styleObject = { ...positionAbove };
    } else {
      // below-x
      styleObject = { ...positionBelow };
    }
    if (isRight) {
      // above-right + below-right
      styleObject = { ...styleObject, ...beakRight };
    } else if (isXCentered) {
      // above-center + below-center
      styleObject = { ...styleObject, ...beakXCenter };
    } else {
      // above-left + below-left
      styleObject = { ...styleObject, ...beakLeft };
    }
  }

  return { ...styleObject };
};
