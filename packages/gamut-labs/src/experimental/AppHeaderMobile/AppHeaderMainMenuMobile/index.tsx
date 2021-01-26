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
      return <AppHeaderLinkMobile item={item} onClick={onClick} />;
    case 'dropdown':
      return <AppHeaderDropdown item={item} onClick={onClick} />;
  }
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  items,
  logo,
  onClick,
}) => {
  return (
    // <>
    <div>Test</div>
    // <AppHeaderLogo item={logo} onClick={onClick} />
    // {items.map(item=>mapItemToElement(item, onClick))}
    // </>
  );
};
