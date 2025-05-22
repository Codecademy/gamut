import {
  beakBottomStylesAfter,
  beakLeftCenterStylesAfter,
  beakRightCenterStylesAfter,
  beakTopStylesAfter,
} from '../Tip/shared/styles';
import {
  beakCenterSml,
  beakLeft,
  beakLeftSml,
  beakRight,
  beakRightSml,
  beakXCenter,
  beakYCenter,
  beakYSml,
  patternAbove,
  patternBelow,
  patternLeft,
  patternRight,
  popoverAbove,
  popoverAboveSml,
  popoverBelow,
  popoverBelowSml,
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
  const isXCenter = alignment.includes('-center');
  const isYCenter = alignment.startsWith('center-');

  if (alignment.includes('sml')) {
    if (isYCenter) {
      // center-x-sml
      styleObject = { ...beakYSml };
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
        styleObject = { ...popoverAboveSml };
      } else {
        // below-x-sml
        styleObject = { ...popoverBelowSml };
      }
      if (isRight) {
        // above-right-sml + below-right-sml
        styleObject = { ...styleObject, ...beakRightSml };
      } else if (isXCenter) {
        // above-center-sml + below-center-sml
        styleObject = { ...styleObject, ...beakCenterSml };
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
  } else if (isYCenter) {
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
    } else if (isXCenter) {
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
