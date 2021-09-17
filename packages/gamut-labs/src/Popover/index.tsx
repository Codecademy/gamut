import React from 'react';

import { ClickPopover, ClickPopoverProps } from './ClickPopover';

export const Popover: React.FC<ClickPopoverProps | HoverPopoverProps> = (
  props
) =>
  props.popoverType === 'hover' ? (
    <HoverPopover {...props} />
  ) : (
    <ClickPopover {...props} />
  );
