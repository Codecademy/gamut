import { WithChildrenProp } from '@codecademy/gamut';
import cx from 'classnames';
import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';

export interface AppBarSectionProps extends WithChildrenProp {
  /**
   * Position of the the section within the AppBar.
   */
  position?: 'left' | 'center' | 'right';
  className?: string;
}

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
