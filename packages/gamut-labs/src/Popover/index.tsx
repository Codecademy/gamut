import {
  BodyPortal,
  Box,
  FloatingCard,
  FocusTrap,
  PatternName,
} from '@codecademy/gamut';
import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

const getTransform = (
  xAlign: 'left' | 'right',
  yAlign: 'top' | 'bottom',
  inset: boolean,
  beak?: boolean
) => {
  const beakOffset = !inset && beak ? '4rem' : '0px';
  const y = yAlign === 'top' ? '-100%' : '0%';

  let beakCooef: string;
  let x: string;
  if (inset) {
    x = xAlign === 'left' ? '0%' : '-100%';
    beakCooef = xAlign === 'left' ? '-' : '+';
  } else {
    x = xAlign === 'left' ? '-100%' : '0%';
    beakCooef = xAlign === 'left' ? '+' : '-';
  }

  return `translate(calc(${x} ${beakCooef} ${beakOffset}), ${y})`;
};

const PopoverContainer = styled.div(
  variance.compose(
    system.positioning,
    variance.create({
      transform: {
        property: 'transform',
      },
    })
  )
);

const alignmentVariants = system.variant({
  prop: 'alignment',
  variants: {
    bottom: {
      transform: 'rotate(45deg)',
    },
    top: {
      transform: 'rotate(225deg)',
    },
  },
});

const Beak = styled(Box)<{ alignment?: 'top' | 'bottom' }>(
  system.css({
    width: 20,
    height: 20,
    bg: 'background',
    transform: 'rotate(45deg)',
    position: 'absolute',
    borderRadiusTopLeft: '2px',
    border: 1,
    borderStyleRight: 'none',
    borderStyleBottom: 'none',
  }),
  alignmentVariants
);

export type PopoverProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Which vertical edge of the source component to align against.
   */
  alignment?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Align to the inset of the target div */
  inset?: boolean;
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
   * Toggle the beak of the popover, this is aligned to the X alignment.
   */
  beak?: boolean;
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
  alignment = 'bottom-left',
  verticalOffset = 20,
  horizontalOffset = 0,
  beak,
  inset = true,
  isOpen,
  onRequestClose,
  targetRef,
  pattern,
}) => {
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const [isInViewport, setIsInViewport] = useState(true);
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();
  const [yAlign, xAlign] = alignment.split('-') as [
    'top' | 'bottom',
    'left' | 'right'
  ];

  const getPopoverPosition = useCallback(() => {
    if (!targetRect) return {};
    const positions = {
      top: Math.round(targetRect.top - verticalOffset),
      bottom: Math.round(targetRect.top + targetRect.height + verticalOffset),
    };
    const alignments = {
      right: Math.round(window.scrollX + targetRect.right + horizontalOffset),
      left: Math.round(window.scrollX + targetRect.left - horizontalOffset),
    };

    return {
      top: positions[yAlign],
      left: alignments[xAlign],
    };
  }, [targetRect, verticalOffset, horizontalOffset, xAlign, yAlign]);

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

  const { top, left } = getPopoverPosition();

  const beakposition = inset ? xAlign : xAlign === 'left' ? 'right' : 'left';

  const beakProps = {
    [beakposition]: '25px',
    [yAlign === 'top' ? 'bottom' : 'top']: '-11px',
  };
  const transform = getTransform(xAlign, yAlign, inset, beak);

  return (
    <BodyPortal>
      <FocusTrap
        allowPageInteraction
        onClickOutside={handleClickOutside}
        onEscapeKey={onRequestClose}
      >
        <PopoverContainer
          position="fixed"
          transform={transform}
          top={top}
          left={left}
          data-testid="popover-content-container"
        >
          <FloatingCard
            ref={popoverRef}
            pattern={pattern || 'checkerDense'}
            className={className}
            tabIndex={-1}
          >
            {beak && (
              <Beak
                {...beakProps}
                alignment={yAlign}
                data-testid="popover-beak"
              />
            )}
            {children}
          </FloatingCard>
        </PopoverContainer>
      </FocusTrap>
    </BodyPortal>
  );
};
