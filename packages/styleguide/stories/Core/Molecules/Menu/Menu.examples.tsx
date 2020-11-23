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
            <MenuButtonToggle isExpanded={isExpanded}>
              Community
            </MenuButtonToggle>
            <MenuList>
              <MenuItem onSelect={() => alert('Action!')}>Action!</MenuItem>
              <MenuLink href="https://codecademy.com">Forums</MenuLink>
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};
