import {
  AppBarSection,
  Box,
  ContentContainer,
  FlexBox,
  Overlay,
} from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { mapItemToElement, StyledAppBar } from '../AppHeader';
import {
  focusStyles,
  hoverStyles,
} from '../AppHeader/AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
import { FormattedMobileAppHeaderItems } from '../AppHeader/types';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  items: FormattedMobileAppHeaderItems;
  redirectParam?: string;
  onSearch: (query: string) => void;
};

const IconButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 0.5rem;
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

  @media only screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  items,
  onSearch,
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
        ml={index === 0 ? 0 : 4}
        mr={index === items.length - 1 ? 0 : 4}
      >
        {mapItemToElement(action, item, redirectParam)}
      </Box>
    ));
  };

  return (
    <>
      {!mobileMenuOpen && ( // need this bc AppBar has a hardcoded z-Index of 15
        <StyledAppBar>
          <AppBarSection position="left">
            {mapItemsToElement(items.left)}
          </AppBarSection>
          <AppBarSection position="right">
            {mapItemsToElement(items.right)}

            <FlexBox ml={24}>
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
                >
                  <CloseIcon width={20} height={20} />
                </IconButton>
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
    </>
  );
};
