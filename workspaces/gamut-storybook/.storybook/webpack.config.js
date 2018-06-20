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
  return merge.smart(defaultConfig, config);
};
