import { AppBar, AppBarSection } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { ReactNode, useState } from 'react';

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

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({
  action,
  className,
  items,
  renderSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const renderLeftItems = () => {
    return items.left.map((item) => mapItemToElement(action, item));
  };

  return (
    <>
      <AppBar className={className}>
        <AppBarSection position="left">{renderLeftItems()}</AppBarSection>
        <AppBarSection position="right">
          {items.right.map((item) => mapItemToElement(action, item))}
          <AppHeaderTab>
            {mobileMenuOpen ? (
              <IconButton
                type="button"
                aria-label="close menu"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                <CloseIcon width={20} height={20} />
              </IconButton>
            ) : (
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
            )}
          </AppHeaderTab>
        </AppBarSection>
      </AppBar>
      {mobileMenuOpen && (
        <div className={styles.overlayBody}>
          {renderSearch && renderSearch()}
          <AppHeaderMainMenuMobile items={items.mainMenu} action={action} />
        </div>
      )}
    </>
  );
};
