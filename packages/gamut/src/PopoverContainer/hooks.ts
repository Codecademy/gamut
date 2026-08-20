import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { isNullish } from '../utils/nullish';
import { findAllAdditionalScrollingParents, findResizingParent } from './utils';

/**
 * Minimal element shape required for popover positioning.
 * Accepts both HTMLElement and TargetRef so Popover and PopoverContainer can share hooks.
 */
export interface PopoverTargetElement {
  getBoundingClientRect(): DOMRect;
  contains(other: Node | null): boolean;
}

/** Resolves ref object to current element; returns null when unset. */
export function getRefElement(
  ref: RefObject<PopoverTargetElement | null>
): PopoverTargetElement | null {
  if (isNullish(ref)) return null;
  return ref.current;
}

/** Casts minimal target to HTMLElement for utils that need full DOM (e.g. parentElement). */
export function getTargetAsElement(
  target: PopoverTargetElement | null
): HTMLElement | null {
  return target as HTMLElement | null;
}

/**
 * Syncs ref.current to React state after each commit so hooks can depend on the
 * resolved element when ref object identity is stable but .current updates.
 */
function useResolvedRefTarget(
  targetRef: RefObject<PopoverTargetElement | null>
): PopoverTargetElement | null {
  const [resolved, setResolved] = useState<PopoverTargetElement | null>(() =>
    getRefElement(targetRef)
  );

  // ref.current updates do not change targetRef identity; run after every commit
  // to sync. Functional setState bails out when the resolved node is unchanged.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional post-commit ref sync
  useLayoutEffect(() => {
    const el = getRefElement(targetRef);
    setResolved((prev) => (prev === el ? prev : el));
  });

  return resolved;
}

export const useScrollingParentsEffect = (
  targetRef: RefObject<PopoverTargetElement | null>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  const resolvedTarget = useResolvedRefTarget(targetRef);

  useEffect(() => {
    if (!resolvedTarget) return;

    const scrollingParents = findAllAdditionalScrollingParents(
      getTargetAsElement(resolvedTarget)!
    );

    const updatePosition = () => {
      setTargetRect(resolvedTarget.getBoundingClientRect());
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
  }, [resolvedTarget, setTargetRect]);
};

export const useResizingParentEffect = (
  targetRef: RefObject<PopoverTargetElement | null>,
  setTargetRect: (rect: DOMRect | undefined) => void
) => {
  const resolvedTarget = useResolvedRefTarget(targetRef);

  useEffect(() => {
    if (!resolvedTarget || typeof ResizeObserver === 'undefined') return;

    const resizingParent = findResizingParent(
      getTargetAsElement(resolvedTarget)!
    );
    if (!resizingParent?.addEventListener) return;

    const handler = () => {
      setTargetRect(resolvedTarget.getBoundingClientRect());
    };
    const ro = new ResizeObserver(handler);
    ro.observe(resizingParent);
    return () => ro.unobserve(resizingParent);
  }, [resolvedTarget, setTargetRect]);
};

/**
 * Memoizes the list of scrolling parent elements for a target element.
 * Returns an empty array if the target element is not available.
 */
export const useScrollingParents = (
  targetRef: RefObject<PopoverTargetElement | null>
): HTMLElement[] => {
  const resolvedTarget = useResolvedRefTarget(targetRef);

  return useMemo(() => {
    if (!resolvedTarget) return [];
    return findAllAdditionalScrollingParents(
      getTargetAsElement(resolvedTarget)!
    );
  }, [resolvedTarget]);
};
