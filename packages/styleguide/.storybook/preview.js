import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';

import './decorators/wrapper';

const gamutTheme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: 'https://gamut.codecademy.com',
});

addParameters({
  viewMode: 'docs',
  options: {
    theme: gamutTheme,
    storySort: {
      order: [
        'About',
        'Meta',
        'Foundations',
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
});

addDecorator(withKnobs);
