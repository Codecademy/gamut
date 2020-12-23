import { AppBar, AppBarSection } from '@codecademy/gamut';
import cx from 'classnames';

import React from 'react';

import { AppHeaderItem } from './types';
import { FillButton, TextButton } from '../../../../gamut/src/Button';

import { ReactElement } from 'react';

import styles from './styles.scss';
import { AppHeaderLinkElement } from '../AppHeaderElements/AppHeaderLinkElement';
import { AppHeaderDropdown } from '../AppHeaderElements/AppHeaderDropdown';
import { HeaderTab } from '../../brand';
import { AppHeaderLogoElement } from '../AppHeaderElements/AppHeaderLogoElement';

export type AppHeaderProps = {
  items: { left: AppHeaderItem[]; right: AppHeaderItem[] };
  className?: string;
};

const mapItemToElement = (item: AppHeaderItem): ReactElement => {
  switch (item.type) {
    case 'logo':
      return (
        <HeaderTab className={styles.headerTabLogo}>
          <AppHeaderLogoElement item={item} />
        </HeaderTab>
      );
    case 'link':
      return <AppHeaderLinkElement item={item} />;
    case 'text-button':
      return (
        <HeaderTab>
          <TextButton
            // href={addRedirectParam(loginPath)}
            // onClick={() => trackClick('topnav_login')}
            className={styles.navLink}
            // data-testid="header-sign-in"
          >
            {item.text}
          </TextButton>
        </HeaderTab>
      );
    case 'fill-button':
      return (
        <HeaderTab>
          <FillButton
            // href={addRedirectParam('/register')}
            // data-testid="header-sign-up"
            // onClick={() => trackClick('topnav_signup')}
            className={cx(styles.navLink)}
          >
            {item.text}
          </FillButton>
        </HeaderTab>
      );
    case 'popover':
      return <AppHeaderDropdown item={item} />;
    default:
      return <HeaderTab />;
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  items,
  className = '',
}) => {
  return (
    <AppBar className={className}>
      <AppBarSection position="left">
        {items.left.map((item) => mapItemToElement(item))}
      </AppBarSection>
      <AppBarSection position="right">
        {items.right.map((item) => mapItemToElement(item))}
      </AppBarSection>
    </AppBar>
  );
};
