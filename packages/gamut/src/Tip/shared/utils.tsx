import { timingValues } from '@codecademy/gamut-styles';

export const runWithDelay = (func: () => void) => {
  return setTimeout(func, timingValues?.base);
};

export const escapeKeyPressHandler = (
  event: React.KeyboardEvent<HTMLDivElement>
) => {
  if (event.key === 'Escape') {
    (event.target as HTMLElement).blur();
  }
};

/**
 * Check if an element is actually visible (not hidden via CSS).
 * Uses the modern checkVisibility API with a fallback for older browsers.
 */
export const isElementVisible = (element: Element): boolean => {
  if (!(element instanceof HTMLElement)) return false;
  return element.checkVisibility?.() ?? true;
};
