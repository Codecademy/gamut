import { RenderResult } from '@testing-library/react';

/**
 * Creates and appends an external label element to the test container.
 * This is useful for testing ariaLabelledby functionality where an InfoTip
 * references an external label element.
 *
 * @param view - The render result from testing-library
 * @param id - The ID of the external label element (used in ariaLabelledby)
 * @param text - The text content of the external label
 * @returns The created span element
 *
 * @example
 * ```ts
 * const { view } = renderView({
 *   infotip: { info, ariaLabelledby: 'external-label-id' },
 * });
 *
 * createExternalLabel(view, 'external-label-id', 'External Label');
 * view.getByRole('button', { name: 'External Label' });
 * ```
 */
export const createExternalLabel = (
  view: RenderResult,
  id: string,
  text: string
): HTMLSpanElement => {
  const externalLabel = document.createElement('span');
  externalLabel.id = id;
  externalLabel.textContent = text;
  view.container.appendChild(externalLabel);
  return externalLabel;
};
