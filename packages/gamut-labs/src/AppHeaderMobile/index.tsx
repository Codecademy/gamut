import { Box, ContentContainer, IconButton, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { Background, css, useColorModes } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';

import { mapItemToElement, StyledAppBar } from '../AppHeader';
import { AppHeaderListItem } from '../AppHeader/AppHeaderElements/AppHeaderListItem';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
import { appHeaderMobileBreakpoint } from '../AppHeader/shared';
import { FormattedMobileAppHeaderItems } from '../AppHeader/types';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';
import { CrossDeviceStateProps } from '../GlobalHeader/types';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsContents } from '../Notifications/NotificationsContents';
import { AppHeaderNotificationSettings } from '../Notifications/types';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  items: FormattedMobileAppHeaderItems;
  notifications?: AppHeaderNotificationSettings;
  redirectParam?: string;
  onSearch: (query: string) => void;
  isAnon: boolean;
  /**
   * used to conditonally hide the default search icon and notification bell
   */
  isEnterprise?: boolean;
} & CrossDeviceStateProps;

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

const StyledMenuBar = styled.ul(
  css({
    display: `flex`,
    padding: 0,
    listStyle: `none`,
    margin: 0,
    width: `100%`,
    alignItems: 'center',
  })
);

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  notifications,
  onSearch,
  redirectParam,
  isAnon,
  isEnterprise,
  openCrossDeviceItemId,
  setOpenCrossDeviceItemId,
}) => {
  const [mode, , modes] = useColorModes();
  const bgCurrent = modes[mode]['background-current'];
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [allowScroll, setAllowScroll] = useState<boolean>(false);

  const [notificationsBell, notificationsView] = useHeaderNotifications({
    settings: notifications,
    Renderer: NotificationsContents,
    openCrossDeviceItemId,
    setOpenCrossDeviceItemId,
  });

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
          {mapItemToElement(
            action,
            item,
            isAnon,
            redirectParam,
            undefined,
            true
          )}
        </AppHeaderListItem>
      );
    });
  };

  const right = [
    ...(notificationsBell && !isEnterprise ? [notificationsBell] : []),
    ...items.right,
  ];

  const onItemType = (type: string | undefined) => {
    if (
      type &&
      (type === 'catalog-dropdown' || type === 'resources-dropdown')
    ) {
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
          ariaLabel="Mobile Navigation"
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
        <Background bg={bgCurrent}>
          <HeaderHeightArea
            display={{ _: `block`, [appHeaderMobileBreakpoint]: `none` }}
            as="nav"
            ariaLabel="Mobile Navigation"
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
                isAnon={isAnon}
                isEnterprise={isEnterprise}
                handleCloseMainMenu={() => setMobileMenuOpen(false)}
              />
            </StyledContentContainer>
          </HeaderHeightArea>
        </Background>
      </StyledOverlay>
      <Box display={{ _: `block`, [appHeaderMobileBreakpoint]: `none` }}>
        {notificationsView}
      </Box>
    </>
  );
};
