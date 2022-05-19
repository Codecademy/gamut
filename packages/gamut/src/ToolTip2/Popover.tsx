import React, { useCallback, useState } from 'react';

import { ControlledPopover, PopoverProps } from './ControlledPopover';

/**
 * Popover Component:
 * The simple use case of popovers. Wraps the controlled popover so that all state is managed
 * internally.
 *
 * A wrapper component that requires two react element inputs:
 * 1. The focus or hover element (the `children` prop, which will always be rendered)
 * 2. Popover element to be displayed on click/hover of first element - can be sent as `render` prop if a function, or `component` prop
 *    if just a plain react element
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(
    (override?: boolean) =>
      setIsOpen((prevIsOpen) =>
        override !== undefined ? override : !prevIsOpen
      ),
    []
  );

  return (
    <ControlledPopover isOpen={isOpen} toggle={toggle} {...props}>
      {props.children}
    </ControlledPopover>
  );
};
