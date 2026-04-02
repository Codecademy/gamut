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
