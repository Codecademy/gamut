import { theme } from '@codecademy/gamut-styles';

export const focusVisibleStyle = (outlineOffset = '4px') => ({
  '&:focus-visible': {
    outlineOffset,
    /*
    We use !important here to ensure this overrides other browser default focus styles.
     Gamut's reset css does a good job wiping most of these out but this accounts for some edge cases.
    */
    outline: `2px solid ${theme.colors.primary} !important`,
  },
});

/**
 * Selector for all focusable elements in the DOM.
 * Includes links, buttons, form controls, and elements with non-negative tabindex.
 */
const FOCUSABLE_SELECTORS = [
  '[contentEditable=true]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  'a[href]:not([tabindex="-1"])',
  'audio[controls]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'details:not([tabindex="-1"])',
  'dialog',
  'embed:not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'map[name] area[href]:not([tabindex="-1"])',
  'object:not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'summary:not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'video[controls]:not([tabindex="-1"])',
];

/**
 * Gets all focusable elements within a container element.
 *
 * @param container - The container element to search within
 * @returns Array of focusable HTML elements, or empty array if container is null
 *
 * @example
 * ```tsx
 * const focusableElements = getFocusableElements(popoverRef.current);
 * focusableElements[0]?.focus();
 * ```
 */
export const getFocusableElements = (
  container: HTMLElement | null
): HTMLElement[] => {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(','))
  );
};
