import {
  AppBar,
  AppBarSection,
  Container,
  FillButton,
  Overlay,
  TextButton,
} from '@codecademy/gamut';
import { MenuIcon } from '@codecademy/gamut-icons';
import { AppHeaderMainMenuMobile } from '@codecademy/gamut-labs/src/experimental/AppHeaderMobile/AppHeaderMainMenuMobile';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

import { AppHeaderLogo } from '..';
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
import { AppHeaderMobileItemsProps } from './../GlobalHeader/GlobalHeaderVariants';
import styles from './styles.module.scss';

export type AppHeaderMobileProps = {
  items: AppHeaderMobileItemsProps;
  className?: string;
  action: AppHeaderClickHandler;
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
  action: AppHeaderClickHandler
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLogo item={item} action={action} />
        </AppHeaderTab>
      );
    case 'render-element':
      return <AppHeaderTab key={item.id}>{item.renderElement()}</AppHeaderTab>;
    case 'link':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderLinkMobile
            item={item}
            action={(event: React.MouseEvent) => action(event, item)}
          />
        </AppHeaderTab>
      );
    case 'text-button':
      return (
        <AppHeaderTab key={item.id}>
          <AppHeaderTextButton
            data-testid={item.dataTestId}
            href={item.href}
            onClick={(event: React.MouseEvent) => action(event, item)}
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
            onClick={(event: React.MouseEvent) => action(event, item)}
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
  action,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const renderMobileLeftItems = () => {
    return items.left.map((item) => mapItemToElement(item, action));
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">{renderMobileLeftItems()}</AppBarSection>
        <AppBarSection position="right">
          {items.right.map((item) => mapItemToElement(item, action))}
          <AppHeaderTab>
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
          <div>
            <AppBar>
              <AppBarSection position="left">
                {renderMobileLeftItems()}
              </AppBarSection>
              <AppBarSection position="right">
                <button
                  type="button"
                  onClick={() => {
                    console.log('test');
                  }}
                >
                  Close
                </button>
              </AppBarSection>
            </AppBar>
            <h2>Search Component</h2>
            <AppHeaderMainMenuMobile items={items.mainMenu} action={action} />
          </div>
        </Overlay>
      </Container>
    </>
  );
};
