import React from 'react';
import cx from 'classnames';
import styles from './styles/index.scss';

export type AppBarSectionProps = {
  position?: 'left' | 'center' | 'right';
  className?: string;
};

const AppBarSection: React.FC<AppBarSectionProps> = ({
  position,
  className,
  children,
}) => {
  const classes = cx(
    {
      [styles.section]: true,
      [styles.sectionRight]: position === 'right',
      [styles.sectionLeft]: position === 'left',
      [styles.sectionCenter]: position === 'center',
    },
    className
  );
  return <div className={classes}>{children}</div>;
};

export default AppBarSection;
