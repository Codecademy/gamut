import { AppBar, AppBarSection } from '@codecademy/gamut';
import cx from 'classnames';
import React, { ReactElement } from 'react';

import { FillButton, TextButton } from '../../../../gamut/src/Button';
import { AppHeaderDropdown } from '../AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkElement } from '../AppHeaderElements/AppHeaderLinkElement';
import { AppHeaderLogoElement } from '../AppHeaderElements/AppHeaderLogoElement';
import { AppHeaderTab } from '../AppHeaderElements/AppHeaderTab';
import styles from './styles.scss';
import { AppHeaderItem } from './types';

export type AppHeaderProps = {
  items: AppHeaderItemsProp;
  className?: string;
  trackUserClick: (target: string) => void;
};

export type AppHeaderItemsProp = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

const mapItemToElement = (
  item: AppHeaderItem,
  trackUserClick: (target: string) => void
): ReactElement => {
  switch (item.type) {
    case 'logo':
      return (
        <AppHeaderTab className={styles.headerTabLogo}>
          <AppHeaderLogoElement item={item} trackUserClick={trackUserClick} />
        </AppHeaderTab>
      );
    case 'link':
      return (
        <AppHeaderTab className={styles.headerTabLogo}>
          <AppHeaderLinkElement item={item} trackUserClick={trackUserClick} />
        </AppHeaderTab>
      );
    case 'text-button':
      return (
        <AppHeaderTab>
          <TextButton
            // href={addRedirectParam(loginPath)}
            onClick={() => trackUserClick(item.target)}
            className={styles.navLink}
            // data-testid="header-sign-in"
          >
            {item.text}
          </TextButton>
        </AppHeaderTab>
      );
    case 'fill-button':
      return (
        <AppHeaderTab>
          <FillButton
            // href={addRedirectParam('/register')}
            // data-testid="header-sign-up"
            onClick={() => trackUserClick(item.target)}
            className={cx(styles.navLink)}
          >
            {item.text}
          </FillButton>
        </AppHeaderTab>
      );
    case 'popover':
      return (
        <AppHeaderTab className={styles.headerTabLogo}>
          <AppHeaderDropdown item={item} trackUserClick={trackUserClick} />
        </AppHeaderTab>
      );
    case 'render-popover':
      return <AppHeaderTab>{item.popover()}</AppHeaderTab>;

    default:
      return <AppHeaderTab />;
  }
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  items,
  className = '',
  trackUserClick,
}) => {
  return (
    <AppBar className={className}>
      <AppBarSection position="left">
        {items.left.map((item) => mapItemToElement(item, trackUserClick))}
      </AppBarSection>
      <AppBarSection position="right">
        {items.right.map((item) => mapItemToElement(item, trackUserClick))}
      </AppBarSection>
    </AppBar>
  );
};
