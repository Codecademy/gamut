import React from 'react';
import { Avatar } from '../../brand-components/src/Avatar/';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Avatar,
  title: 'Brand/Avatar',
  decorators: [withKnobs],
};

export const avatar = () => (
  <Avatar
    src="https://content.codecademy.com/courses/free/boba.svg"
    alt="testy"
    size={select('size', ['regular', 'large'], 'regular')}
    theme={select('theme', ['light-mode', 'dark-mode'], 'light-mode')}
  />
);

avatar.story = {
  name: 'Avatar used in Brand components',
};
