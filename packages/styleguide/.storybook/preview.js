import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import prettier from 'prettier/standalone';
import prettierConfig from '@codecademy/prettier-config';
import parserTypescript from 'prettier/parser-typescript';
import { storySort } from './utils';

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
    storySort,
  },
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  docs: {
    /** Currently this is the way to do this with MDX
     * https://github.com/storybookjs/storybook/issues/8078#issuecomment-605430645
     */
    transformSource: (src) => {
      return prettier.format(src, {
        ...prettierConfig,
        parser: 'typescript',
        plugins: [parserTypescript],
      });
    },
  },
});
