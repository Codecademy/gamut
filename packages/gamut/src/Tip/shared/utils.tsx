import { timingValues } from '@codecademy/gamut-styles';

import {
  PopoverProps,
  PopoverXPositionType,
  PopoverYPositionType,
} from '../../Popover';
import {
  bottomCenterStylesAfter,
  bottomStyles,
  bottomStylesAfter,
  bottomStylesBefore,
  horizontalCenterStyles,
  horizontalLeftStyles,
  horizontalRightStyles,
  leftStyles,
  leftStylesAfter,
  rightStyles,
  rightStylesAfter,
  topCenterStylesAfter,
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

export const getAlignmentWidths = ({
  alignment,
  avatar,
  type,
}: Pick<TipWrapperProps, 'alignment' | 'avatar' | 'type'>) => {
  if (avatar) return 'avatarAligned';
  if (type === 'preview') return 'previewAligned';
  return alignment.includes('center') ? 'centered' : 'aligned';
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

  if (alignment.includes('top')) {
    styleObject = { ...topStyles };
    styleObjectAfter = { ...topStylesAfter };
    styleObjectBefore = { ...topStylesBefore };
  } else {
    styleObject = { ...bottomStyles };
    styleObjectAfter = { ...bottomStylesAfter };
    styleObjectBefore = { ...bottomStylesBefore };
  }

  const isHorizontallyAligned =
    alignment.includes('left-') || alignment.includes('right-');
  const isRightAligned = alignment.includes('right');

  if (alignment.includes('center') && !isHorizontallyAligned) {
    styleObject = { ...styleObject, ...verticalCenterStyles };
    styleObjectAfter = { ...styleObjectAfter, ...verticalCenterStylesAfter };
    if (alignment.includes('top')) {
      styleObjectAfter = { ...styleObjectAfter, ...topCenterStylesAfter };
    } else {
      styleObjectAfter = { ...styleObjectAfter, ...bottomCenterStylesAfter };
    }
  } else if (isRightAligned) {
    styleObject = { ...styleObject, ...rightStyles };
    styleObjectAfter = { ...styleObjectAfter, ...rightStylesAfter };
  } else {
    styleObject = { ...styleObject, ...leftStyles };
    styleObjectAfter = { ...styleObjectAfter, ...leftStylesAfter };
  }

  if (alignment.includes('center') && isHorizontallyAligned) {
    styleObject = { ...styleObject, ...horizontalCenterStyles };
    styleObjectAfter = { ...styleObjectAfter, ...verticalCenterStylesAfter };
    if (isRightAligned) {
      styleObject = { ...styleObject, ...horizontalRightStyles };
    } else {
      styleObject = { ...styleObject, ...horizontalLeftStyles };
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
