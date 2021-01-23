import { create } from '@storybook/theming';
import 'focus-visible/dist/focus-visible.min.js';

import './decorators/wrapper';
import { withEmotion } from './decorators/emotion';
import { Page } from './components';
import { colors } from '@codecademy/gamut-styles/src';
import logo from './assets/gamut-logo.svg';

const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandImage: logo,
  brandUrl: '/',
});

export const parameters = {
  viewMode: 'docs',
  docs: {
    theme,
    components: {
      wrapper: Page,
    },
  },
  backgrounds: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5,
    },
    values: [
      { name: 'light', value: colors.white },
      { name: 'dark', value: colors.navy },
    ],
  },
  options: {
    showPanel: true,
    panelPosition: 'right',
    selectedPanel: 'addon-controls',
    theme: theme,
    storySort: {
      order: [
        'Gamut',
        'Foundations',
        'Typography',
        'Layouts',
        'Atoms',
        'Molecules',
        'Organisms',
        'Brand',
        'Meta',
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

export const decorators = [withEmotion];
