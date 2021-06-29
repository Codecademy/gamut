import { FlexBox } from '@codecademy/gamut';
import React, { useState } from 'react';

import { AppHeaderFillButton, AppHeaderTextButton } from '../..';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderItem,
} from '../../AppHeader/AppHeaderElements/types';
import { AppHeaderLinkMobile } from '../AppHeaderLinkMobile';
import { AppHeaderSubMenuMobile } from '../AppHeaderSubMenuMobile';
import { AppHeaderSubMenuTarget } from '../AppHeaderSubMenuTarget';
import { MobileSearchBar } from './MobileSearchBar';

export type AppHeaderMainMenuMobileProps = {
  action: AppHeaderClickHandler;
  items: AppHeaderItem[];
  onSearch: (query: string) => void;
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  action,
  items,
  onSearch,
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
          <FlexBox justifyContent="center" mt={32} key={item.id}>
            <AppHeaderFillButton
              data-testid={item.dataTestId}
              href={item.href}
              onClick={(event: React.MouseEvent) => action(event, item)}
            >
              {item.text}
            </AppHeaderFillButton>
          </FlexBox>
        );
      case 'text-button':
        return (
          <FlexBox justifyContent="center" mt={16} key={item.id}>
            <AppHeaderTextButton
              data-testid={item.dataTestId}
              href={item.href}
              onClick={(event: React.MouseEvent) => action(event, item)}
            >
              {item.text}
            </AppHeaderTextButton>
          </FlexBox>
        );
    }
  };

  return subMenuItem ? (
    <AppHeaderSubMenuMobile
      handleClose={closeSubMenu}
      action={action}
      item={subMenuItem}
    />
  ) : (
    <>
      {subMenuItem ? (
        <AppHeaderSubMenuMobile
          handleClose={closeSubMenu}
          action={action}
          item={subMenuItem}
        />
      ) : (
        <>
          <MobileSearchBar onSearch={onSearch} />
          {items.map((item) => mapItemToElement(item, action))}
        </>
      )}
    </>
  );
};
