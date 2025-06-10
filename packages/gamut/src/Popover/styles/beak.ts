import {
  beakBottomStyles,
  beakLeftCenterStyles,
  beakRightCenterStyles,
  beakStylesBase,
  beakTopStyles,
  getBeakBgAndRotation,
  tooltipBgColor,
} from '../../Tip/shared/styles/styles';
import { PopoverProps } from '../types';
import { popoverPrimaryBgColor } from './base';

const positionAbove = {
  top: 'calc(100% - 10px)',
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'above', color: popoverPrimaryBgColor }),
} as const;

const positionBelow = {
  top: '-10px',
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'below', color: popoverPrimaryBgColor }),
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

const positionAboveSml = {
  top: 'calc(100% - 8px)',
  ...beakTopStyles,
} as const;

const positionBelowSml = {
  top: '-8px',
  ...beakBottomStyles,
} as const;

const beakRightSml = {
  right: '1.5rem',
  bg: tooltipBgColor,
};

const beakLeftSml = {
  left: '1.5rem',
  bg: tooltipBgColor,
};

const beakXCenterSml = {
  left: 'calc(50% - 8px)',
};

const beakYCenterSml = {
  top: 'calc(50% - 8px)',
};

const beakRightCenterStylesSml = {
  ...beakRightCenterStyles,
  left: -8,
};
export const beakRightCenterStylesLrg = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'right', color: popoverPrimaryBgColor }),
  left: -10,
};

const beakLeftCenterStylesSml = {
  ...beakLeftCenterStyles,
  right: -8,
};
const beakLeftCenterStylesLrg = {
  ...beakStylesBase,
  ...getBeakBgAndRotation({ alignment: 'left', color: popoverPrimaryBgColor }),
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
  'center-left',
  'center-left-sml',
  'center-right-sml',
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
  const isSml = alignment.includes('sml');
  const isAbove = alignment.includes('above');
  const isBelow = alignment.includes('below');
  const isRight = alignment.includes('right');
  const isXCentered = alignment.includes('-center');
  const isYCentered = alignment.startsWith('center-');

  if (isSml) {
    if (isYCentered) {
      // center-x-sml
      styleObject = { ...beakYCenterSml };
      if (isRight) {
        // center-right-sml
        styleObject = {
          ...styleObject,
          ...beakRightCenterStylesSml,
        };
      } else {
        // center-left-sml
        styleObject = {
          ...styleObject,
          ...beakLeftCenterStylesSml,
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
          styleObject = { ...styleObject, ...beakTopStyles };
        } else if (isBelow) {
          // below-center-sml
          styleObject = { ...styleObject, ...beakBottomStyles };
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
      styleObject = { ...styleObject, ...beakRightCenterStylesLrg };
    } else {
      // center-left
      styleObject = { ...styleObject, ...beakLeftCenterStylesLrg };
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
