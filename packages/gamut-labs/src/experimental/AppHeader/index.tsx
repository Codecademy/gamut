import { AppBar, AppBarSection, ButtonDeprecated } from '@codecademy/gamut';
import cx from 'classnames';

import React from 'react';
import { Logo } from '../..';
import { AppHeaderItem } from './types';
import { FillButton, TextButton } from '../../../../gamut/src/Button';
import { colors } from '@codecademy/gamut-styles';
import { ReactElement } from 'react';

import styles from './styles.scss';
import { AppHeaderDropdown } from '../AppHeaderDropdown';

export type AppHeaderProps = {
  items: { left: AppHeaderItem[]; right: AppHeaderItem[] };
  className?: string;
};

const mapItemToElement = (item: AppHeaderItem): ReactElement => {
  switch (item.type) {
    case 'logo':
      return (
        <div className={styles.headerTabLogo}>
          <ButtonDeprecated
            className={styles.logo}
            // data-testid="header-logo"
            // onClick={() => trackClick('topnav_logo')}
            flat
            href={'/'}
            theme="navy"
          >
            <Logo type={'default'} height={27} color={colors.navy} />
          </ButtonDeprecated>
        </div>
      );
    case 'pro-logo':
      return (
        <div className={styles.headerTabLogo}>
          <ButtonDeprecated
            className={styles.logo}
            // data-testid="header-logo"
            // onClick={() => trackClick('topnav_logo')}
            flat
            href={'/'}
            theme="navy"
          >
            <Logo type={'proMono'} height={27} color={colors.navy} />
          </ButtonDeprecated>
        </div>
      );
    case 'link':
      return (
        <div className={cx(styles.basicNavLinkHeader)}>
          <ButtonDeprecated
            className={cx(
              styles.plainNavLink,
              styles.navLink,
              styles.hoverable
            )}
            // data-testid={`header-${item.id}`}
            flat
            href={item.href}
            // onClick={() => trackClick(`topnav_${name}`)}
            theme="navy"
          >
            {item.text}
          </ButtonDeprecated>
        </div>
      );
    case 'text-button':
      return (
        <div>
          <TextButton
            // href={addRedirectParam(loginPath)}
            // onClick={() => trackClick('topnav_login')}
            className={styles.navLink}
            // data-testid="header-sign-in"
          >
            {item.text}
          </TextButton>
        </div>
      );
    case 'fill-button':
      return (
        <div>
          <FillButton
            // href={addRedirectParam('/register')}
            // data-testid="header-sign-up"
            // onClick={() => trackClick('topnav_signup')}
            className={cx(styles.navLink)}
          >
            {item.text}
          </FillButton>
        </div>
      );
    case 'popover':
      return <AppHeaderDropdown item={item} />;
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({ items }) => {
  return (
    <AppBar>
      <AppBarSection position="left">
        {items.left.map((item) => mapItemToElement(item))}
      </AppBarSection>
      <AppBarSection position="right">
        {items.right.map((item) => mapItemToElement(item))}
      </AppBarSection>
    </AppBar>
  );
};
