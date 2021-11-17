import { ContentContainer, IconButton, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { mapItemToElement, StyledAppBar } from '../AppHeader';
import { AppHeaderListItem } from '../AppHeader/AppHeaderElements/AppHeaderListItem';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
import { FormattedMobileAppHeaderItems } from '../AppHeader/types';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsContents } from '../Notifications/NotificationsContents';
import { AppHeaderNotifications } from '../Notifications/types';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  items: FormattedMobileAppHeaderItems;
  notifications?: AppHeaderNotifications;
  redirectParam?: string;
  onSearch: (query: string) => void;
  searchInitiallyOpen?: boolean;
};

const StyledOverlay = styled(Overlay)`
  display: block;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: ${({ theme }) => theme.colors.background};
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;

  @media only screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
`;

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  notifications,
  onSearch,
  redirectParam,
  searchInitiallyOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(
    !!searchInitiallyOpen
  );

  const [notificationsBell, notificationsView] = useHeaderNotifications(
    notifications,
    NotificationsContents
  );
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const mapItemsToElement = <T extends AppHeaderItem[]>(
    items: T,
    side: 'left' | 'right',
    hideExtraItems?: boolean
  ) => {
    const shouldHideItems = hideExtraItems === true && items.length > 1;
    return items.map((item, index) => {
      const isLastItem = index + 1 === items.length;
      const isHidable = !isLastItem && shouldHideItems;
      return (
        <AppHeaderListItem
          key={item.id}
          ml={side === 'right' && index === 0 ? 'auto' : 0}
          display={{
            _: isHidable ? 'none' : 'block',
            xs: 'block',
          }}
        >
          {mapItemToElement(action, item, redirectParam, undefined, true)}
        </AppHeaderListItem>
      );
    });
  };

  const right = [
    ...(notificationsBell ? [notificationsBell] : []),
    ...items.right,
  ];

  return (
    <>
      <HeaderHeightArea display={{ _: 'block', md: 'none' }} as="nav">
        {!mobileMenuOpen && ( // need this bc AppBar has a hardcoded z-Index of 15
          <StyledAppBar>
            {mapItemsToElement(items.left, 'left')}
            {mapItemsToElement(right, 'right', true)}
            <AppHeaderListItem ml={right.length === 0 ? 'auto' : 0}>
              <IconButton
                data-testid="header-mobile-menu"
                aria-label="open navigation menu"
                onClick={() => {
                  openMobileMenu();
                }}
                icon={MenuIcon}
              />
            </AppHeaderListItem>
          </StyledAppBar>
        )}
        <StyledOverlay
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <nav data-testid="header-mobile-menu-dropdown">
            <StyledAppBar>
              {mapItemsToElement(items.left, 'left')}
              <AppHeaderListItem ml="auto">
                <IconButton
                  aria-label="close menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  icon={CloseIcon}
                />
              </AppHeaderListItem>
            </StyledAppBar>
            <StyledContentContainer as="ul" role="menubar">
              <AppHeaderMainMenuMobile
                action={action}
                items={items.mainMenu}
                onSearch={onSearch}
              />
            </StyledContentContainer>
          </nav>
        </StyledOverlay>
      </HeaderHeightArea>
      {notificationsView}
    </>
  );
};
