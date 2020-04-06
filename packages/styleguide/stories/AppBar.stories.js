import { AppBar, AppBarSection, AppBarTab, Logo } from '../../gamut/src';
import React from 'react';
import styles from './AppBar-story.scss';

export default {
  component: AppBar,
  title: 'Component/AppBar',
};

export const defaultAppBarFullWidth = () => (
  <div>
    <p>
      This is an example of an AppBar component that contains one left-oriented
      AppBarSection that holds one AppBar Tab. These components mostly provide
      spacing and layout help that you can use for something like a footer or
      header
    </p>
    <AppBar className={styles.container}>
      <AppBarSection position="left">
        <AppBarTab button>This is an AppBar Tab</AppBarTab>
      </AppBarSection>
    </AppBar>
  </div>
);

defaultAppBarFullWidth.story = {
  name: 'AppBar',
};

export const anotherAppBar = () => (
  <div>
    <p>
      This is an example of how our headers use the AppBar component to format
      various sections in a bar (left, center, and right). The AppBar can hold
      as many AppBarSections as you&apos;d like.
    </p>
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
  </div>
);

anotherAppBar.story = {
  name: 'Header AppBar',
};
