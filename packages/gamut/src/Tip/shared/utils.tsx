import { timingValues } from '@codecademy/gamut-styles';

import { PopoverProps } from '../../Popover';
import {
  bottomCenterStylesAfter,
  bottomStyles,
  bottomStylesAfter,
  bottomStylesBefore,
  horiontalRepCenterStyles,
  leftStyles,
  leftStylesAfter,
  rightStyles,
  rightStylesAfter,
  topCenterStylesAfter,
  topStyles,
  topStylesAfter,
  topStylesBefore,
  vertCenterStyles,
  vertCenterStylesAfter,
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
}: Partial<Pick<TipPlacementComponentProps, 'alignment' | 'type'>>) => {
  const popoverAlignment: Pick<PopoverProps, 'align' | 'beak' | 'position'> = {
    align: 'right',
    beak: 'right',
    position: 'above',
  };

  if (type === 'tool') {
    popoverAlignment.align = undefined;
  }

  if (alignment.includes('bottom')) popoverAlignment.position = 'below';

  if (alignment.includes('right')) {
    popoverAlignment.align = 'left';
    popoverAlignment.beak = 'left';
  }

  if (alignment.includes('center')) {
    popoverAlignment.beak = 'center';
  }

  return popoverAlignment;
};

export const createToolTipVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  let styleObjectAfter = {};
  let styleObjectBefore = {};

  if (alignment.includes('top')) {
    styleObject = { ...topStyles };
    styleObjectAfter = { ...topStylesAfter };
    styleObjectBefore = { ...topStylesBefore };
  } else if (alignment.includes('bottom')) {
    styleObject = { ...bottomStyles };
    styleObjectAfter = { ...bottomStylesAfter };
    styleObjectBefore = { ...bottomStylesBefore };
  }

  if (alignment.includes('-center')) {
    styleObject = { ...styleObject, ...vertCenterStyles };
    styleObjectAfter = { ...styleObjectAfter };
    if (alignment.includes('left')) {
      styleObjectAfter = { ...styleObjectAfter };
    } else {
      styleObjectAfter = { ...styleObjectAfter };
    }
  } else if (alignment.includes('center')) {
    styleObject = { ...styleObject, ...horiontalRepCenterStyles };
    styleObjectAfter = { ...styleObjectAfter, ...vertCenterStylesAfter };
    if (alignment.includes('top')) {
      styleObjectAfter = { ...styleObjectAfter, ...topCenterStylesAfter };
    } else {
      styleObjectAfter = { ...styleObjectAfter, ...bottomCenterStylesAfter };
    }
  } else if (alignment.includes('right')) {
    styleObject = { ...styleObject, ...rightStyles };
    styleObjectAfter = { ...styleObjectAfter, ...rightStylesAfter };
  } else {
    styleObject = { ...styleObject, ...leftStyles };
    styleObjectAfter = { ...styleObjectAfter, ...leftStylesAfter };
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
