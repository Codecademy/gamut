import React from 'react';

import { ClickPopover, ClickPopoverProps } from './ClickPopover';
import { HoverPopover, HoverPopoverProps } from './HoverPopover';

const isHoverPopover = (
  props: ClickPopoverProps | HoverPopoverProps
): props is HoverPopoverProps => props.popoverType === 'hover';

export const Popover: React.FC<ClickPopoverProps | HoverPopoverProps> = (
  props
) =>
  isHoverPopover(props) ? (
    <HoverPopover {...props} />
  ) : (
    <ClickPopover {...props} />
  );
