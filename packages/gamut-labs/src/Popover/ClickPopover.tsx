import React, { useCallback } from 'react';

import { InnerPopover } from './shared';
import { BasePopoverProps } from './types';

export type ClickPopoverProps = BasePopoverProps & {
  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;

  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;
};

export const ClickPopover: React.FC<ClickPopoverProps> = ({
  children,
  onRequestClose,
  targetRef,
  isOpen,
  ...innerPopoverProps
}) => {
  const handleClickOutside = useCallback(
    (e) => {
      /**
       * Allows targetRef to be or contain a button that toggles the popover open and closed.
       * Without this check it would toggle closed then back open immediately.
       */
      if (targetRef.current?.contains(e.target as Node)) return;

      onRequestClose?.();
    },
    [onRequestClose, targetRef]
  );

  if (!isOpen || !targetRef || !targetRef.current) return null;

  return (
    <InnerPopover
      {...innerPopoverProps}
      targetRef={targetRef}
      handleClickOutside={handleClickOutside}
      closePopover={onRequestClose ?? (() => {})}
    >
      {children}
    </InnerPopover>
  );
};
