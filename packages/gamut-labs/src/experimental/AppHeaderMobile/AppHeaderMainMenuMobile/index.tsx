import React from 'react';

import { AppHeaderDropdown } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLogo } from '../../AppHeader/AppHeaderElements/AppHeaderLogo';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
  AppHeaderLogoItem,
} from '../../AppHeader/AppHeaderElements/types';
import { AppHeaderLinkMobile } from '../AppHeaderLinkMobile';

export type AppHeaderMainMenuMobileProps = {
  // handleClose: ()=>void,
  logo: AppHeaderLogoItem;
  onClick: AppHeaderClickHandler;
  items: AppHeaderItem[];
};

const mapItemToElement = (
  item: AppHeaderItem,
  onClick: AppHeaderClickHandler
) => {
  switch (item.type) {
    case 'link':
      return <AppHeaderLinkMobile item={item} action={onClick} />;
    case 'dropdown':
      return <AppHeaderDropdown item={item} action={onClick} />;
  }
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  items,
  logo,
  onClick,
}) => {
  return (
    <>
      <AppHeaderLogo item={logo} action={onClick} />
      {items.map((item) => mapItemToElement(item, onClick))}
    </>
  );
};
