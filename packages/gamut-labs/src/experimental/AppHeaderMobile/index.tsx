import {
  AppBar,
  AppBarSection,
  Container,
  FillButton,
  Overlay,
  TextButton,
} from '@codecademy/gamut';
import { MenuIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

import { AppHeaderDropdown, AppHeaderItemsProp, AppHeaderLogo } from '..';
import { AppHeaderTab } from './../AppHeader/AppHeaderElements/AppHeaderTab';
import {
  focusStyles,
  hoverStyles,
} from './../AppHeader/AppHeaderElements/SharedStyles';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from './../AppHeader/AppHeaderElements/types';
import { AppHeaderLinkMobile } from './../AppHeaderMobile/AppHeaderLinkMobile';
import styles from './styles.module.scss';

export type AppHeaderMobileProps = {
  items: AppHeaderItemsProp;
  className?: string;
  onClick: AppHeaderClickHandler;
};

const AppHeaderTextButton = styled(TextButton)(focusStyles);
const AppHeaderFillButton = styled(FillButton)(focusStyles);

// will likely move from here --
const MenuButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: normal;
  line-height: 1.5;
  ${hoverStyles}
  ${focusStyles}
`;

/* for right now - this function is same as in AppHeader with small exceptions of using mobile version of link
 ISSUE: order of items is different between mobile + desktop
ex. search, ex. separating elements to go in hamburger menu */
const mapItemToElement = (
  item: AppHeaderItem,
  onClick: AppHeaderClickHandler
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLogo item={item} action={onClick} />
        </AppHeaderTab>
      );
    case 'link':
      return <AppHeaderLinkMobile item={item} action={onClick} />;
    case 'dropdown':
      return (
        <AppHeaderDropdown item={item} action={onClick} /> // mobile submenu component
      );
    case 'render-element':
      return <AppHeaderTab key={item.id}>{item.renderElement()}</AppHeaderTab>; // ex search button
    case 'text-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderTextButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => onClick(event, item)}
          >
            {item.text}
          </AppHeaderTextButton>
        </AppHeaderTab>
      );
    case 'fill-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderFillButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => onClick(event, item)}
          >
            {item.text}
          </AppHeaderFillButton>
        </AppHeaderTab>
      );
  }
};

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  items,
  className,
  onClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">
          {items.left.map((item) => mapItemToElement(item, onClick))}
        </AppBarSection>
        <AppBarSection position="right">
          {items.right.map((item) => mapItemToElement(item, onClick))}
          <AppHeaderTab>
            {/* monolith aria label doesn't seem to make sense here: open settings menu */}
            <MenuButton
              type="button"
              data-testid="header-mobile-menu"
              aria-label="open navigation menu"
              onClick={() => {
                openMobileMenu();
              }}
            >
              <MenuIcon height={20} width={20} />
            </MenuButton>
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
          <Container>
            <h1>test</h1>
            <button type="button">button</button>
          </Container>
        </Overlay>
      </Container>
    </>
  );
};
