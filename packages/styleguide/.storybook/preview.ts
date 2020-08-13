import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import './decorators/wrapper';
import { theme } from './theme';

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
