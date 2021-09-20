import {
  BodyPortal,
  FocusTrap,
  FocusTrapProps,
  Pattern,
} from '@codecademy/gamut';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { SharedPopoverProps } from './types';

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

export const PopoverContainer = styled.div<StyleProps>`
  position: fixed;
  display: flex;
  transform: ${({ position, align }) =>
    position && align && `${transform[position]} ${transform[align]}`};
`;

export const RaisedDiv = styled.div<StyleProps>`
  z-index: 1;
  border-radius: 2px;
  border: 1px ${({ outline }) => (outline ? 'solid' : 'none')}
    ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.white};
  ${({ outline }) =>
    !outline &&
    'box-shadow: 0 0 16px rgba(0, 0, 0, 0.1), 0 0 24px rgba(0, 0, 0, 0.15)'};
`;

export const Beak = styled.div<StyleProps>`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  border-${({ position }) => (position === 'below' ? 'left' : 'right')}:
    1px
    ${({ outline }) => (outline ? 'solid' : 'none')}
    ${({ theme }) => theme.colors.secondary};
  border-${({ position }) => (position === 'below' ? 'top' : 'bottom')}:
    1px
    ${({ outline }) => (outline ? 'solid' : 'none')}
    ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: ${({ beak }) => beak === 'left' && '25px'};
  right: ${({ beak }) => beak === 'right' && '25px'};
  top: ${({ position }) =>
    position === 'below' ? '-10px' : 'calc(100% - 10px);'};
`;

export const PatternContainer = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: ${({ position }) => (position === 'below' ? '8px' : '-8px')};
  left: ${({ align }) => (align === 'left' ? '8px' : '-8px')};
`;

type BasePopoverProps = SharedPopoverProps & {
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: React.RefObject<HTMLElement>;

  handleClickOutside: FocusTrapProps['onClickOutside'];
  closePopover: () => void;

  doNotTrapFocus?: boolean;
};

export const BasePopover: React.FC<BasePopoverProps> = ({
  handleClickOutside,
  closePopover,
  children,
  className,
  targetRef,
  outline,
  beak,
  pattern,
  doNotTrapFocus,
  position = 'below',
  align = 'left',
  verticalOffset = 20,
  horizontalOffset = 0,
}) => {
  const observerRef = useRef<IntersectionObserver>();
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) =>
        entries.forEach(
          (popoverTarget) => !popoverTarget.isIntersecting && closePopover(),
          { threshold: 0 }
        )
      );
    }

    const observer = observerRef.current;

    if (targetRef.current) {
      observer.observe(targetRef.current);
      return () => observer.disconnect();
    }
  }, [targetRef.current]);

  const [targetRect, setTargetRect] = useState<DOMRect>();
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();

  useEffect(() => {
    setTargetRect(targetRef?.current?.getBoundingClientRect());
  }, [targetRef, width, height, x, y]);

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

  const popoverRef = useRef<HTMLDivElement>(null);

  const popoverContent = (
    <PopoverContainer
      position={position}
      align={align}
      ref={popoverRef}
      className={className}
      style={getPopoverPosition()}
      data-testid="popover-content-container"
      tabIndex={-1}
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
          <Pattern data-testid="popover-pattern" name={pattern} fit />
        </PatternContainer>
      )}
    </PopoverContainer>
  );

  return (
    <BodyPortal>
      {doNotTrapFocus ? (
        popoverContent
      ) : (
        <FocusTrap
          allowPageInteraction
          onClickOutside={handleClickOutside}
          onEscapeKey={closePopover}
        >
          {popoverContent}
        </FocusTrap>
      )}
    </BodyPortal>
  );
};
