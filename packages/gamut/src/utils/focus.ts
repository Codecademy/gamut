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
export const FOCUSABLE_SELECTOR =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );
};

