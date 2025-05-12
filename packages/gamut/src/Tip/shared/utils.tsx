import { timingValues } from '@codecademy/gamut-styles';

import {
  PopoverProps,
  PopoverXPositionType,
  PopoverYPositionType,
} from '../../Popover';
import {
  beakBottomCenterStylesAfter,
  beakTopCenterStylesAfter,
  beforeStylesHorizontal,
  bottomStyles,
  bottomStylesAfter,
  bottomStylesBefore,
  centerHorizontal,
  horizontalCenterStyles,
  leftAlignStyles,
  leftAlignStylesAfter,
  leftVertStyles,
  leftVertStylesAfter,
  rightAlignStyles,
  rightAlignStylesAfter,
  rightVertStyles,
  rightVertStylesAfter,
  topStyles,
  topStylesAfter,
  topStylesBefore,
  verticalCenterStyles,
  verticalCenterStylesAfter,
} from './styles';
import { TipPlacementComponentProps, TipWrapperProps } from './types';

export const runWithDelay = (func: () => void) => {
  return setTimeout(func, timingValues?.base);
};

export const getAlignmentStyles = ({
  alignment,
  avatar,
  type,
}: Pick<TipWrapperProps, 'alignment' | 'avatar' | 'type'>) => {
  if (avatar) return 'avatarAligned';
  if (type === 'preview') return 'previewAligned';
  if (alignment.startsWith('left') || alignment.startsWith('right'))
    return 'horizontalCenter';
  return alignment.includes('center') ? 'vertCenter' : 'aligned';
};

export const getPopoverAlignment = ({
  alignment = 'top-left',
  type,
}: Partial<Pick<TipPlacementComponentProps, 'alignment' | 'type'>>):
  | (PopoverXPositionType & Pick<PopoverProps, 'align'>)
  | (PopoverYPositionType & Pick<PopoverProps, 'align'>) => {
  const popoverAlignment: PopoverYPositionType & Pick<PopoverProps, 'align'> = {
    align: 'right',
    beak: 'right',
    position: 'above',
  };

  if (type === 'tool') {
    popoverAlignment.align = 'center';
  }

  if (alignment.includes('center')) {
    popoverAlignment.beak = 'center';
  }

  if (alignment.includes('right-') || alignment.includes('left-')) {
    if (alignment.includes('left-')) {
      popoverAlignment.align = 'left';
    } else {
      popoverAlignment.align = 'right';
    }
    return {
      beak: 'center',
      position: 'center',
      align: popoverAlignment.align,
    };
  }

  if (alignment.includes('bottom')) popoverAlignment.position = 'below';

  if (alignment.includes('-right')) {
    popoverAlignment.align = 'left';
    popoverAlignment.beak = 'left';
  }

  return popoverAlignment;
};
/**
 *
 * to-do: add l/r center align vars here
 *
 */
export const createToolTipVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  let styleObjectAfter = {};
  let styleObjectBefore = {};

  const isRight = alignment.includes('right');
  const isTop = alignment.includes('top');
  const isCenter = alignment.includes('center');
  const isLRAligned =
    alignment.startsWith('right') || alignment.startsWith('left');

  // top-center, top-right, + top-left styles
  if (isTop) {
    styleObject = { ...topStyles };
    styleObjectAfter = { ...topStylesAfter };
    styleObjectBefore = { ...topStylesBefore };
    // bottom-center, bottom-right, + bottom-left styles
  } else if (alignment.includes('bottom')) {
    styleObject = { ...bottomStyles };
    styleObjectAfter = { ...bottomStylesAfter };
    styleObjectBefore = { ...bottomStylesBefore };
  } else if (isLRAligned) {
    // right-center & left-center styles
    styleObject = { ...horizontalCenterStyles };
    styleObjectAfter = { ...centerHorizontal };
    styleObjectBefore = { ...beforeStylesHorizontal };
    // right-center styles
    if (isRight) {
      styleObject = { ...styleObject, ...rightAlignStyles };
      styleObjectAfter = { ...styleObjectAfter, ...rightAlignStylesAfter };
      // left-center styles
    } else {
      styleObject = { ...styleObject, ...leftAlignStyles };
      styleObjectAfter = { ...styleObjectAfter, ...leftAlignStylesAfter };
    }
  }

  // top-center + bottom-center styles
  if (isCenter && !isLRAligned) {
    styleObject = { ...styleObject, ...verticalCenterStyles };
    styleObjectAfter = { ...styleObjectAfter, ...verticalCenterStylesAfter };
    // top-center
    if (isTop) {
      styleObjectAfter = { ...styleObjectAfter, ...beakTopCenterStylesAfter };
      // bottom-center
    } else {
      styleObjectAfter = {
        ...styleObjectAfter,
        ...beakBottomCenterStylesAfter,
      };
    }
  } else if (!isCenter && !isLRAligned) {
    // top-right, bottom-right
    if (isRight) {
      styleObject = { ...styleObject, ...rightVertStyles };
      styleObjectAfter = { ...styleObjectAfter, ...rightVertStylesAfter };
    } else {
      // top-left, bottom-left
      styleObject = { ...styleObject, ...leftVertStyles };
      styleObjectAfter = { ...styleObjectAfter, ...leftVertStylesAfter };
    }
  }

  return {
    ...styleObject,
    '&::after': styleObjectAfter,
    '&::before': styleObjectBefore,
  };
};

export const createVariantsFromAlignments = (
  array: readonly string[],
  composeStyleObjectFunc: (alignment: string) => {}
) => {
  const variantsObject = Object.fromEntries(
    array.map((alignment) => {
      const alignmentStyles = composeStyleObjectFunc(alignment);
      return [alignment, alignmentStyles];
    })
  );
  return variantsObject;
};

export const escapeKeyPressHandler = (
  event: React.KeyboardEvent<HTMLDivElement>
) => {
  if (event.key === 'Escape') {
    (event.target as HTMLElement).blur();
  }
};
