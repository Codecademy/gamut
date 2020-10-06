import cx from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { useWindowSize } from 'react-use';

import styles from './styles.module.scss';
import { Overlay, OverlayProps } from '../Overlay';

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether the popover is rendered
   */
  isOpen: boolean;

  /**
   * The target element around which the popover will be positioned
   */
  targetRef: React.RefObject<Pick<HTMLDivElement, 'getBoundingClientRect'>>;
  /**
   * Which vertical edge of the source component to align against
   * @default right
   */
  align?: 'left' | 'right';

  /**
   * Number of pixels to offset the popover from the source component
   * @default 20
   */
  offset?: number;

  /**
   * Which horizontal edge of the source componet to align against
   * @default below
   */
  position?: 'above' | 'below';

  /**
   * Whether to show a beak on the popover. Needs showScreen=true
   */
  showBeak?: boolean;

  /**
   * Whether to show a screen behind the popover to mask the background contents
   * If enabled, the overlay clickOutsideToDeactivate no longer works
   */
  showScreen?: boolean;

  /**
   * Props to pass to the containing Overlay component
   */
  overlayProps?: Omit<OverlayProps, 'isOpen' | 'children'>;
};

export const Popover: React.FC<PopoverProps> = ({
  className,
  children,
  isOpen,
  showBeak,
  showScreen,
  position = 'below',
  offset = 20,
  align = 'left',
  overlayProps,
  targetRef,
}) => {
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const { width, height } = useWindowSize();

  const setRect = useCallback(() => {
    const rect = targetRef?.current?.getBoundingClientRect();

    setTargetRect(rect);
  }, [targetRef]);

  useEffect(() => {
    setRect();
  }, [setRect, isOpen, width, height]);

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};

    const positions = {
      above: Math.round(window.scrollY + targetRect.top - offset),
      below: Math.round(
        window.scrollY + targetRect.top + targetRect.height + offset
      ),
    };
    return {
      top: positions[position],
      left:
        align === 'right'
          ? Math.round(window.scrollX + targetRect.right)
          : Math.round(window.scrollX + targetRect.left),
    };
  }, [targetRect, offset, align, position]);

  if (!isOpen || !targetRef) return null;

  return (
    <Overlay
      fixedPositioning={false}
      {...overlayProps}
      isOpen={!!isOpen}
      data-testid={'popover-container'}
    >
      <div>
        {showScreen && (
          <div className={styles.screen} data-testid={'popover-screen'} />
        )}
        <div
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
      </div>
    </Overlay>
  );
};
