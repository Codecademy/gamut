import {
  Box,
  ContentContainer,
  FillButton,
  FlexBox,
  TextButton,
} from '@codecademy/gamut';
import React, { useState } from 'react';

import { AppHeaderLink } from '../../AppHeader/AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import {
  AppHeaderClickHandler,
  AppHeaderDropdownItem,
  AppHeaderItem,
} from '../../AppHeader/AppHeaderElements/types';
import { login, signUp } from '../../GlobalHeader/GlobalHeaderItems';
import { AppHeaderSubMenuMobile } from '../AppHeaderSubMenuMobile';
import { AppHeaderSubMenuTarget } from '../AppHeaderSubMenuTarget';
import { MobileSearchBar } from './MobileSearchBar';

export type AppHeaderMainMenuMobileProps = {
  action: AppHeaderClickHandler;
  items: AppHeaderItem[];
  onSearch: (query: string) => void;
  getItemType: (type: string) => void;
  isAnon: boolean;
};

export const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps> = ({
  action,
  items,
  onSearch,
  getItemType,
  isAnon,
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
    <Box>
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

      {isAnon && (
        <FlexBox
          as="li"
          alignItems="baseline"
          justifyContent="center"
          pt={16}
          borderTop={1}
          borderColor="navy-300"
        >
          <FillButton
            data-testid={signUp.dataTestId}
            href={signUp.href}
            onClick={(event: React.MouseEvent) => action(event, signUp)}
            key={signUp.id}
            role="menuitem"
          >
            {signUp.text}
          </FillButton>

          <TextButton
            key={login.id}
            data-testid={login.dataTestId}
            href={login.href}
            onClick={(event: React.MouseEvent) => action(event, login)}
            role="menuitem"
          >
            {login.text}
          </TextButton>
        </FlexBox>
      )}
    </Box>
  );
};
