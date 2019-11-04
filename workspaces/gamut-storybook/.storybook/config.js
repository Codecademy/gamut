import { addParameters, configure, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import wrapper from './decorators/wrapper';

addDecorator(withA11y);
addDecorator(wrapper);

const gamutTheme = create({
  base: 'light',
  brandTitle: 'Gamut',
  brandUrl: 'https://codecademy.com',
});

addParameters({
  options: {
    theme: gamutTheme,
    showPanel: true,
  },
});

configure(
  [
    require.context('../stories', true, /\.stories\.mdx$/),
    require.context('../stories', true, /\.stories\.(j|t)sx?$/),
  ],
  module
);
