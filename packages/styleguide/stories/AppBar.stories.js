import { AppBar, AppBarSection, AppBarTab } from '../../gamut/src';
import React from 'react';
import { Logo } from '@codecademy/gamut';
import styles from './AppBar-story.scss';

export default {
  component: AppBar,
  title: 'Component/AppBar',
};

export const defaultAppBarFullWidth = () => (
  <AppBar className={styles.container}>
    <AppBarSection position="left">
      <AppBarTab button>This is an AppBar Tab</AppBarTab>
    </AppBarSection>
  </AppBar>
);

defaultAppBarFullWidth.story = {
  name: 'AppBar',
};

export const anotherAppBar = () => (
  <AppBar className={styles.container}>
    <AppBarSection position="left">
      <a href="https://www.codecademy.com" className={styles.logo}>
        <Logo />
      </a>
    </AppBarSection>
    <AppBarSection position="center" className={styles.centerSection}>
      Pricing
    </AppBarSection>
    <AppBarSection position="right">Sign In</AppBarSection>
  </AppBar>
);

anotherAppBar.story = {
  name: 'Header AppBar',
};
