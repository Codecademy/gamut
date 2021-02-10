import { AppBarSection, Box, Container, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

import { mapItemToElement, StyledAppBar } from './../AppHeader';
import { AppHeaderTab } from './../AppHeader/AppHeaderElements/AppHeaderTab';
import {
  focusStyles,
  hoverStyles,
} from './../AppHeader/AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from './../AppHeader/AppHeaderElements/types';
import { FormattedMobileAppHeaderItems } from './../AppHeader/types';
import { AppHeaderMainMenuMobile } from './../AppHeaderMobile/AppHeaderMainMenuMobile';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  items: FormattedMobileAppHeaderItems;
  renderSearch?: () => ReactNode;
};

const IconButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: normal;
  line-height: 1.5;
  ${hoverStyles}
  ${focusStyles}
`;

const StyledOverlay = styled(Overlay)`
  display: block;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
`;

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  renderSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const renderLeftItems = () => {
    return items.left.map((item: AppHeaderItem) =>
      mapItemToElement(action, item)
    );
  };

  const mapItemsToElement = <T extends AppHeaderItem[]>(items: T) => {
    return items.map((item) => mapItemToElement(action, item));
  };

  return (
    <>
      {!mobileMenuOpen && ( //need this bc AppBar has a hardcoded z-Index of 15
        <StyledAppBar>
          <AppBarSection position="left">
            {mapItemsToElement(items.left)}
          </AppBarSection>
          <AppBarSection position="right">
            {mapItemsToElement(items.right)}
            <AppHeaderTab>
              <IconButton
                type="button"
                data-testid="header-mobile-menu"
                aria-label="open navigation menu"
                onClick={() => {
                  openMobileMenu();
                }}
              >
                <MenuIcon height={20} width={20} />
              </IconButton>
            </AppHeaderTab>
          </AppBarSection>
        </StyledAppBar>
      )}
      <Container>
        <StyledOverlay
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <div>
            <StyledAppBar>
              <AppBarSection position="left">{renderLeftItems()}</AppBarSection>
              <AppBarSection position="right">
                <IconButton
                  type="button"
                  aria-label="close menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <CloseIcon width={20} height={20} />
                </IconButton>
              </AppBarSection>
            </StyledAppBar>
            <Box padding={16}>
              <AppHeaderMainMenuMobile
                items={items.mainMenu}
                action={action}
                renderSearch={renderSearch}
              />
            </Box>
          </div>
        </StyledOverlay>
      </Container>
    </>
  );
};
