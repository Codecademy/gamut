import type { RefObject } from 'react';
import { useEffect, useLayoutEffect, useReducer } from 'react';

/**
 * Resolves whether layout direction is RTL for an element, including JSDOM where
 * `getComputedStyle(el).direction` is often empty while `dir` is set on the root.
 */
export function directionIsRtl(el: Element): boolean {
  const ownDir = el.getAttribute('dir');
  if (ownDir === 'rtl') return true;
  if (ownDir === 'ltr') return false;
  const { direction } = getComputedStyle(el);
  if (direction === 'rtl' || direction === 'ltr') {
    return direction === 'rtl';
  }
  return document.documentElement.getAttribute('dir') === 'rtl';
}

function resolveElement(
  elementRef: RefObject<Element | null> | undefined
): Element {
  return elementRef?.current instanceof Element
    ? elementRef.current
    : document.documentElement;
}

/**
 * Returns whether the resolved element’s direction is RTL, and updates when `dir`
 * changes on the document subtree or after layout (so `ref.current` is current).
 * Resolution uses {@link directionIsRtl}.
 *
 * @param elementRef - Optional ref; when missing or `current` is not an `Element`, uses `document.documentElement`.
 */
export function useDirectionIsRtl(
  elementRef?: RefObject<Element | null>
): boolean {
  const [, bump] = useReducer((n: number) => n + 1, 0);

  useLayoutEffect(() => {
    bump();
  }, [elementRef]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      bump();
    });
    observer.observe(document.documentElement, {
      attributeFilter: ['dir'],
      attributes: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, []);

  if (typeof document === 'undefined') {
    return false;
  }

  return directionIsRtl(resolveElement(elementRef));
}
