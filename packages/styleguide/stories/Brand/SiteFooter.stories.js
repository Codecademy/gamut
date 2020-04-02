import React from 'react';
import { SiteFooter } from '../../../brand-components';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Avatar,
  title: 'Brand/Avatar',
  decorators: [withKnobs],
};

export const siteFooter = () => <SiteFooter />;

siteFooter.story = {
  name: 'The main footer for codecademy.com',
};
