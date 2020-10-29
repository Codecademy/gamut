import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';

import './decorators/wrapper';
import { withTheme } from './decorators/theme';

const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: '/',
});

export const parameters = {
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
};

export const decorators = [withKnobs, withTheme];
