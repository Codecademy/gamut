import React, { useState } from 'react';

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
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  items,
  action,
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subMenuItem, setSubMenuItem] = useState<AppHeaderDropdownItem>();

  const handleClose = () => {
    setSubMenuOpen(false);
    setSubMenuItem(undefined);
  };

  const handleOpenSubMenu = (
    event: React.MouseEvent,
    item: AppHeaderDropdownItem
  ) => {
    action(event, item); // handles the tracking
    setSubMenuOpen(true);
    setSubMenuItem(item);
  };

  const mapItemToElement = (
    item: AppHeaderItem,
    action: AppHeaderClickHandler
  ) => {
    switch (item.type) {
      case 'link':
        return <AppHeaderLinkMobile item={item} action={action} />;
      case 'dropdown':
        return (
          <AppHeaderSubMenuTarget item={item} openSubMenu={handleOpenSubMenu} />
        );
    }
  };

  return (
    <>
      {subMenuOpen && subMenuItem ? (
        <AppHeaderSubMenuMobile
          handleClose={handleClose}
          action={action}
          item={subMenuItem}
        />
      ) : (
        items.map((item) => mapItemToElement(item, action))
      )}
    </>
  );
};
