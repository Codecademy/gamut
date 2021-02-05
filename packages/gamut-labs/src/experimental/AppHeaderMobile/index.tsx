import { AppBar, AppBarSection, Container, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { AppHeaderMainMenuMobile } from '@codecademy/gamut-labs/src/experimental/AppHeaderMobile/AppHeaderMainMenuMobile';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { mapItemToElement } from '..';
import { FormattedMobileAppHeaderItems } from '../GlobalHeader/GlobalHeaderVariants';
import { AppHeaderTab } from './../AppHeader/AppHeaderElements/AppHeaderTab';
import {
  focusStyles,
  hoverStyles,
} from './../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderClickHandler } from './../AppHeader/AppHeaderElements/types';
import styles from './styles.module.scss';

export type AppHeaderMobileProps = {
  items: FormattedMobileAppHeaderItems;
  className?: string;
  action: AppHeaderClickHandler;
};

// will likely move from here --
const IconButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: normal;
  line-height: 1.5;
  ${hoverStyles}
  ${focusStyles}
`;

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  items,
  className,
  action,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const renderMobileLeftItems = () => {
    return items.left.map((item) => mapItemToElement(action, item));
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">{renderMobileLeftItems()}</AppBarSection>
        <AppBarSection position="right">
          {items.right.map((item) => mapItemToElement(action, item))}
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
      </AppBar>
      <Container>
        <Overlay
          className={styles.overlay}
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
        >
          <div>
            <AppBar>
              <AppBarSection position="left">
                {renderMobileLeftItems()}
              </AppBarSection>
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
            </AppBar>
            <div className={styles.overlayBody}>
              <h3>Search Component - placeholder</h3>
              <AppHeaderMainMenuMobile items={items.mainMenu} action={action} />
            </div>
          </div>
        </Overlay>
      </Container>
    </>
  );
};
