import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { FocusTrap } from '../FocusTrap';
import {
  Beak,
  BeakBox,
  PatternContainer,
  PopoverContainer,
  PopoverPortal,
  RaisedDiv,
} from './elements';
import { PopoverProps } from './types';
import { getBeakFromAlignment, getBeakVariant } from './utils';

const findScrollingParent = ({
  parentElement,
}: HTMLElement): HTMLElement | null => {
  if (parentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parentElement);
    if (
      [overflow, overflowY, overflowX].some((val) =>
        ['scroll', 'auto'].includes(val)
      )
    ) {
      return parentElement;
    }
    return findScrollingParent(parentElement); // parent of this parent is used via prop destructure
  }
  return null;
};

const findResizingParent = ({
  parentElement,
}: HTMLElement): HTMLElement | null => {
  if (parentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parentElement);
    if ([overflow, overflowY, overflowX].some((val) => val === 'clip')) {
      return parentElement;
    }
    return findResizingParent(parentElement); // parent of this parent is used via prop destructure
  }
  return null;
};

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
  const [popoverHeight, setPopoverHeight] = useState<number>(0);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();

  const getRaisedDivDimsRef = (popover: HTMLDivElement) => {
    if (popover && popoverHeight === 0 && popoverWidth === 0) {
      const { height, width } = popover.getBoundingClientRect();
      setPopoverHeight(height);
      setPopoverWidth(width);
    }
  };

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};

    const isLRCentered = position === 'center';

    const positions = {
      above: Math.round(targetRect.top - verticalOffset),
      below: Math.round(targetRect.top + targetRect.height + verticalOffset),
      center: Math.round(
        targetRect.top + targetRect.height / 2 - popoverHeight / 2
      ),
    };
    const alignments = {
      right: isLRCentered
        ? Math.round(targetRect.right + popoverWidth + horizontalOffset)
        : Math.round(window.scrollX + targetRect.right + horizontalOffset),
      left: isLRCentered
        ? Math.round(targetRect.left - popoverWidth - horizontalOffset)
        : Math.round(window.scrollX + targetRect.left - horizontalOffset),
      center: Math.round(
        targetRect.left + targetRect.width / 2 - popoverWidth / 2
      ),
    };
    return {
      top: positions[position],
      left: alignments[align],
    };
  }, [
    align,
    horizontalOffset,
    popoverHeight,
    popoverWidth,
    position,
    targetRect,
    verticalOffset,
  ]);

  useEffect(() => {
    setTargetRect(targetRef?.current?.getBoundingClientRect());
  }, [targetRef, isOpen, width, height, x, y]);

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }
    const scrollingParent = findScrollingParent(
      targetRef.current as HTMLElement
    );
    if (!scrollingParent?.addEventListener) {
      return;
    }
    const handler = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };
    scrollingParent.addEventListener('scroll', handler);
    return () => scrollingParent.removeEventListener('scroll', handler);
  }, [targetRef]);

  useEffect(() => {
    // handles movement of target within a clipped container e.g. Drawer
    if (!targetRef.current || typeof ResizeObserver === 'undefined') {
      return;
    }
    const resizingParent = findResizingParent(targetRef.current as HTMLElement);
    if (!resizingParent?.addEventListener) {
      return;
    }
    const handler = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };
    const ro = new ResizeObserver(handler);
    ro.observe(resizingParent);
    return () => ro.unobserve(resizingParent);
  }, [targetRef]);

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
  if ((!isOpen || !targetRef) && !animation) return null;
  const alignment =
    (variant === 'primary' || beak) && beak !== 'center'
      ? 'aligned'
      : 'centered';
  const contents = (
    <PopoverContainer
      align={align}
      className={className}
      data-testid="popover-content-container"
      position={position}
      {...(popoverContainerRef ? { ref: popoverContainerRef } : {})}
      role={role}
      style={getPopoverPosition()}
      tabIndex={-1}
    >
      <RaisedDiv
        alignment={alignment}
        outline={outline ? 'outline' : 'boxShadow'}
        variant={variant}
        widthRestricted={widthRestricted}
        ref={getRaisedDivDimsRef}
      >
        {beak && (
          <BeakBox variant={getBeakFromAlignment({ align, position })}>
            <Beak
              beak={getBeakVariant({ align, position, beak, variant })}
              data-testid="popover-beak"
              hasBorder={outline || variant === 'secondary'}
              size={variant === 'secondary' ? 'sml' : 'lrg'}
            />
          </BeakBox>
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
