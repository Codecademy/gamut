import { Box } from '@codecademy/gamut';
import React, { useState } from 'react';
import { ReactNode } from 'react';

import { AppHeaderFillButton } from '../..';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderItem,
} from '../../AppHeader/AppHeaderElements/types';
import { AppHeaderLinkMobile } from '../AppHeaderLinkMobile';
import { AppHeaderSubMenuMobile } from '../AppHeaderSubMenuMobile';
import { AppHeaderSubMenuTarget } from '../AppHeaderSubMenuTarget';

export type AppHeaderMainMenuMobileProps = {
  action: AppHeaderClickHandler;
  items: AppHeaderItem[];
  renderSearch?: () => ReactNode;
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  items,
  action,
  renderSearch,
}) => {
  const [subMenuItem, setSubMenuItem] = useState<AppHeaderDropdownItem>();

  const openSubMenu = (
    event: React.MouseEvent,
    item: AppHeaderDropdownItem
  ) => {
    action(event, item);
    setSubMenuItem(item);
  };

  const closeSubMenu = () => {
    setSubMenuItem(undefined);
  };

  const mapItemToElement = (
    item: AppHeaderItem,
    action: AppHeaderClickHandler
  ) => {
    switch (item.type) {
      case 'link':
        return (
          <AppHeaderLinkMobile key={item.id} item={item} action={action} />
        );
      case 'dropdown':
      case 'profile-dropdown':
        return (
          <AppHeaderSubMenuTarget
            key={item.id}
            item={item}
            openSubMenu={openSubMenu}
          />
        );
      case 'fill-button':
        return (
          <Box display="flex" justifyContent="center">
            <AppHeaderFillButton
              data-testid={item.dataTestId}
              href={item.href}
              onClick={(event: React.MouseEvent) => action(event, item)}
            >
              {item.text}
            </AppHeaderFillButton>
          </Box>
        );
    }
  };

  return (
    <>
      {!!subMenuItem ? (
        <AppHeaderSubMenuMobile
          handleClose={closeSubMenu}
          action={action}
          item={subMenuItem}
        />
      ) : (
        <>
          {renderSearch && renderSearch()}
          {items.map((item) => mapItemToElement(item, action))}
        </>
      )}
    </>
  );
};
