import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { BodyPortal } from '../BodyPortal';
import { FocusTrap } from '../FocusTrap';
import { Beak, PatternContainer, RaisedDiv } from './elements';
import { PopoverProps } from './types';

type StyleProps = {
  outline?: boolean;
  position?: 'above' | 'below';
  beak?: 'right' | 'left';
  align?: 'right' | 'left';
  widthRestricted?: boolean;
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

export const Popover: React.FC<PopoverProps> = ({
  align = 'left',
  beak,
  children,
  className,
  horizontalOffset = 0,
  isOpen,
  onRequestClose,
  outline = false,
  skipFocusTrap,
  pattern: Pattern,
  position = 'below',
  size = 'lrg',
  targetRef,
  verticalOffset = size === 'sml' ? 15 : 20,
  widthRestricted,
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

  const contents = (
    <PopoverContainer
      position={position}
      align={align}
      ref={popoverRef}
      className={className}
      style={getPopoverPosition()}
      data-testid="popover-content-container"
      tabIndex={-1}
    >
      <RaisedDiv
        alignment={align.includes('center') ? 'centered' : 'aligned'}
        size={size}
        outline={outline}
        widthRestricted={widthRestricted}
      >
        {beak && (
          <Beak
            outline={outline}
            beak={`${position}-${beak}${size === 'sml' ? '-sml' : ''}`}
            data-testid="popover-beak"
            size={size}
          />
        )}
        {children}
      </RaisedDiv>
      {Pattern && (
        <PatternContainer variant={`${position}-${align}`}>
          <Pattern data-testid="popover-pattern" />
        </PatternContainer>
      )}
    </PopoverContainer>
  );

  return (
    <AnimatePresence>
      {isOpen && targetRef && (
        <BodyPortal key="popover-portal">
          {skipFocusTrap ? (
            <>{contents}</>
          ) : (
            <FocusTrap
              allowPageInteraction
              onClickOutside={handleClickOutside}
              onEscapeKey={onRequestClose}
            >
              {contents}
            </FocusTrap>
          )}
        </BodyPortal>
      )}
    </AnimatePresence>
  );
};
