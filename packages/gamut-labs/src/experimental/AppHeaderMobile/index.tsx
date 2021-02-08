import {
  AppBar,
  AppBarSection,
  ButtonDeprecatedBase,
  Container,
  Overlay,
} from '@codecademy/gamut';
import { CloseIcon, MenuIcon, SearchIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { AppHeaderMainMenuMobile, mapItemToElement } from '..';
import { FormattedMobileAppHeaderItems } from '../GlobalHeader/GlobalHeaderVariants';
import { AppHeaderTab } from './../AppHeader/AppHeaderElements/AppHeaderTab';
import {
  focusStyles,
  hoverStyles,
} from './../AppHeader/AppHeaderElements/SharedStyles';
import { AppHeaderClickHandler } from './../AppHeader/AppHeaderElements/types';
import styles from './styles.module.scss';

export type AppHeaderMobileProps = {
  action: AppHeaderClickHandler;
  className?: string;
  items: FormattedMobileAppHeaderItems;
  zIndex: number;
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

type OverlayProps = {
  zIndex: number;
};

const StyledOverlay = styled(Overlay)<OverlayProps>(({ zIndex }) => {
  return css`
    display: block;
    z-index: ${{ zIndex }};
  `;
});

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  className,
  items,
  zIndex,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchPath = (query?: string, page?: number) => {
    if (!query) {
      return '/search';
    }

    const encodedQuery = encodeURIComponent(query);
    return `/search?query=${encodedQuery}${page ? `&page=${page}` : ''}`;
  };

  const navigateToSearch = (searchTerm: string) => {
    window.location.assign(searchPath(searchTerm));
    setMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const renderLeftItems = () => {
    return items.left.map((item) => mapItemToElement(action, item));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    navigateToSearch(searchValue);
  };

  const renderSearch = () => {
    return (
      <form
        className={styles.search}
        id="search-form"
        action="/search"
        onSubmit={handleSubmit}
      >
        <input
          name="query"
          type="search"
          placeholder="Search our catalog"
          aria-label="search"
          className={styles.input}
          value={searchValue}
          onChange={handleChange}
        />
        <ButtonDeprecatedBase className={styles.searchIcon}>
          <SearchIcon />
        </ButtonDeprecatedBase>
      </form>
    );
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">{renderLeftItems()}</AppBarSection>
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
        <StyledOverlay
          className={styles.overlay}
          clickOutsideCloses
          escapeCloses
          isOpen={mobileMenuOpen}
          onRequestClose={() => setMobileMenuOpen(false)}
          zIndex={zIndex}
        >
          <div>
            <AppBar className={className}>
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
            </AppBar>
            <div className={styles.overlayBody}>
              {renderSearch()}
              <AppHeaderMainMenuMobile items={items.mainMenu} action={action} />
            </div>
          </div>
        </StyledOverlay>
      </Container>
    </>
  );
};
