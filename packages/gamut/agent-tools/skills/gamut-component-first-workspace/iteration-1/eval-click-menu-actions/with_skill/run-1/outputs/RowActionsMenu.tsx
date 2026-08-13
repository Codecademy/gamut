import {
  FlexBox,
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
import { Background } from '@codecademy/gamut-styles';
import * as React from 'react';
import { useRef, useState } from 'react';

export interface RowActionsMenuProps {
  /**
   * Accessible name for the trigger button, and used as its ToolTip label.
   * Include context about which row this menu belongs to when possible,
   * e.g. `Actions for "Intro to JavaScript"`.
   */
  label?: string;
  /** Called when the "Edit" action is selected. */
  onEdit?: () => void;
  /** Called when the "Duplicate" action is selected. */
  onDuplicate?: () => void;
  /** Called when the "Delete" action is selected. */
  onDelete?: () => void;
}

/**
 * A kebab-menu trigger button that reveals a floating list of row actions
 * (Edit, Duplicate, Delete) positioned below it. The floating menu closes
 * when an action is chosen, when the user clicks outside of it, or when
 * Escape is pressed.
 *
 * Built by composing existing Gamut primitives (`IconButton`, `PopoverContainer`,
 * `Menu`/`MenuItem`) rather than hand-rolled positioning, outside-click, or
 * escape-key handling — `PopoverContainer` already wires a `FocusTrap` that
 * handles both dismiss behaviors and restores focus to the trigger on close.
 */
export const RowActionsMenu: React.FC<RowActionsMenuProps> = ({
  label = 'Row actions',
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const runAction = (action?: () => void) => {
    action?.();
    setIsOpen(false);
  };

  return (
    <FlexBox display="inline-flex" position="relative">
      <IconButton
        aria-expanded={isOpen}
        aria-haspopup="true"
        icon={MiniKebabMenuIcon}
        ref={triggerRef}
        tip={label}
        variant="secondary"
        onClick={() => setIsOpen((open) => !open)}
      />
      <PopoverContainer
        alignment="bottom-right"
        inline
        isOpen={isOpen}
        offset={4}
        targetRef={triggerRef}
        onRequestClose={() => setIsOpen(false)}
      >
        <Background bg="background" borderRadius="lg">
          <Menu role="menu" variant="popover" width="max-content">
            <MenuItem icon={EditIcon} onClick={() => runAction(onEdit)}>
              Edit
            </MenuItem>
            <MenuItem
              icon={DuplicateIcon}
              onClick={() => runAction(onDuplicate)}
            >
              Duplicate
            </MenuItem>
            <MenuItem icon={DeleteIcon} onClick={() => runAction(onDelete)}>
              Delete
            </MenuItem>
          </Menu>
        </Background>
      </PopoverContainer>
    </FlexBox>
  );
};
