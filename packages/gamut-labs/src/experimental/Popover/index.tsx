import { BodyPortal } from '@codecademy/gamut';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import styles from './styles.module.scss';

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Which vertical edge of the source component to align against.
   */
  align?: 'left' | 'right';
  /**
   * Number of pixels to offset the popover vertically from the source component.
   */
  verticalOffset?: number;
  /**
   * Number of pixels to offset the popover horizontally from the source component.
   */
  horizontalOffset?: number;
  /**
   * Whether to add outline style (i.e. used for dropdowns).
   */
  outline?: boolean;
  /**
   * Which horizontal edge of the source componet to align against.
   */
  position?: 'above' | 'below';
  /**
   * Which side to position the beak. If not provided, beak will not be rendered.
   */
  beak?: 'left' | 'right';
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
    Pick<HTMLDivElement, 'getBoundingClientRect' | 'contains'>
  >;
};

export const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  align = 'left',
  verticalOffset = 20,
  horizontalOffset = 0,
  outline = false,
  position = 'below',
  beak,
  isOpen,
  onRequestClose,
  targetRef,
}) => {
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};

    const positions = {
      above: Math.round(targetRect.top - verticalOffset),
      below: Math.round(targetRect.top + targetRect.height + verticalOffset),
    };
    const alignments = {
      right: Math.round(window.scrollX + targetRect.right - horizontalOffset),
      left: Math.round(window.scrollX + targetRect.left + horizontalOffset),
    };
    return {
      top: positions[position],
      left: alignments[align],
    };
  }, [targetRect, verticalOffset, horizontalOffset, align, position]);

  useEffect(() => {
    setTargetRect(targetRef?.current?.getBoundingClientRect());
  }, [targetRef, isOpen, width, height, x, y]);

  useEffect(() => {
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
    if (!isInViewport) onRequestClose?.();
  }, [targetRect, isInViewport, onRequestClose]);

  const popoverRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !targetRef) return null;

  return (
    <BodyPortal>
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick: (event) => {
            if (!targetRef.current?.contains(event.target as Node)) {
              onRequestClose?.();
            }

            return true;
          },
          onDeactivate: onRequestClose,
        }}
      >
        <div
          ref={popoverRef}
          className={cx(
            styles.popover,
            styles[`${position}-${align}`],
            outline && styles.outline,
            className
          )}
          style={getPopoverPosition()}
          data-testid="popover-content-container"
        >
          {beak && (
            <div
              className={cx(styles.beak, styles[`${position}-${beak}-beak`])}
              data-testid="popover-beak"
            />
          )}
          {children}
        </div>
      </FocusTrap>
    </BodyPortal>
  );
};
