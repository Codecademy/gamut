import {
  AppBar,
  AppBarSection,
  Container,
  FillButton,
  Overlay,
  TextButton,
} from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
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
import { FormattedAppHeaderMobileItems } from './../GlobalHeader/GlobalHeaderVariants';
import styles from './styles.module.scss';

export type AppHeaderMobileProps = {
  items: FormattedAppHeaderMobileItems;
  className?: string;
  action: AppHeaderClickHandler;
};

const AppHeaderTextButton = styled(TextButton)(focusStyles);
const AppHeaderFillButton = styled(FillButton)(focusStyles);

const IconButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: normal;
  line-height: 1.5;
  ${hoverStyles}
  ${focusStyles}
`;

const mapItemToElement = (
  item: AppHeaderItem,
  action: AppHeaderClickHandler
): ReactNode => {
  switch (item.type) {
    case 'logo':
      return <AppHeaderLogo item={item} action={action} key={item.id} />;
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

  const renderLeftItems = () => {
    return items.left.map((item) => mapItemToElement(item, action));
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">{renderLeftItems()}</AppBarSection>
        <AppBarSection position="right">
          {items.right.map((item) => mapItemToElement(item, action))}
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
              <h3>Search Component - placeholder</h3>
              <AppHeaderMainMenuMobile items={items.mainMenu} action={action} />
            </div>
          </div>
        </Overlay>
      </Container>
    </>
  );
};
