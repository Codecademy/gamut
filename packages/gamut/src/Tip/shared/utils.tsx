import { PopoverProps } from '../../Popover';
import { FloatingTip } from './FloatingTip';
import { InlineTip } from './InlineTip';
import {
  bottomStyles,
  bottomStylesAfter,
  centerStyles,
  centerStylesAfter,
  leftStyles,
  leftStylesAfter,
  rightStyles,
  rightStylesAfter,
  topStyles,
  topStylesAfter,
} from './styles';
import { TipBaseProps, TipPlacementComponentProps } from './types';

export const getPopoverAlignment = ({
  alignment = 'top-left',
}: Pick<TipPlacementComponentProps, 'alignment'>) => {
  const popoverAlignment: Pick<PopoverProps, 'align' | 'beak' | 'position'> = {
    align: 'right',
    beak: 'right',
    position: 'above',
  };

  if (alignment.includes('bottom')) popoverAlignment.position = 'below';

  if (alignment.includes('right')) {
    popoverAlignment.align = 'left';
    popoverAlignment.beak = 'left';
  }

  return popoverAlignment;
};

export const createToolTipVariantFromAlignment = (alignment: string) => {
  let styleObject = {};
  let styleObjectAfter = {};

  if (alignment.includes('top')) {
    styleObject = { ...topStyles };
    styleObjectAfter = { ...topStylesAfter };
  } else {
    styleObject = { ...bottomStyles };
    styleObjectAfter = { ...bottomStylesAfter };
  }

  if (alignment.includes('center')) {
    styleObject = { ...styleObject, ...centerStyles };
    styleObjectAfter = { ...styleObjectAfter, ...centerStylesAfter };
  } else if (alignment.includes('right')) {
    styleObject = { ...styleObject, ...rightStyles };
    styleObjectAfter = { ...styleObjectAfter, ...rightStylesAfter };
  } else {
    styleObject = { ...styleObject, ...leftStyles };
    styleObjectAfter = { ...styleObjectAfter, ...leftStylesAfter };
  }

  return { ...styleObject, '&::after': styleObjectAfter };
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

export const getTip = ({
  placement,
  loaded,
}: Pick<TipBaseProps, 'placement'> & { loaded: boolean }) =>
  placement === 'floating' && loaded ? FloatingTip : InlineTip;
