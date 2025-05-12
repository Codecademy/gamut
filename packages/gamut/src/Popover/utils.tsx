import {
  beakBottomCenterStylesAfter,
  beakTopCenterStylesAfter,
} from '../Tip/shared/styles';
import {
  beakCenterLeftSml,
  beakCenterRightSml,
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
      styleObject = { ...beakYSml };
      if (isRight) {
        styleObject = { ...beakCenterRightSml, ...styleObject };
      } else {
        styleObject = { ...beakCenterLeftSml, ...styleObject };
      }
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
          styleObject = { ...beakTopCenterStylesAfter, ...styleObject };
        } else if (isBelow) {
          styleObject = { ...beakBottomCenterStylesAfter, ...styleObject };
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
