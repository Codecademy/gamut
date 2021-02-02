const path = require('path');
const { configs } = require('@codecademy/webpack-config');
const getStories = require('./getStories');

// https://github.com/storybookjs/storybook/issues/12262#issuecomment-681953346
// make a shallow copy of an object, rejecting keys that match /emotion/
function emotionless<T extends Record<string, unknown>>(object: T) {
  let result = {} as T;
  for (let key in object) {
    if (!/emotion/.test(key)) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    './addons/system/preset',
  ],
  stories: getStories(),

  babel: (config: any) => {
    config.plugins = config.plugins.map((plugin: any) => {
      if (/emotion/.test(plugin[0])) {
        return [
          require('@emotion/babel-plugin'),
          {
            sourceMap: true,
            autoLabel: 'always',
            labelFormat: '[local]',
          },
        ];
      }

      return plugin;
    });
    return config;
  },
  webpackFinal: (config: any) => {
    config.module.rules = config.module.rules.concat(
      configs.css().module.rules
    );

    config.resolve = {
      ...config.resolve,
      alias: {
        ...emotionless(config.resolve.alias),
        '~styleguide/blocks': path.resolve(__dirname, './components/'),
        '@codecademy/gamut-styles$': path.resolve(
          __dirname,
          '../../gamut-styles/src'
        ),
        '@codecademy/gamut-system$': path.resolve(
          __dirname,
          '../../gamut-system/src'
        ),
        '@codecademy/gamut$': path.resolve(__dirname, '../../gamut/src'),
      },
    };

    return config;
  },
};
