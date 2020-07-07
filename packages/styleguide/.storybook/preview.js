import { addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create } from '@storybook/theming';
import prettier from 'prettier/standalone';
import { storySort } from './utils';

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
    storySort,
  },
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
});

addDecorator(withKnobs);
