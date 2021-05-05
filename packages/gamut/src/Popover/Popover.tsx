import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { BodyPortal } from '../BodyPortal';
import { FocusTrap } from '../FocusTrap';
import { getTransform, PopoverContainer } from './PopoverContainer';

export type PopoverProps = {
  className?: string;
  /**
   * Which vertical edge of the source component to align against.
   */
  alignment?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Align to the inside edge of the target div */
  inside?: boolean;
  /** Whether the popover renders inside the current DOM context or escapes with a portal */
  inset?: boolean;
  /**
   * Number of pixels to offset the popover vertically from the source component.
   */
  verticalOffset?: number;
  /**
   * Number of pixels to offset the popover horizontally from the source component.
   */
  horizontalOffset?: number;
  /**
   * Toggle the beak of the popover, this is aligned to the X alignment.
   */
  beak?: boolean;
  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: React.RefObject<
    Pick<
      HTMLDivElement,
      | 'getBoundingClientRect'
      | 'contains'
      | 'offsetHeight'
      | 'offsetWidth'
      | 'offsetTop'
      | 'offsetLeft'
    >
  >;
};

export const Popover: React.FC<PopoverProps> = ({
  alignment = 'bottom-left',
  verticalOffset = 20,
  horizontalOffset = 0,
  inside = true,
  inline = false,
  isOpen,
  onRequestClose,
  targetRef,
  ...rest
}) => {
  const [boundingRect, setBoundRect] = useState<DOMRect>();
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();
  const [yAlign, xAlign] = alignment.split('-') as [
    'top' | 'bottom',
    'left' | 'right'
  ];

  const getPopoverPosition = useCallback(() => {
    if (!targetRect || !boundingRect) return {};
    const container = inline ? targetRect : boundingRect;
    const scrollX = inline ? 0 : window.scrollX;

    const positions = {
      top: Math.round(container.top - verticalOffset),
      bottom: Math.round(container.top + container.height + verticalOffset),
    };

    const alignments = {
      right: Math.round(
        scrollX + container.left + container.width + horizontalOffset
      ),
      left: Math.round(scrollX + container.left - horizontalOffset),
    };

    return {
      top: positions[yAlign],
      left: alignments[xAlign],
    };
  }, [
    inline,
    boundingRect,
    targetRect,
    verticalOffset,
    horizontalOffset,
    xAlign,
    yAlign,
  ]);

  useEffect(() => {
    setBoundRect(targetRef?.current?.getBoundingClientRect());
  }, [targetRef, isOpen, width, height, x, y]);

  useEffect(() => {
    const target = targetRef?.current;
    if (inline && target) {
      setTargetRect({
        width: target.offsetWidth,
        height: target.offsetHeight,
        left: target.offsetLeft,
        top: target.offsetTop,
      } as DOMRect);
    }
  }, [targetRef, isOpen, width, height, x, y, inline, inside, alignment]);

  useEffect(() => {
    if (boundingRect) {
      const inView =
        boundingRect.top >= 0 &&
        boundingRect.left >= 0 &&
        boundingRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        boundingRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      setIsInViewport(inView);
    }
    if (!isInViewport) onRequestClose?.();
  }, [boundingRect, isInViewport, onRequestClose]);

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

  const popoverRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !targetRef) return null;

  const { top, left } = getPopoverPosition();

  const transform = getTransform(xAlign, yAlign, inside);

  const content = (
    <FocusTrap
      allowPageInteraction
      onClickOutside={handleClickOutside}
      onEscapeKey={onRequestClose}
    >
      <PopoverContainer
        ref={popoverRef}
        tabIndex={-1}
        transform={transform}
        position={inline ? 'absolute' : 'fixed'}
        top={top}
        left={left}
        data-testid="popover-content-container"
        {...rest}
      />
    </FocusTrap>
  );
  if (inline) return content;

  return <BodyPortal>{content}</BodyPortal>;
};
