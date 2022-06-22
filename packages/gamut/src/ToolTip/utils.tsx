import { PopoverProps } from '../Popover';
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
import { ToolTipStaticBodyProps } from './types';

export const getPopoverAlignment = ({
  alignment = 'top-left',
}: Pick<ToolTipStaticBodyProps, 'alignment'>) => {
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

export const createStyleFromAlignment = (alignment: string) => {
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

export const createVariantsFromAlignments = (array: readonly string[]) => {
  const variantsObject = Object.fromEntries(
    array.map((alignment) => {
      const alignmentStyles = createStyleFromAlignment(alignment);
      return [alignment, alignmentStyles];
    })
  );
  return variantsObject;
};
