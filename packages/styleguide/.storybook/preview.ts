import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';
import 'focus-visible/dist/focus-visible.min.js';

import './decorators/wrapper';
import { withEmotion } from './decorators/emotion';
import { Page } from './components';

const theme = create({
  base: 'light',
  brandTitle: 'Gamut',
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
  options: {
    theme: theme,
    storySort: {
      order: [
        'Gamut',
        'Meta',
        'Foundations',
        'Typography',
        'Layouts',
        'Atoms',
        'Molecules',
        'Organisms',
        'Brand',
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

export const decorators = [withKnobs, withEmotion];
