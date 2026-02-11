import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { FocusTrap } from '../FocusTrap';
import {
  useResizingParentEffect,
  useScrollingParentsEffect,
} from '../PopoverContainer/hooks';
import {
  Beak,
  BeakBox,
  PatternContainer,
  PopoverContainer,
  PopoverPortal,
  RaisedDiv,
} from './elements';
import { getBeakVariant } from './styles/beak';
import { PopoverProps } from './types';
import { getDefaultOffset } from './utils';

export const Popover: React.FC<PopoverProps> = ({
  animation,
  align = 'left',
  beak,
  children,
  className,
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
  horizontalOffset = getDefaultOffset({
    axis: 'horizontal',
    position,
    variant,
  }),
  verticalOffset = getDefaultOffset({ axis: 'vertical', position, variant }),

  widthRestricted,
}) => {
  const [popoverHeight, setPopoverHeight] = useState<number>(0);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePopoverDimensions = useCallback(() => {
    if (popoverRef.current) {
      const { height, width } = popoverRef.current.getBoundingClientRect();
      setPopoverHeight(height);
      setPopoverWidth(width);
    }
  }, []);

  useEffect(() => {
    const popoverElement = popoverRef.current;
    if (!popoverElement || !isOpen || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePopoverDimensions();
    });

    resizeObserver.observe(popoverElement);

    updatePopoverDimensions();

    return () => {
      resizeObserver.unobserve(popoverElement);
    };
  }, [isOpen, updatePopoverDimensions, children]);

  /* The popover size can sometimes need to be recalculated after the text overflows.
   * This combines the initial popover dims and the resize observer to listen for updates.
   */
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;

      if (node) {
        updatePopoverDimensions();
      }
    },
    [updatePopoverDimensions]
  );

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};

    const isLRCentered = position === 'center';

    const positions = {
      above: Math.round(targetRect.top - verticalOffset),
      below: Math.round(targetRect.top + targetRect.height + verticalOffset),
      center: Math.round(
        targetRect.top +
          targetRect.height / 2 -
          popoverHeight / 2 +
          verticalOffset
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
        targetRect.left +
          targetRect.width / 2 -
          popoverWidth / 2 +
          horizontalOffset
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

  const updateTargetPosition = useCallback(
    (rect?: DOMRect) => {
      const target = targetRef?.current;
      if (!target) return;

      const newRect = rect || target.getBoundingClientRect();
      setTargetRect(newRect);
    },
    [targetRef]
  );

  useScrollingParentsEffect(targetRef, updateTargetPosition);

  useResizingParentEffect(targetRef, setTargetRect);

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
      const target = e.target as Node;
      const targetElement = targetRef.current;

      if (!targetElement) return;

      /**
       * Allows targetRef to be or contain a button that toggles the popover open and closed.
       * Without this check it would toggle closed then back open immediately.
       */
      if (targetElement.contains(target)) return;

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
      data-floating="popover"
      data-testid="popover-content-container"
      position={position}
      {...(popoverContainerRef
        ? { ref: popoverContainerRef }
        : {})}
      role={role}
      // eslint-disable-next-line gamut/no-inline-style
      style={getPopoverPosition()}
      tabIndex={-1}
    >
      <RaisedDiv
        alignment={alignment}
        outline={outline ? 'outline' : 'boxShadow'}
        ref={combinedRef}
        variant={variant}
        widthRestricted={widthRestricted}
      >
        {beak && (
          <BeakBox variant={position}>
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
