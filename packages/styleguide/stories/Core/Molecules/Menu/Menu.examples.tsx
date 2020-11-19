import React from 'react';
import {
  Menu,
  MenuButtonToggle,
  MenuItem,
  MenuLink,
  MenuList,
} from '@codecademy/gamut/src';

export const MenuExample = () => {
  return (
    <div>
      <Menu>
        {({ isExpanded }) => (
          <>
            <MenuButtonToggle isExpanded={isExpanded}>Actions</MenuButtonToggle>
            <MenuList>
              <MenuItem onSelect={() => alert('Action!')}>Action!</MenuItem>
              <MenuLink href="https://codecademy.com">Codecademy</MenuLink>
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};
