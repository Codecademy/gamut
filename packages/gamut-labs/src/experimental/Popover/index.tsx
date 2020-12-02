import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useWindowSize, useWindowScroll } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './styles.module.scss';
import { BodyPortal } from '@codecademy/gamut';

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Which vertical edge of the source component to align against.
   */
  align?: 'left' | 'right';
  /**
   * Number of pixels to offset the popover from the source component.
   */
  offset?: number;
  /**
   * Whether to add outline style (i.e. used for dropdowns).
   */
  outline?: boolean;
  /**
   * Which horizontal edge of the source componet to align against.
   */
  position?: 'above' | 'below';
  /**
   * Whether to show a beak on the popover.
   */
  showBeak?: boolean;
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
  offset = 20,
  outline = false,
  position = 'below',
  showBeak,
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
      above: Math.round(targetRect.top - offset),
      below: Math.round(targetRect.top + targetRect.height + offset),
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

  // if (!isOpen || !targetRef) return null;

  return (
    <AnimatePresence>
      {isOpen && targetRef && (
        <BodyPortal>
          <FocusTrap
            focusTrapOptions={{
              clickOutsideDeactivates: true,
              onDeactivate: onRequestClose,
            }}
          >
            <motion.div
              key="popover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
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
                {showBeak && (
                  <div
                    className={cx(styles.beak, styles[`${position}-beak`])}
                    data-testid="popover-beak"
                  />
                )}

                {children}
              </div>
            </motion.div>
          </FocusTrap>
        </BodyPortal>
      )}
    </AnimatePresence>
  );
};
