import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import './decorators/wrapper';

const gamutTheme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: 'https://codecademy.com',
});

addParameters({
  viewMode: 'docs',
  options: {
    theme: gamutTheme,
    storySort: {
      order: [
        'About',
        'Foundations',
        'Atoms',
        'Molecules',
        'Organisms',
        'Brand',
        'Meta',
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
});
