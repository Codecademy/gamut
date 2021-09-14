import { Menu, MenuItem } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

export type DropdownItem = {
  id: string;
  icon?: React.ComponentType<GamutIconProps>;
  text: string;
  clickHandler?: (event: React.MouseEvent) => void;
  href?: string;
};

export type DropdownListProps = {
  dropdownItems: DropdownItem[];
  onClose?: () => void;
};

export const DropdownList: React.FC<DropdownListProps> = ({
  dropdownItems,
  onClose,
}) => {
  return (
    <Menu variant="action" border="none" minWidth="max-content" py={12}>
      {dropdownItems.map((item) => {
        const { id, text, href, clickHandler, icon } = item;

        const onClick = (event: React.MouseEvent) => {
          clickHandler?.(event);
          onClose?.();
        };

        return (
          <MenuItem
            key={id}
            data-testid={`dropdown-item-${id}`}
            onClick={onClick}
            href={href}
            icon={icon}
          >
            {text}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
