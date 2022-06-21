import { PopoverProps } from '../Popover';
import { ToolTipStaticBodyProps } from '.';

export const getPopoverAlignment = ({
  alignment = 'top-left',
}: Pick<ToolTipStaticBodyProps, 'alignment'>) => {
  const popoverAlignment: Pick<PopoverProps, 'align' | 'beak' | 'position'> = {
    align: 'left',
    beak: 'left',
    position: 'above',
  };

  if (alignment.includes('bottom')) popoverAlignment.position = 'below';
  if (alignment.includes('right')) {
    popoverAlignment.align = 'right';
    popoverAlignment.beak = 'right';
  }

  return popoverAlignment;
};
