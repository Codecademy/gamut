import { AppBar, AppBarSection, AppBarTab, Logo } from '../../gamut/src';
import React from 'react';
import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../../Templating';
import styles from './AppBar-story.scss';

export default {
  component: AppBar,
  title: 'Component/AppBar',
};

export const defaultAppBarFullWidth = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      This is an example of an AppBar component that contains one left-oriented
      AppBarSection that holds one AppBar Tab. These components mostly provide
      spacing and layout help that you can use for something like a footer or
      header
    </StoryDescription>
    <AppBar className={styles.container}>
      <AppBarSection position="left">
        <AppBarTab button>This is an AppBar Tab</AppBarTab>
      </AppBarSection>
    </AppBar>
  </StoryTemplate>
);

defaultAppBarFullWidth.story = {
  name: 'AppBar',
};

export const anotherAppBar = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      This is an example of how our headers use the AppBar component to format
      various sections in a bar (left, center, and right). The AppBar can hold
      as many AppBarSections as you'd like.
    </StoryDescription>
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
  </StoryTemplate>
);

anotherAppBar.story = {
  name: 'Header AppBar',
};
