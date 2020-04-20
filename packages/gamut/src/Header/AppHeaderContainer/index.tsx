import cx from 'classnames';
import React from 'react';

import { AppBar, AppBarSection } from '../../';

import styles from './styles.module.scss';

export type AppHeaderContainerProps = {
  className?: string;
  sections?: {
    after?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export const AppHeaderContainer: React.FC<AppHeaderContainerProps> = ({
  className,
  sections: { after, left, right } = {},
}) => {
  return (
    <header className={cx(styles.container, className)} data-testid="AppHeader">
      <AppBar className={styles.appBar}>
        <AppBarSection key="header-app-bar-section-left" position="left">
          {left}
        </AppBarSection>
        <AppBarSection key="header-app-bar-section-right" position="right">
          {right}
        </AppBarSection>
      </AppBar>
      {after}
    </header>
  );
};

export default AppHeaderContainer;
