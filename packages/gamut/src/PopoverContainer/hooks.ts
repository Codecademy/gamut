import { useEffect, useMemo } from 'react';

import { findAllAdditionalScrollingParents, findResizingParent } from './utils';

/**
 * Minimal element shape required for popover positioning.
 * Accepts both HTMLElement and TargetRef so Popover and PopoverContainer can share hooks.
 */
export interface PopoverTargetElement {
  getBoundingClientRect(): DOMRect;
  contains(other: Node | null): boolean;
}

/** Resolves Ref to current element; returns null for RefCallback or null ref. */
export function getRefElement(
  ref: React.Ref<PopoverTargetElement | null>
): PopoverTargetElement | null {
  if (ref == null) return null;
  if (typeof ref === 'function') return null;
  return ref.current;
}

/** Casts minimal target to HTMLElement for utils that need full DOM (e.g. parentElement). */
export function getTargetAsElement(
  target: PopoverTargetElement | null
): HTMLElement | null {
  return target as HTMLElement | null;
}

export const useScrollingParentsEffect = (
  targetRef: React.Ref<PopoverTargetElement | null>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  useEffect(() => {
    const target = getRefElement(targetRef);
    if (!target) return;

    const scrollingParents = findAllAdditionalScrollingParents(
      getTargetAsElement(target)!
    );

    const updatePosition = () => {
      const el = getRefElement(targetRef);
      setTargetRect(el?.getBoundingClientRect());
    };

    const cleanup: (() => void)[] = [];

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
  targetRef: React.Ref<PopoverTargetElement | null>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  useEffect(() => {
    const target = getRefElement(targetRef);
    if (!target || typeof ResizeObserver === 'undefined') return;

    const resizingParent = findResizingParent(getTargetAsElement(target)!);
    if (!resizingParent?.addEventListener) return;

    const handler = () => {
      setTargetRect(getRefElement(targetRef)?.getBoundingClientRect());
    };
    const ro = new ResizeObserver(handler);
    ro.observe(resizingParent);
    return () => ro.unobserve(resizingParent);
  }, [targetRef, setTargetRect]);
};

/**
 * Memoizes the list of scrolling parent elements for a target element.
 * Returns an empty array if the target element is not available.
 */
export const useScrollingParents = (
  targetRef: React.Ref<PopoverTargetElement | null>
): HTMLElement[] => {
  return useMemo(() => {
    const target = getRefElement(targetRef);
    if (!target) return [];
    return findAllAdditionalScrollingParents(getTargetAsElement(target)!);
  }, [targetRef]);
};
