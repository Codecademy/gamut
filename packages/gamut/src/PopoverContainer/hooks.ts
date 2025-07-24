import { useEffect } from 'react';

import { findAllAdditionalScrollingParents, findResizingParent } from './utils';

export const useScrollingParentsEffect = (
  targetRef: React.RefObject<
    Pick<HTMLDivElement, 'getBoundingClientRect' | 'contains'>
  >,
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

    // For immediate updates during scroll
    const immediateUpdate = () => {
      updatePosition();
    };

    const cleanup: (() => void)[] = [];

    // Add listeners to all scrolling parents (window scroll handled by useWindowScroll)
    scrollingParents.forEach((parent) => {
      if (parent.addEventListener) {
        // Use immediate update for smoother experience
        parent.addEventListener('scroll', immediateUpdate, { passive: true });
        cleanup.push(() =>
          parent.removeEventListener('scroll', immediateUpdate)
        );
      }
    });

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [targetRef, setTargetRect]);
};

export const useResizingParentEffect = (
  targetRef: React.RefObject<
    Pick<HTMLDivElement, 'getBoundingClientRect' | 'contains'>
  >,
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
