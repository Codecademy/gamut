import React from 'react';
import cx from 'classnames';
import styles from './styles/index.module.scss';

export type AppBarSectionProps = {
  /**
   * Position of the the section within the AppBar.
   */
  position?: 'left' | 'center' | 'right';
  className?: string;
};

export const AppBarSection: React.FC<AppBarSectionProps> = ({
  position,
  className,
  children,
}) => {
  const classes = cx(
    styles.section,
    {
      [styles.sectionRight]: position === 'right',
      [styles.sectionLeft]: position === 'left',
      [styles.sectionCenter]: position === 'center',
    },
    className
  );
  return <div className={classes}>{children}</div>;
};
