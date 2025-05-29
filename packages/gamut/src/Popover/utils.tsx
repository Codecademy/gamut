import {
  beakBottomStylesAfter,
  beakLeftCenterStylesAfter,
  beakRightCenterStylesAfter,
  beakTopStylesAfter,
} from '../Tip/shared/styles';
import {
  beakLeft,
  beakLeftSml,
  beakRight,
  beakRightSml,
  beakXCenter,
  beakXCenterSml,
  beakYCenter,
  beakYCenterSml,
  patternAbove,
  patternBelow,
  patternLeft,
  patternRight,
  popoverAbove,
  popoverBelow,
  positionAboveSml,
  positionBelowSml,
} from './styles';
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
    return align === 'center' ? 'left' : align;
  }
  return position;
};

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
        styleObject = { ...styleObject, ...beakRightCenterStylesAfter };
      } else {
        // center-left-sml
        styleObject = { ...styleObject, ...beakLeftCenterStylesAfter };
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
  } else {
    if (isAbove) {
      // above-x
      styleObject = { ...popoverAbove };
    } else {
      // below-x
      styleObject = { ...popoverBelow };
    }
    if (isRight) {
      // above-right + below-right
      styleObject = { ...styleObject, ...beakRight };
    } else if (isXCentered) {
      // above-center + below-center
      styleObject = { ...styleObject, ...beakXCenter };
    } else {
      // above-left + below-lef
      styleObject = { ...styleObject, ...beakLeft };
    }
  }

  return { ...styleObject };
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
