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
import { useResizingParentEffect, useScrollingParentsEffect } from './hooks';
import { ContainerState, PopoverContainerProps } from './types';
import { getContainers, getPosition, isOutOfView } from './utils';

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
  allowPageInteraction,
  closeOnViewportExit = false,
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

  // Update target rectangle when parent size/scroll changes
  const updateTargetPosition = useCallback(
    (rect?: DOMRect) => {
      const target = targetRef?.current;
      if (!target) return;

      const newRect = rect || target.getBoundingClientRect();
      setTargetRect(newRect);

      const currentScrollX =
        window.pageXOffset || document.documentElement.scrollLeft;
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      setContainers(
        getContainers(target, inline, { x: currentScrollX, y: currentScrollY })
      );
    },
    [targetRef, inline]
  );

  useScrollingParentsEffect(targetRef, updateTargetPosition);

  useResizingParentEffect(targetRef, setTargetRect);

  useIsomorphicLayoutEffect(() => {
    if (!closeOnViewportExit) return;

    if (
      containers?.viewport &&
      isOutOfView(containers?.viewport, targetRef?.current as HTMLElement) &&
      !hasRequestedCloseRef.current
    ) {
      hasRequestedCloseRef.current = true;
      onRequestClose?.();
    } else if (
      containers?.viewport &&
      !isOutOfView(containers?.viewport, targetRef?.current as HTMLElement)
    ) {
      hasRequestedCloseRef.current = false;
    }
  }, [containers?.viewport, onRequestClose, targetRef, closeOnViewportExit]);

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

      // Check if the clicked element is within an Overlay component
      const clickedElement = target as Element;
      if (clickedElement.closest('[data-floating="overlay"]')) {
        return;
      }

      // Check if the clicked element is within another Popover or PopoverContainer
      const isFloatingElement = clickedElement.closest(
        '[data-floating="popover"]'
      );
      if (
        isFloatingElement &&
        !popoverRef.current?.contains(isFloatingElement)
      ) {
        onRequestClose?.();
        return;
      }

      onRequestClose?.();
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
      allowPageInteraction={inline || allowPageInteraction}
      onClickOutside={handleClickOutside}
      onEscapeKey={onRequestClose}
    >
      <PopoverContent
        data-floating="popover"
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
