import {
  AppBarSection,
  Box,
  Container,
  FlexBox,
  Overlay,
} from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

import { mapItemToElement, StyledAppBar } from './../AppHeader';
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

  const mapItemsToElement = <T extends AppHeaderItem[]>(items: T) => {
    return items.map((item, index) => (
      <Box
        key={item.id}
        marginLeft={index === 0 ? 0 : 4}
        marginRight={index === items.length - 1 ? 0 : 4}
      >
        {mapItemToElement(action, item)}
      </Box>
    ));
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

            <FlexBox marginLeft={24}>
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
      <Container>
        <StyledOverlay
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <div>
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
            <Box paddingX={16}>
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
