// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { createConfig, merge } = require('@codecademy/webpack-config');

/**
 * Base Webpack Build Config
 *
 * Absolute minimum config for our webpack builds
 *
 * This is the config that all others are based on
 */

module.exports = ({ config, mode }) => {
  const DEV = mode === 'DEVELOPMENT';
  const defaultConfig = createConfig()
    .common({
      context: path.resolve(__dirname, '../'),
      includeDefaults: false,
    })
    .babel()
    .css()
    .merge({
      plugins: [new ForkTsCheckerWebpackPlugin()],
      resolve: {
        alias: {
          gamut: path.resolve(__dirname, '../../../packages/gamut/src'),
          'gamut-styles': path.resolve(
            __dirname,
            '../../../packages/gamut-styles'
          ),
        },
      },
    })
    .toConfig();

  // Remove webpack-config defaults that interfere with storybook
  delete defaultConfig.entry;
  delete defaultConfig.output;

  // let webpack-config handle optimization
  delete config.optimization;

  // Remove default storybook babel-loader
  const babelIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.js')
  );
  if (babelIndex > -1) {
    config.module.rules[babelIndex] = null;
  }
  // remove default storybook css loader
  const cssIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.css')
  );
  if (cssIndex > -1) {
    config.module.rules[cssIndex] = null;
  }

  config.module.rules = config.module.rules.filter(Boolean);

  return merge.smart(defaultConfig, config);
};
