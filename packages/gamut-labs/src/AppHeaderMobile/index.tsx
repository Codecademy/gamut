import {
  AppBarSection,
  Box,
  ContentContainer,
  FlexBox,
  IconButton,
  Overlay,
} from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { mapItemToElement, StyledAppBar } from '../AppHeader';
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
    hideExtraItems?: boolean
  ) => {
    const shouldHideItems = hideExtraItems === true && items.length > 1;
    return items.map((item, index) => {
      const isFirstItem = index === 0;
      const isLastItem = index + 1 === items.length;
      const isHidable = !isLastItem && shouldHideItems;
      return (
        <Box
          key={item.id}
          ml={isFirstItem ? 0 : 4}
          mr={isLastItem ? 0 : 4}
          display={{
            _: isHidable ? 'none' : 'block',
            xs: 'block',
          }}
        >
          {mapItemToElement(action, item, redirectParam, true)}
        </Box>
      );
    });
  };

  return (
    <>
      <HeaderHeightArea display={{ _: 'block', md: 'none' }}>
        {!mobileMenuOpen && ( // need this bc AppBar has a hardcoded z-Index of 15
          <StyledAppBar>
            <AppBarSection position="left">
              {mapItemsToElement(items.left)}
            </AppBarSection>
            <AppBarSection position="right">
              {mapItemsToElement(
                [
                  ...(notificationsBell ? [notificationsBell] : []),
                  ...items.right,
                ],
                true
              )}
              <FlexBox ml={24}>
                <IconButton
                  type="button"
                  data-testid="header-mobile-menu"
                  aria-label="open navigation menu"
                  onClick={() => {
                    openMobileMenu();
                  }}
                  icon={MenuIcon}
                />
              </FlexBox>
            </AppBarSection>
          </StyledAppBar>
        )}
        <StyledOverlay
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <div data-testid="header-mobile-menu-dropdown">
            <StyledAppBar>
              <AppBarSection position="left">
                {mapItemsToElement(items.left)}
              </AppBarSection>
              <AppBarSection position="right">
                <FlexBox>
                  <IconButton
                    type="button"
                    aria-label="close menu"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    icon={CloseIcon}
                  />
                </FlexBox>
              </AppBarSection>
            </StyledAppBar>
            <ContentContainer>
              <AppHeaderMainMenuMobile
                action={action}
                items={items.mainMenu}
                onSearch={onSearch}
              />
            </ContentContainer>
          </div>
        </StyledOverlay>
      </HeaderHeightArea>
      {notificationsView}
    </>
  );
};
