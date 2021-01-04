import cx from 'classnames';
import React from 'react';

import styles from './styles.scss';

export type HeaderTabProps = {
  className?: string;
};

export const AppHeaderTab: React.FC<HeaderTabProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cx(className, styles.headerTabItem, styles.headerTab)}>
      {children}
    </div>
  );
};
