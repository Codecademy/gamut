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
import React, { ReactNode, useState } from 'react';

import { mapItemToElement, StyledAppBar } from '../AppHeader';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
import { FormattedMobileAppHeaderItems } from '../AppHeader/types';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  items: FormattedMobileAppHeaderItems;
  renderSearch?: () => ReactNode;
  redirectParam?: string;
};

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

  @media only screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  renderSearch,
  redirectParam,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const mapItemsToElement = <T extends AppHeaderItem[]>(items: T) => {
    return items.map((item, index) => (
      <Box
        key={item.id}
        marginLeft={index === 0 ? 0 : 4}
        marginRight={index === items.length - 1 ? 0 : 4}
      >
        {mapItemToElement(action, item, redirectParam)}
      </Box>
    ));
  };

  return (
    <>
      {!mobileMenuOpen && ( // need this bc AppBar has a hardcoded z-Index of 15
        <StyledAppBar>
          <AppBarSection alignment="left">
            {mapItemsToElement(items.left)}
          </AppBarSection>
          <AppBarSection alignment="right">
            {mapItemsToElement(items.right)}

            <FlexBox marginLeft={24}>
              <IconButton
                variant="secondary"
                data-testid="header-mobile-menu"
                aria-label="open navigation menu"
                icon={MenuIcon}
                onClick={() => {
                  openMobileMenu();
                }}
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
            <AppBarSection alignment="left">
              {mapItemsToElement(items.left)}
            </AppBarSection>
            <AppBarSection alignment="right">
              <FlexBox height="2.5rem" width="2.5rem">
                <IconButton
                  variant="secondary"
                  icon={CloseIcon}
                  aria-label="close menu"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                />
              </FlexBox>
            </AppBarSection>
          </StyledAppBar>
          <ContentContainer>
            <AppHeaderMainMenuMobile
              items={items.mainMenu}
              action={action}
              renderSearch={renderSearch}
            />
          </ContentContainer>
        </div>
      </StyledOverlay>
    </>
  );
};
