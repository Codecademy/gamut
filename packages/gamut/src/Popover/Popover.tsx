import { LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { FocusTrap } from '../FocusTrap';
import {
  Beak,
  PatternContainer,
  PopoverContainer,
  PopoverPortal,
  RaisedDiv,
} from './elements';
import { PopoverProps } from './types';

export const Popover: React.FC<PopoverProps> = ({
  animation,
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
  popoverContainerRef,
  position = 'below',
  role,
  variant,
  targetRef,
  verticalOffset = variant === 'secondary' ? 15 : 20,
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
    (e: MouseEvent) => {
      /**
       * Allows targetRef to be or contain a button that toggles the popover open and closed.
       * Without this check it would toggle closed then back open immediately.
       */
      if (targetRef.current?.contains(e.target as Node)) return;

      onRequestClose?.();
    },
    [onRequestClose, targetRef]
  );

  const nullRef = useRef<HTMLDivElement>(null);
  if ((!isOpen || !targetRef) && !animation) return null;

  const contents = (
    <PopoverContainer
      align={align}
      className={className}
      data-testid="popover-content-container"
      position={position}
      ref={(popoverContainerRef as LegacyRef<HTMLDivElement>) ?? nullRef}
      role={role}
      style={getPopoverPosition()}
      tabIndex={-1}
    >
      <RaisedDiv
        alignment={variant === 'primary' || beak ? 'aligned' : undefined}
        outline={outline ? 'outline' : 'boxShadow'}
        variant={variant}
        widthRestricted={widthRestricted}
      >
        {beak && (
          <Beak
            outline={outline ? 'outline' : 'boxShadow'}
            beak={`${position}-${beak}${variant === 'secondary' ? '-sml' : ''}`}
            data-testid="popover-beak"
            size={variant === 'secondary' ? 'sml' : 'lrg'}
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
    <PopoverPortal animation={animation} isOpen={Boolean(isOpen && targetRef)}>
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
    </PopoverPortal>
  );
};
