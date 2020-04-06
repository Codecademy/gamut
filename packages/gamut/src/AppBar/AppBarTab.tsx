import React from 'react';
import cx from 'classnames';
import styles from './styles/index.scss';

export type AppBarTabProps = {
  button?: boolean;
  className?: string;
};

const AppBarTab: React.FC<AppBarTabProps> = ({
  button,
  className,
  children,
}) => {
  const classes = cx(
    {
      [styles.tab]: true,
      [styles.tabButton]: button,
    },
    className
  );
  return <div className={classes}>{children}</div>;
};

export default AppBarTab;
