import { BodyPortal, Pattern, PatternName } from '@codecademy/gamut';
import styled from '@emotion/styled';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import styles from './styles.module.scss';

type StyleProps = {
  outline?: boolean;
  position?: 'above' | 'below';
  beak?: 'right' | 'left';
};

const RaisedDiv = styled.div<StyleProps>`
  z-index: 1;
  border: 1px ${({ outline }) => (outline ? 'solid' : 'none')} black;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Beak = styled.div<StyleProps>`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  border-${({ position }) => (position === 'below' ? 'left' : 'right')}:
    1px
    ${({ outline }) => (outline ? 'solid' : 'none')}
    ${({ theme }) => theme.colors.black};
  border-${({ position }) => (position === 'below' ? 'top' : 'bottom')}:
    1px
    ${({ outline }) => (outline ? 'solid' : 'none')}
    ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: ${({ beak }) => beak === 'left' && '25px'};
  right: ${({ beak }) => beak === 'right' && '25px'};
  top: ${({ position }) =>
    position === 'below' ? '-10px' : 'calc(100% - 10px);'};
`;

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
   * Whether to add outline style (i.e. used for dropdowns and coachmarks).
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
   * Whether to add a pattern background.
   */
  pattern?: PatternName;
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
  pattern,
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
      right: Math.round(window.scrollX + targetRect.right + horizontalOffset),
      left: Math.round(window.scrollX + targetRect.left - horizontalOffset),
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
            className
          )}
          style={getPopoverPosition()}
          data-testid="popover-content-container"
        >
          <RaisedDiv outline={outline}>
            {beak && (
              <Beak
                outline={outline}
                position={position}
                beak={beak}
                data-testid="popover-beak"
              />
            )}
            {children}
          </RaisedDiv>
          {pattern && (
            <Pattern
              data-testid="popover-pattern"
              width="100%"
              height="100%"
              position="absolute"
              top={position === 'below' ? '8' : '-8'}
              left={beak === 'left' ? '8' : '-8'}
              borderRadius="2"
              backgroundColor="white"
              zIndex={0}
              name={pattern}
            />
          )}
        </div>
      </FocusTrap>
    </BodyPortal>
  );
};
