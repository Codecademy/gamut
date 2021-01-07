import { ButtonDeprecated } from '@codecademy/gamut';
import cx from 'classnames';
import React from 'react';

import { AppHeaderLink } from '../../AppHeader/types';
import styles from './styles.scss';

export type AppHeaderLinkElementProps = {
  className?: string;
  item: AppHeaderLink;
  onClick: (trackingTarget: string) => void;
};

export const AppHeaderLinkElement: React.FC<AppHeaderLinkElementProps> = ({
  item,
  className,
  onClick,
}) => {
  return (
    <div className={cx(styles.basicNavLinkHeader, className)}>
      <ButtonDeprecated
        className={cx(styles.plainNavLink, styles.navLink, styles.hoverable)}
        data-testid={item.dataTestId}
        flat
        href={item.href}
        onClick={() => onClick(item.trackingTarget)}
        theme="navy"
      >
        {item.text}
      </ButtonDeprecated>
    </div>
  );
};
