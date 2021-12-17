import { FillButton, TextButton } from '@codecademy/gamut';
import React, { useState } from 'react';

import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderItem,
} from '../../AppHeader/AppHeaderElements/types';
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
        return <AppHeaderLink key={item.id} item={item} action={action} />;
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
          <FillButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => action(event, item)}
            mt={32}
            mx="auto"
            key={item.id}
          >
            {item.text}
          </FillButton>
        );
      case 'text-button':
        return (
          <TextButton
            mt={16}
            mx="auto"
            key={item.id}
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => action(event, item)}
          >
            {item.text}
          </TextButton>
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
      <AppHeaderListItem>
        <MobileSearchBar onSearch={onSearch} />
      </AppHeaderListItem>
      {items.map((item) => (
        <AppHeaderListItem>{mapItemToElement(item, action)}</AppHeaderListItem>
      ))}
    </>
  );
};
