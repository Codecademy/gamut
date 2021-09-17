import React from 'react';

import { ClickPopover, ClickPopoverProps } from './ClickPopover';
import { HoverPopover, HoverPopoverProps } from './HoverPopover';

export type PopoverProps = ClickPopoverProps | HoverPopoverProps;

const isHoverPopover = (props: PopoverProps): props is HoverPopoverProps =>
  props.popoverType === 'hover';

export const Popover: React.FC<PopoverProps> = (props) =>
  isHoverPopover(props) ? (
    <HoverPopover {...props} />
  ) : (
    <ClickPopover {...props} />
  );
