import {
  IconButton,
  Menu,
  MenuItem,
  PopoverContainer,
} from '@codecademy/gamut';
import {
  DeleteIcon,
  DuplicateIcon,
  EditIcon,
  MiniKebabMenuIcon,
} from '@codecademy/gamut-icons';
import { useRef, useState } from 'react';
import * as React from 'react';

export interface RowActionsMenuProps {
  /**
   * Accessible label for the trigger button, e.g. "Actions for Intro to JavaScript".
   * Defaults to a generic label if not provided.
   */
  triggerLabel?: string;
  /**
   * Called when the "Edit" action is selected.
   */
  onEdit?: () => void;
  /**
   * Called when the "Duplicate" action is selected.
   */
  onDuplicate?: () => void;
  /**
   * Called when the "Delete" action is selected.
   */
  onDelete?: () => void;
  className?: string;
}

/**
 * `RowActionsMenu` renders a trigger button that, when clicked, opens a small
 * floating menu of row-level actions (Edit, Duplicate, Delete) positioned
 * below the button. The menu closes when the user clicks outside of it or
 * presses the Escape key.
 */
export const RowActionsMenu: React.FC<RowActionsMenuProps> = ({
  triggerLabel = 'Row actions',
  onEdit,
  onDuplicate,
  onDelete,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  const handleAction = (action?: () => void) => {
    action?.();
    closeMenu();
  };

  return (
    <>
      <IconButton
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={className}
        icon={MiniKebabMenuIcon}
        ref={triggerRef}
        size="small"
        tip={triggerLabel}
        variant="secondary"
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen && (
        <PopoverContainer
          alignment="bottom-left"
          isOpen={isOpen}
          offset={4}
          targetRef={triggerRef}
          onRequestClose={closeMenu}
        >
          <Menu role="menu" variant="popover" width="max-content">
            <MenuItem icon={EditIcon} onClick={() => handleAction(onEdit)}>
              Edit
            </MenuItem>
            <MenuItem
              icon={DuplicateIcon}
              onClick={() => handleAction(onDuplicate)}
            >
              Duplicate
            </MenuItem>
            <MenuItem icon={DeleteIcon} onClick={() => handleAction(onDelete)}>
              Delete
            </MenuItem>
          </Menu>
        </PopoverContainer>
      )}
    </>
  );
};
