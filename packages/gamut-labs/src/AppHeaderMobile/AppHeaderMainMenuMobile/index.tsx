import { ContentContainer, FillButton, TextButton } from '@codecademy/gamut';
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
  getItemType: (type: string) => void;
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  action,
  items,
  onSearch,
  getItemType,
}) => {
  const [subMenuItem, setSubMenuItem] = useState<AppHeaderDropdownItem>();

  const openSubMenu = (
    event: React.MouseEvent,
    item: AppHeaderDropdownItem
  ) => {
    action(event, item);
    setSubMenuItem(item);
    getItemType(item.type);
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
          <AppHeaderLink key={item.id} item={item} action={action} showIcon />
        );
      case 'dropdown':
      case 'profile-dropdown':
      case 'catalog-dropdown':
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
            role="menuitem"
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
            role="menuitem"
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
    <ContentContainer>
      <AppHeaderListItem>
        <MobileSearchBar onSearch={onSearch} />
      </AppHeaderListItem>
      {items.map((item) => (
        <AppHeaderListItem key={item.id}>
          {mapItemToElement(item, action)}
        </AppHeaderListItem>
      ))}
    </ContentContainer>
  );
};
