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
    .css()
    .merge({
      plugins: [new ForkTsCheckerWebpackPlugin()],
    })
    .toConfig();

  const configToExtend = {
    devtool: 'source-map',
    module: defaultConfig.module,
    plugins: defaultConfig.plugins,
    resolve: {
      extensions: defaultConfig.resolve.extensions,
      alias: {
        gamut: path.resolve(__dirname, '../../../packages/gamut/src'),
        'gamut-styles': path.resolve(
          __dirname,
          '../../../packages/gamut-styles'
        ),
      },
    },
  };

  const jsIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.js')
  );
  if (jsIndex > -1) {
    config.module.rules[jsIndex].test = /\.(mjs|(j|t)sx?)$/;
    config.module.rules[jsIndex].include.push(
      path.resolve(__dirname, '../../../packages')
    );
    config.module.rules[jsIndex].exclude.push(/node_modules/);
    config.module.rules[jsIndex].use[0].options.babelrc = false;
    config.module.rules[jsIndex].use[0].options.presets.push(
      '@babel/preset-typescript'
    );
    config.module.rules[jsIndex].use[0].options.plugins.concat([
      [
        'babel-plugin-react-docgen',
        {
          DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
        },
      ],
      [
        'babel-plugin-react-docgen-typescript',
        {
          docgenCollectionName: 'STORYBOOK_REACT_CLASSES',
          // include: 'gamut.*\\.tsx$',
          // exclude: 'stories\\.tsx$',
        },
      ],
    ]);
    // config.module.rules[jsIndex].use.push('react-docgen-typescript-loader');
  }

  const cssIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.css')
  );
  if (cssIndex > -1) {
    config.module.rules[cssIndex] = null;
  }

  config.module.rules = config.module.rules.filter(Boolean);
  // console.log(config.module.rules[0].use[0].options.plugins);
  return merge.smart(config, configToExtend);
};
