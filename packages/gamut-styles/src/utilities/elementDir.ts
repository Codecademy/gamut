import type { RefObject } from 'react';
import { useEffect, useLayoutEffect, useReducer } from 'react';

/** Resolved HTML `dir` keyword: effective writing direction after `dir`, then CSS `direction`, then document root. */
export type DirValue = 'rtl' | 'ltr';

/**
 * Resolves the effective `dir` for an element (`rtl` or `ltr`), including JSDOM where
 * `getComputedStyle(el).direction` is often empty while `dir` is set on the root.
 */
export function elementDir(el: Element): DirValue {
  const ownDir = el.getAttribute('dir');
  if (ownDir === 'rtl') return 'rtl';
  if (ownDir === 'ltr') return 'ltr';
  const { direction } = getComputedStyle(el);
  if (direction === 'rtl' || direction === 'ltr') {
    return direction;
  }
  return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
}

/**
 * Ref whose `current` may be any DOM {@link Element} subclass (`HTMLElement`, `SVGElement`,
 * `HTMLButtonElement`, etc.). For structural/minimal types (e.g. tests), intersect with
 * `Element` so `current` is still typed as an `Element` (e.g. `Pick<HTMLAnchorElement, 'id'> & Element`).
 */
export type ElementDirRef<T extends Element = Element> = RefObject<T | null>;

function resolveElement<T extends Element>(
  elementRef: ElementDirRef<T> | undefined
): Element {
  return elementRef?.current instanceof Element
    ? elementRef.current
    : document.documentElement;
}

/**
 * Returns the effective `dir` for the resolved element (`rtl` or `ltr`), and updates when `dir`
 * changes on the document subtree or after layout (so `ref.current` is current).
 * Resolution uses {@link elementDir}.
 *
 * @param elementRef - Optional ref; when missing or `current` is not an `Element`, uses `document.documentElement`.
 */
export function useElementDir<T extends Element = Element>(
  elementRef?: ElementDirRef<T>
): DirValue {
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
    return 'ltr';
  }

  return elementDir(resolveElement(elementRef));
}
