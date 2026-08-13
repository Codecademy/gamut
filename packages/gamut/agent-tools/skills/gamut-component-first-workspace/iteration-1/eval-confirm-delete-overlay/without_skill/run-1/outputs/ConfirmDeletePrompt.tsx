import { Dialog, DialogProps } from '@codecademy/gamut';
import * as React from 'react';

export interface ConfirmDeletePromptProps
  extends Pick<DialogProps, 'isOpen' | 'containerFocusRef' | 'zIndex'> {
  /**
   * Called when the user confirms the deletion by clicking the Delete button.
   */
  onConfirm: () => void;
  /**
   * Called when the user backs out of the deletion, whether by clicking Cancel,
   * clicking the close button, clicking outside the prompt, or pressing Escape.
   */
  onCancel: () => void;
  /**
   * Optional label for the item being deleted, e.g. "this playlist" or
   * '"My List Item"'. Defaults to "this item".
   */
  itemName?: string;
  /**
   * Dialog title. Defaults to "Delete item".
   */
  title?: React.ReactNode;
  /**
   * Label for the confirm button. Defaults to "Delete".
   */
  confirmText?: React.ReactNode;
  /**
   * Label for the cancel button. Defaults to "Cancel".
   */
  cancelText?: React.ReactNode;
}

/**
 * A confirmation prompt for destructive delete actions, e.g. removing a list item.
 *
 * Built on top of `Dialog`, so it is automatically dismissible via the Escape key,
 * by clicking outside the prompt, or via the built-in close button, in addition to
 * the explicit Cancel and Delete actions.
 *
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <IconButton icon={MiniDeleteIcon} tip="Delete" onClick={() => setIsOpen(true)} />
 * <ConfirmDeletePrompt
 *   isOpen={isOpen}
 *   onCancel={() => setIsOpen(false)}
 *   onConfirm={() => {
 *     setIsOpen(false);
 *     deleteItem(item.id);
 *   }}
 * />
 * ```
 */
export const ConfirmDeletePrompt: React.FC<ConfirmDeletePromptProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  itemName = 'this item',
  title = 'Delete item',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  containerFocusRef,
  zIndex,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      variant="danger"
      containerFocusRef={containerFocusRef}
      zIndex={zIndex}
      onRequestClose={onCancel}
      cancelCta={{
        children: cancelText,
        onClick: onCancel,
      }}
      confirmCta={{
        children: confirmText,
        onClick: onConfirm,
      }}
    >
      Are you sure you want to delete {itemName}? This action cannot be undone.
    </Dialog>
  );
};
