import { useEffect } from 'react';

import { findResizingParent, findScrollingParent } from './utils';

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
    const scrollingParent = findScrollingParent(
      targetRef.current as unknown as HTMLElement
    );
    if (!scrollingParent?.addEventListener) {
      return;
    }
    const handler = () => {
      setTargetRect(targetRef?.current?.getBoundingClientRect());
    };
    scrollingParent.addEventListener('scroll', handler);
    return () => scrollingParent.removeEventListener('scroll', handler);
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
