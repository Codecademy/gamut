import { useEffect } from 'react';

import { findResizingParent, findScrollingParent } from './utils';

// Helper function to find all scrolling parents
const findAllScrollingParents = (element: HTMLElement): HTMLElement[] => {
  const scrollingParents: HTMLElement[] = [];
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.body) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    if (
      [overflow, overflowY, overflowX].some((val) =>
        ['scroll', 'auto'].includes(val)
      )
    ) {
      scrollingParents.push(currentElement);
    }
    currentElement = currentElement.parentElement;
  }

  // Always include window for document-level scrolling
  if (
    scrollingParents.length === 0 ||
    !scrollingParents.includes(document.documentElement)
  ) {
    scrollingParents.push(document.documentElement);
  }

  return scrollingParents;
};

// Debounce utility
const createDebounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

export const useScrollingParentEffect = (
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
    const scrollingParents = findAllScrollingParents(target);

    const updatePosition = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };

    // Debounced version for performance during rapid scrolling
    const debouncedUpdate = createDebounce(updatePosition, 10);

    // For immediate updates during scroll
    const immediateUpdate = () => {
      updatePosition();
    };

    const cleanup: (() => void)[] = [];

    // Add listeners to all scrolling parents
    scrollingParents.forEach((parent) => {
      if (parent.addEventListener) {
        // Use immediate update for smoother experience
        parent.addEventListener('scroll', immediateUpdate, { passive: true });
        cleanup.push(() =>
          parent.removeEventListener('scroll', immediateUpdate)
        );
      }
    });

    // Also listen to window scroll as a fallback
    window.addEventListener('scroll', immediateUpdate, { passive: true });
    cleanup.push(() => window.removeEventListener('scroll', immediateUpdate));

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
