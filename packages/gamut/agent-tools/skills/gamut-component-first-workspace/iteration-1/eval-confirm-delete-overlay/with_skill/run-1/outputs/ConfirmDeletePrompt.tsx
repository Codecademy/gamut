import { Dialog } from '@codecademy/gamut';
import * as React from 'react';

export interface ConfirmDeletePromptProps {
  /**
   * Whether the confirmation prompt is open.
   */
  isOpen: boolean;
  /**
   * Called on Escape, outside-click, the built-in close button, or either
   * action button. Must flip `isOpen` to `false` — the prompt never closes
   * itself.
   */
  onRequestClose: () => void;
  /**
   * Called when the user confirms the delete action, after the prompt has
   * already been asked to close.
   */
  onConfirm: () => void;
  /**
   * Label for the thing being deleted, substituted into the confirmation
   * copy, e.g. `"this comment"`. Defaults to `"this item"`.
   */
  itemLabel?: string;
}

/**
 * A confirm/cancel prompt for a destructive delete action (e.g. removing a
 * row from a list). Built on Gamut's `Dialog`, which already provides the
 * dismiss (Escape / outside-click / close button) and focus-trap behavior —
 * see the `gamut-modal` skill for how that works under the hood.
 */
export const ConfirmDeletePrompt: React.FC<ConfirmDeletePromptProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  itemLabel = 'this item',
}) => (
  <Dialog
    cancelCta={{ children: 'Cancel' }}
    confirmCta={{ children: 'Delete', onClick: onConfirm }}
    isOpen={isOpen}
    title="Delete item?"
    variant="danger"
    onRequestClose={onRequestClose}
  >
    Are you sure you want to delete {itemLabel}?
  </Dialog>
);
