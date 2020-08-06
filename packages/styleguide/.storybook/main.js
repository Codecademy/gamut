const path = require('path');
const emoji = require('remark-emoji');
const { configs } = require('@codecademy/webpack-config');

module.exports = {
  stories: ['../stories/**/*.stories.(mdx|tsx)'],
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.concat(
      configs.css().module.rules
    );

    config.module.rules
      .filter((rule) => {
        var reg = new RegExp(rule.test);
        return reg.test('hello.story.mdx') || reg.test('hello.mdx');
      })
      .map((rule) => {
        rule.use
          .find((plugin) => plugin.loader.indexOf('@mdx-js') > -1)
          .options.remarkPlugins.push(emoji);
        return rule;
      });

    config.resolve.alias = {
      ...config.resolve.alias,
      '~styleguide/blocks': path.resolve(__dirname, '../Blocks/'),
    };

    return config;
  },

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
  ],
};
