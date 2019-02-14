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

const config = createConfig()
  .common({
    context: path.join(__dirname, '../'),
  })
  .css()
  .toConfig();

module.exports = defaultConfig => {
  delete config.entry;
  delete config.output;

  const mergedConfig = merge.smart(defaultConfig, config);

  mergedConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });
  mergedConfig.resolve.extensions.push('.ts', '.tsx');

  return mergedConfig;
};
