// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack');
const path = require('path');
const babelCodecademyPreset = require('babel-preset-codecademy');

const { createConfig, merge } = require('@codecademy/webpack-config');

const STATS = process.env.WEBPACK_STATS;
/**
 * Base Webpack Build Config
 *
 * Absolute minimum config for our webpack builds
 *
 * This is the config that all others are based on
 */

const baseConfig = createConfig()
  .common({
    context: path.join(__dirname, '../'),
  })
  .css();

module.exports = ({ config, mode }) => {
  return baseConfig
    .merge(config)
    .merge({
      resolve: {
        extensions: ['.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: require.resolve('awesome-typescript-loader'),
              },
              {
                loader: require.resolve('react-docgen-typescript-loader'),
              },
            ],
          },
        ],
      },
    })
    .toConfig();
};
