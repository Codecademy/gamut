import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import prettier from 'prettier/standalone';
import prettierConfig from '@codecademy/prettier-config';
import parserTypescript from 'prettier/parser-typescript';

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
