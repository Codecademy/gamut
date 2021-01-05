import { ButtonDeprecated } from '@codecademy/gamut';
import cx from 'classnames';
import React from 'react';

import { AppHeaderLink } from '../../AppHeader/types';
import styles from './styles.scss';

export type AppHeaderLinkElementProps = {
  className?: string;
  item: AppHeaderLink;
  trackUserClick: (target: string) => void;
};

export const AppHeaderLinkElement: React.FC<AppHeaderLinkElementProps> = ({
  item,
  className,
  trackUserClick,
}) => {
  return (
    <div className={cx(styles.basicNavLinkHeader, className)}>
      <ButtonDeprecated
        className={cx(styles.plainNavLink, styles.navLink, styles.hoverable)}
        // data-testid={`header-${item.id}`}
        flat
        href={item.href}
        onClick={() => trackUserClick(item.target)}
        theme="navy"
      >
        {item.text}
      </ButtonDeprecated>
    </div>
  );
};
