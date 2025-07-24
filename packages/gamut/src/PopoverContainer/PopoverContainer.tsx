import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import {
  useIsomorphicLayoutEffect,
  useWindowScroll,
  useWindowSize,
} from 'react-use';

import { BodyPortal } from '../BodyPortal';
import { FocusTrap } from '../FocusTrap';
import {
  useResizingParentEffect,
  useScrollingParentEffect,
} from '../Popover/hooks';
import { ContainerState, PopoverContainerProps } from './types';
import { getContainers, getPosition, isInView } from './utils';

const PopoverContent = styled.div(
  variance.compose(
    system.positioning,
    variance.create({
      transform: {
        property: 'transform',
      },
    })
  )
);

export const PopoverContainer: React.FC<PopoverContainerProps> = ({
  alignment = 'bottom-left',
  offset = 20,
  y = 0,
  x = 0,
  invertAxis,
  inline = false,
  isOpen,
  onRequestClose,
  targetRef,
  skipFocusTrap,
  ...rest
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const hasRequestedCloseRef = useRef(false);
  const { width: winW, height: winH } = useWindowSize();
  const { x: winX, y: winY } = useWindowScroll();
  const [containers, setContainers] = useState<ContainerState>();
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const parent = containers?.parent;

  const popoverPosition = useMemo(() => {
    if (parent !== undefined) {
      return getPosition({
        alignment,
        container: parent,
        invertAxis,
        offset,
        x,
        y,
      });
    }
    return {};
  }, [parent, x, y, offset, alignment, invertAxis]);

  useEffect(() => {
    const target = targetRef?.current;
    if (!target) return;
    setContainers(getContainers(target, inline, { x: winX, y: winY }));
  }, [targetRef, inline, winW, winH, winX, winY, targetRect]);

  // Update target rectangle when window size/scroll changes
  useEffect(() => {
    setTargetRect(targetRef?.current?.getBoundingClientRect());
  }, [targetRef, isOpen, winW, winH, winX, winY]);

  // Handle scrolling parent effects
  useScrollingParentEffect(targetRef, setTargetRect);

  // Handle resizing parent effects
  useResizingParentEffect(targetRef, setTargetRect);

  useIsomorphicLayoutEffect(() => {
    if (
      containers?.viewport &&
      !isInView(containers?.viewport) &&
      !hasRequestedCloseRef.current
    ) {
      hasRequestedCloseRef.current = true;
      onRequestClose?.();
    } else if (containers?.viewport && isInView(containers?.viewport)) {
      hasRequestedCloseRef.current = false;
    }
  }, [containers?.viewport, onRequestClose]);

  /**
   * Allows targetRef to be or contain a button that toggles the popover open and closed.
   * Without this check it would toggle closed then back open immediately.
   *
   */
  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const targetElement = targetRef.current;

      if (!targetElement) return;
      if (targetElement.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      // If we get here, it's a genuine outside click
      onRequestClose?.();
    },
    [onRequestClose, targetRef]
  );

  /**
   * Backup click outside handler for cases where FocusTrap detection might be interfered with
   * by our own floating elements
   */
  const handleGlobalClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      const targetElement = targetRef.current;

      if (!targetElement || !isOpen) return;

      if (
        targetElement.contains(target) ||
        popoverRef.current?.contains(target)
      )
        return;

      // Only close if clicking on a different floating element that's not our popover
      const clickedElement = target as Element;
      const isFloatingElement = clickedElement.closest(
        '[data-floating="true"]'
      );
      if (
        isFloatingElement &&
        !popoverRef.current?.contains(isFloatingElement)
      ) {
        onRequestClose?.();
        return;
      }

      // Close the popover but allow the click event to continue by using setTimeout
      setTimeout(() => {
        onRequestClose?.();
      }, 0);
    },
    [onRequestClose, targetRef, isOpen]
  );

  // Backup global click listener for when a Popover or PopoverContainer is open
  useEffect(() => {
    if (isOpen) {
      // Use a small delay to ensure this doesn't interfere with the FocusTrap's own detection
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleGlobalClickOutside, true);
      }, 50);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener(
          'mousedown',
          handleGlobalClickOutside,
          true
        );
      };
    }
  }, [isOpen, handleGlobalClickOutside]);

  if (!isOpen || !targetRef) return null;

  const content = (
    <FocusTrap
      allowPageInteraction={inline || skipFocusTrap}
      onClickOutside={handleClickOutside}
      onEscapeKey={onRequestClose}
    >
      <PopoverContent
        data-floating="true"
        data-testid="popover-content-container"
        position="absolute"
        ref={popoverRef}
        tabIndex={-1}
        zIndex={inline ? 5 : 'initial'}
        {...popoverPosition}
        {...rest}
      />
    </FocusTrap>
  );

  if (inline) return content;

  return <BodyPortal>{content}</BodyPortal>;
};
