import React from 'react';
import { Avatar } from '../../brand-components/src/Avatar/';
import { VisualTheme } from '../../gamut/src';
import { withKnobs, select } from '@storybook/addon-knobs';
import styles from './Avatar-story.scss';

export default {
  component: Avatar,
  title: 'Brand/Avatar',
  decorators: [withKnobs],
};

export const avatar = () => (
  <Avatar
    src="https://content.codecademy.com/courses/free/boba.svg"
    alt="testy"
    className={select('className', ['', styles.largeContainerOverride], '')}
    theme={select(
      'theme',
      [VisualTheme.LightMode, VisualTheme.DarkMode],
      VisualTheme.LightMode
    )}
  />
);

avatar.story = {
  name: 'Avatar used in Brand components',
};
