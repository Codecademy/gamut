import { ButtonDeprecated } from '@codecademy/gamut';
import React from 'react';
import { AppHeaderLink } from '../../AppHeader/types';
import cx from 'classnames';
import styles from './styles.scss';

export type AppHeaderLinkElementProps = {
  item: AppHeaderLink;
  className?: string;
};

export const AppHeaderLinkElement: React.FC<AppHeaderLinkElementProps> = ({
  item,
  className,
}) => {
  return (
    <div className={cx(styles.basicNavLinkHeader, className)}>
      <ButtonDeprecated
        className={cx(styles.plainNavLink, styles.navLink, styles.hoverable)}
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
};
