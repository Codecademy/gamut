import { CheckerDense } from '@codecademy/gamut-patterns';

import {
  PopoverProps,
  PopoverXPositionType,
  PopoverYPositionType,
} from '../../Popover';
import { TipPlacementComponentProps, TipWrapperProps } from './types';

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

export const getPopoverAlignmentAndPattern = ({
  alignment = 'top-left',
  type,
}: Partial<Pick<TipPlacementComponentProps, 'alignment' | 'type'>>):
  | (PopoverXPositionType & Pick<PopoverProps, 'align'>)
  | (PopoverYPositionType & Pick<PopoverProps, 'align'>) => {
  const popoverAlignment: PopoverYPositionType & Pick<PopoverProps, 'align'> = {
    align: 'right',
    beak: 'right',
    position: 'above',
    pattern: undefined,
  };

  if (type === 'tool') {
    popoverAlignment.align = 'center';
  }

  if (type === 'preview') {
    popoverAlignment.pattern = CheckerDense;
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
