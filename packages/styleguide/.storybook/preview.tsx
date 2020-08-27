import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';
import { ThemeProvider } from '@codecademy/gamut/src';

import './decorators/wrapper';

const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: '/',
});

addParameters({
  viewMode: 'docs',
  options: {
    theme: theme,
    storySort: {
      order: [
        'About',
        'Meta',
        'Foundations',
        'Typography',
        'Layouts',
        'Atoms',
        'Molecules',
        'Organisms',
        'Labs',
        'Deprecated',
      ],
      // Fallback ordering
      method: 'alphabetical',
      locales: 'en-US',
    },
  },
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
});

addDecorator(withKnobs);

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];
