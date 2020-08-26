const path = require('path');
const { configs } = require('@codecademy/webpack-config');

module.exports = {
  stories: ['../stories/**/*.stories.@(mdx|tsx)'],
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.concat(
      configs.css().module.rules
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      '~styleguide/blocks': path.resolve(__dirname, './Blocks/'),
    };

    return config;
  },

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
  ],
};
