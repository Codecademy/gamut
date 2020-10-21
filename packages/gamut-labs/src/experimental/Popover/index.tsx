import cx from 'classnames';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useWindowSize, useClickAway, useWindowScroll } from 'react-use';
import { useHotkeys } from 'react-hotkeys-hook';

import styles from './styles.module.scss';
import { BodyPortal } from '../../../../gamut/src/BodyPortal';

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: React.RefObject<
    Pick<HTMLDivElement, 'getBoundingClientRect' | 'contains'>
  >;
  /**
   * Which vertical edge of the source component to align against.
   * @default left
   */
  align?: 'left' | 'right';
  /**
   * Number of pixels to offset the popover from the source component.
   * @default 20
   */
  offset?: number;
  /**
   * Which horizontal edge of the source componet to align against.
   * @default below
   */
  position?: 'above' | 'below';
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
   * Called to prevent unwanted targetRef event (targetRef is outside of Popover).
   * (i.e. when targetRef is a button and it is used to close the popover, this prevents triggering its onclick that would re-open the popover.)
   */
  disableOutsideEvent?: () => void;
};

export const Popover: React.FC<PopoverProps> = ({
  className,
  children,
  isOpen,
  showBeak,
  position = 'below',
  offset = 20,
  align = 'left',
  targetRef,
  onRequestClose,
  disableOutsideEvent,
}) => {
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();

  const setRect = useCallback(() => {
    const rect = targetRef?.current?.getBoundingClientRect();

    setTargetRect(rect);
  }, [targetRef]);

  const isElementInViewPort = useCallback(() => {
    if (targetRect) {
      const inView =
        targetRect.top >= 0 &&
        targetRect.left >= 0 &&
        targetRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        targetRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      setIsInViewport(inView);
    }
  }, [targetRect]);

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};

    const positions = {
      above: Math.round(window.scrollY + targetRect.top - offset),
      below: Math.round(
        window.scrollY + targetRect.top + targetRect.height + offset
      ),
    };
    const alignments = {
      right: Math.round(window.scrollX + targetRect.right),
      left: Math.round(window.scrollX + targetRect.left),
    };
    return {
      top: positions[position],
      left: alignments[align],
    };
  }, [targetRect, offset, align, position]);

  const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
    if (event.type === 'keydown') {
      onRequestClose?.();
      return;
    }
    if (targetRef?.current?.contains(event.target as Element)) {
      disableOutsideEvent?.();
    }
    onRequestClose?.();
  };

  useEffect(() => {
    setRect();
  }, [setRect, isOpen, width, height, x, y]);

  useEffect(() => {
    isElementInViewPort();
    if (!isInViewport) onRequestClose?.();
  }, [isElementInViewPort, isInViewport, onRequestClose]);

  const popoverRef = useRef<HTMLDivElement>(null);
  useClickAway(popoverRef, handleClickOutside, ['mousedown']);
  useHotkeys('escape', handleClickOutside);

  if (!isOpen || !targetRef) return null;

  return (
    <BodyPortal>
      <div
        ref={popoverRef}
        className={cx(
          styles.popover,
          styles[`${position}-${align}`],
          className
        )}
        style={getPopoverPosition()}
        data-testid={'popover-content-container'}
      >
        {showBeak && (
          <div
            className={cx(styles.beak, styles[`${position}-beak`])}
            data-testid={'popover-beak'}
          />
        )}
        {children}
      </div>
    </BodyPortal>
  );
};
