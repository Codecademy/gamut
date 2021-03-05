import { BodyPortal, Pattern, PatternName } from '@codecademy/gamut';
import styled from '@emotion/styled';
import FocusTrap from 'focus-trap-react';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

type StyleProps = {
  outline?: boolean;
  position?: 'above' | 'below';
  beak?: 'right' | 'left';
  align?: 'right' | 'left';
};

const transform = {
  right: 'translateX(-100%)',
  left: 'translateX(0%)',
  above: 'translateY(-100%)',
  below: 'translateY(0%)',
};

const PopoverContainer = styled.div<StyleProps>`
  position: fixed;
  display: flex;
  transform: ${({ position, align }) =>
    position && align && `${transform[position]} ${transform[align]}`};
`;

const RaisedDiv = styled.div<StyleProps>`
  z-index: 1;
  border-radius: 2px;
  border: 1px ${({ outline }) => (outline ? 'solid' : 'none')} black;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ outline }) =>
    !outline &&
    'box-shadow: 0 0 16px rgba(0, 0, 0, 0.1), 0 0 24px rgba(0, 0, 0, 0.15)'};
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

const PatternContainer = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: ${({ position }) => (position === 'below' ? '8px' : '-8px')};
  left: ${({ align }) => (align === 'left' ? '8px' : '-8px')};
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

  useLayoutEffect(() => {
    setTargetRect(targetRef?.current?.getBoundingClientRect());
    if (targetRef?.current?.innerText === 'Resources')
      console.log('set the target rect, here is top: ', targetRect?.top);
  }, [targetRef, isOpen, width, height, x, y]);

  useLayoutEffect(() => {
    let inView;
    if (targetRect) {
      inView =
        targetRect.top >= 0 &&
        targetRect.left >= 0 &&
        targetRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        targetRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      setIsInViewport(inView);
      if (targetRef?.current?.innerText === 'Resources')
        console.log('set isInViewport: ', inView);
    }
    if (!inView) onRequestClose?.(); // when inView === false, popover is closed
  }, [targetRect, onRequestClose]);

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
        <PopoverContainer
          position={position}
          align={align}
          ref={popoverRef}
          className={className}
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
            <PatternContainer position={position} align={align}>
              <Pattern
                data-testid="popover-pattern"
                name={pattern}
                width="100%"
                height="100%"
              />
            </PatternContainer>
          )}
        </PopoverContainer>
      </FocusTrap>
    </BodyPortal>
  );
};
