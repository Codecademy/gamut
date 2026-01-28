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

/**
 * Check if a floating element (modal, dialog, popover, overlay, etc.) is actually open and blocking.
 *
 * A floating element is considered "open" and blocking if:
 * 1. It's a <dialog> element with the open attribute (always blocking per HTML spec), OR
 * 2. It has role="alertdialog" (always blocking per ARIA spec), OR
 * 3. It has role="dialog" AND:
 *    - It's not aria-hidden="true", AND
 *    - It doesn't have aria-expanded="false" (for collapsible dialogs), AND
 *    - It's actually visible (not just in DOM), AND
 *    - It has aria-modal="true" (indicates blocking modal per ARIA spec)
 *
 * Non-blocking popovers and collapsible dialogs without aria-modal="true" are not considered
 * blocking and should not prevent InfoTip from closing.
 *
 * @param element - The DOM element to check
 * @returns `true` if the floating element is actually open and blocking, `false` otherwise
 */
export const isFloatingElementOpen = (element: Element): boolean => {
  if (!isElementVisible(element)) return false;

  /**
   * Native <dialog> elements are always blocking when open.
   * Per HTML spec, dialog elements with the open attribute are modal.
   */
  if (element instanceof HTMLDialogElement) {
    return element.open === true;
  }

  /**
   * Elements with role="dialog" or role="alertdialog".
   * Per ARIA spec, role="alertdialog" is always modal (blocking).
   * role="dialog" requires aria-modal="true" to be blocking.
   */
  const role = element.getAttribute('role');
  if (role !== 'dialog' && role !== 'alertdialog') {
    return false;
  }

  /**
   * Cache attribute values to avoid multiple DOM reads.
   * Check aria-hidden first as it's a common exclusion case.
   */
  const ariaHidden = element.getAttribute('aria-hidden');
  if (ariaHidden === 'true') {
    return false;
  }

  /**
   * Check for collapsible dialogs (like help menus).
   * If aria-expanded exists and is false, the dialog is closed.
   * These dialogs stay in DOM but are collapsed when closed.
   */
  const ariaExpanded = element.getAttribute('aria-expanded');
  if (ariaExpanded === 'false') {
    return false;
  }

  /**
   * Per ARIA spec, role="alertdialog" is always modal (blocking).
   * At this point, we've already verified:
   * - The element is visible (not hidden via CSS)
   * - It's not aria-hidden="true"
   * - It's not aria-expanded="false"
   * So if it's an alertdialog, it's open and blocking.
   * Handle alertdialog here to avoid expensive DOM queries for dialog elements.
   */
  if (role === 'alertdialog') {
    return true;
  }

  /**
   * For role="dialog", check if any child button with aria-expanded indicates the dialog is closed.
   * Some dialogs use a toggle button pattern where the button's aria-expanded
   * reflects the dialog's state.
   * Only perform this expensive querySelector operation after all other checks pass.
   */
  const toggleButton = element.querySelector(
    'button[aria-expanded], [role="button"][aria-expanded]'
  );
  if (toggleButton && toggleButton.getAttribute('aria-expanded') === 'false') {
    return false;
  }

  /**
   * For role="dialog", check aria-modal attribute.
   * aria-modal="true" indicates a blocking modal (Modal, Dialog).
   * aria-modal="false" or absence indicates non-blocking.
   */
  const ariaModal = element.getAttribute('aria-modal');
  if (ariaModal === 'true') {
    return true;
  }
  if (ariaModal === 'false') {
    // Explicitly non-modal, should not block
    return false;
  }

  /**
   * Elements with role="dialog" but without aria-modal="true" are non-blocking.
   * These include collapsible dialogs (help menus) and popovers (Popover, InfoTip, Tooltip)
   * that use role="dialog". They should not prevent InfoTip from closing.
   */
  return false;
};
