import React from 'react';
import { SiteFooter } from '../../../brand-components';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: SiteFooter,
  title: 'Brand/SiteFooter',
  decorators: [withKnobs],
};

export const siteFooter = () => <SiteFooter />;

siteFooter.story = {
  name: 'The main footer for codecademy.com',
};
