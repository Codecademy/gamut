import ReachPopover, { Position, positionDefault } from '@reach/popover';
import cx from 'classnames';
import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import { useHotkeys } from 'react-hotkeys-hook';

import styles from './styles.module.scss';

export type PopoverProps = {
  className?: string;

  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;

  /**
   * Whether to add outline style (i.e. used for dropdowns).
   */
  outline?: boolean;

  /**
   * Which horizontal edge of the source component to align against.
   */
  position?: Position;

  /**
   * Whether to show a beak on the popover.
   */
  showBeak?: boolean;

  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;

  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: React.RefObject<HTMLElement>;
};

export const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  isOpen,
  onRequestClose,
  outline = false,
  position = positionDefault,
  showBeak,
  targetRef,
}) => {
  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (!isOpen) return;
    if (
      !targetRef?.current?.contains(event.target as Element) ||
      event.type === 'keydown'
    ) {
      onRequestClose?.();
    }
  };

  const popoverRef = useRef<HTMLDivElement>(null);
  useClickAway(popoverRef, handleClickOutside);
  useHotkeys('escape', handleClickOutside);

  if (!isOpen || !targetRef) {
    return null;
  }

  return (
    <ReachPopover position={position} targetRef={targetRef}>
      <div
        ref={popoverRef}
        className={cx(styles.popover, outline && styles.outline, className)}
        data-testid="popover-content-container"
      >
        {showBeak && (
          <div className={cx(styles.beak)} data-testid="popover-beak" />
        )}
        {children}
      </div>
    </ReachPopover>
  );
};
