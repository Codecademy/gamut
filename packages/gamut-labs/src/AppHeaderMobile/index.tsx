import { ContentContainer, IconButton, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { mapItemToElement, StyledAppBar, StyledMenuBar } from '../AppHeader';
import { AppHeaderListItem } from '../AppHeader/AppHeaderElements/AppHeaderListItem';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
import { appHeaderMobileBreakpoint } from '../AppHeader/shared';
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
};

const StyledOverlay = styled(Overlay)(
  css({
    display: { _: `block`, [appHeaderMobileBreakpoint]: `none` },
    width: `100vw`,
    height: `100vh`,
    opacity: 1,
    bg: `background`,
    position: `fixed`,
    left: 0,
    top: 0,
    overflowX: `hidden`,
  })
);

const StyledContentContainer = styled(ContentContainer)(
  css({
    display: `flex`,
    flexDirection: `column`,
    p: 0,
  })
);

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  notifications,
  onSearch,
  redirectParam,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [allowScroll, setAllowScroll] = useState<boolean>(false);

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
            _: isHidable ? 'none' : 'flex',
            xs: 'flex',
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

  const onItemType = (type: string) => {
    if (type === 'catalog-dropdown') {
      setAllowScroll(true);
    } else {
      setAllowScroll(false);
    }
  };

  return (
    <>
      {!mobileMenuOpen && ( // need this bc AppBar has a hardcoded z-Index of 15
        <HeaderHeightArea
          display={{ _: `block`, [appHeaderMobileBreakpoint]: `none` }}
          as="nav"
          title="Mobile Navigation"
        >
          <StyledAppBar>
            <StyledMenuBar role="menubar">
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
                  variant="interface"
                />
              </AppHeaderListItem>
            </StyledMenuBar>
          </StyledAppBar>
        </HeaderHeightArea>
      )}
      <StyledOverlay
        clickOutsideCloses
        escapeCloses
        isOpen={mobileMenuOpen}
        onRequestClose={() => setMobileMenuOpen(false)}
        allowScroll={allowScroll}
      >
        <HeaderHeightArea
          display={{ _: `block`, [appHeaderMobileBreakpoint]: `none` }}
          as="nav"
          title="Mobile Navigation"
          data-testid="header-mobile-menu-dropdown"
        >
          <StyledAppBar>
            <StyledMenuBar role="menubar">
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
            </StyledMenuBar>
          </StyledAppBar>
          <StyledContentContainer as="ul" role="menubar" size="small">
            <AppHeaderMainMenuMobile
              action={action}
              items={items.mainMenu}
              onSearch={onSearch}
              getItemType={onItemType}
            />
          </StyledContentContainer>
        </HeaderHeightArea>
      </StyledOverlay>
      {notificationsView}
    </>
  );
};
