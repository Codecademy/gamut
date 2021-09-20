import React, { useCallback } from 'react';

import { BasePopover } from './BasePopover';
import { SharedPopoverProps } from './types';

export type ClickPopoverProps = SharedPopoverProps & {
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: React.RefObject<HTMLElement>;

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
    <BasePopover
      {...innerPopoverProps}
      targetRef={targetRef}
      handleClickOutside={handleClickOutside}
      closePopover={onRequestClose ?? (() => {})}
    >
      {children}
    </BasePopover>
  );
};
