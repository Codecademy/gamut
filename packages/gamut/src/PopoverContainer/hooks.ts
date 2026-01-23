import { useEffect, useMemo } from 'react';

import { findAllAdditionalScrollingParents, findResizingParent } from './utils';

export const useScrollingParentsEffect = (
  targetRef: React.RefObject<Pick<
    HTMLDivElement,
    'getBoundingClientRect' | 'contains'
  >>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const target = targetRef.current as unknown as HTMLElement;
    const scrollingParents = findAllAdditionalScrollingParents(target);

    const updatePosition = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };

    const cleanup: (() => void)[] = [];

    // Add listeners to all scrolling parents (window scroll handled by useWindowScroll)
    scrollingParents.forEach((parent) => {
      if (parent.addEventListener) {
        parent.addEventListener('scroll', updatePosition, { passive: true });
        cleanup.push(() =>
          parent.removeEventListener('scroll', updatePosition)
        );
      }
    });

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [targetRef, setTargetRect]);
};

export const useResizingParentEffect = (
  targetRef: React.RefObject<Pick<
    HTMLDivElement,
    'getBoundingClientRect' | 'contains'
  >>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  useEffect(() => {
    // handles movement of target within a clipped container e.g. Drawer
    if (!targetRef.current || typeof ResizeObserver === 'undefined') {
      return;
    }
    const resizingParent = findResizingParent(
      targetRef.current as unknown as HTMLElement
    );
    if (!resizingParent?.addEventListener) {
      return;
    }
    const handler = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };
    const ro = new ResizeObserver(handler);
    ro.observe(resizingParent);
    return () => ro.unobserve(resizingParent);
  }, [targetRef, setTargetRect]);
};

/**
 * Memoizes the list of scrolling parent elements for a target element.
 * This avoids expensive DOM traversals and getComputedStyle calls on every render.
 * Returns an empty array if the target element is not available.
 */
export const useScrollingParents = (
  targetRef: React.RefObject<HTMLElement>
): HTMLElement[] => {
  return useMemo(() => {
    if (!targetRef.current) {
      return [];
    }
    return findAllAdditionalScrollingParents(targetRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef.current]);
};
