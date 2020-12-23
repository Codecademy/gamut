import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';

export type HeaderTabProps = {
  className?: string;
};

export const HeaderTab: React.FC<HeaderTabProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cx(styles.headerTabItem, styles.headerTab, className)}>
      {children}
    </div>
  );
};
