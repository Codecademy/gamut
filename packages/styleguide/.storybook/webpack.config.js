// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { createConfig, merge } = require('@codecademy/webpack-config');
const DEV = process.env.NODE_ENV !== 'production';

/**
 * Base Webpack Build Config
 *
 * Absolute minimum config for our webpack builds
 *
 * This is the config that all others are based on
 */

module.exports = ({ config }) => {
  const defaultConfig = createConfig()
    .common({
      context: path.resolve(__dirname, '../'),
      includeDefaults: false,
    })
    .css()
    .if(DEV, config => {
      return config.merge({
        plugins: [new ForkTsCheckerWebpackPlugin()],
      });
    })
    .toConfig();

  const configToExtend = {
    devtool: 'source-map',
    module: defaultConfig.module,
    plugins: defaultConfig.plugins,
    resolve: {
      extensions: defaultConfig.resolve.extensions,
    },
  };

  const jsIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.js')
  );
  if (jsIndex > -1) {
    config.module.rules[jsIndex].test = /\.(mdx|mjs|(j|t)sx?)$/;
    config.module.rules[jsIndex].include.push(
      path.resolve(__dirname, '../../../packages')
    );
    config.module.rules[jsIndex].exclude.push(/.*node_modules.*/);
    config.module.rules[jsIndex].use[0].options.babelrc = false;
    config.module.rules[jsIndex].use[0].options.presets.push(
      '@babel/preset-typescript'
    );
    config.module.rules[jsIndex].use.push({
      loader: 'react-docgen-typescript-loader',
      options: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        shouldExtractLiteralValuesFromEnum: true,
        propFilter(p) {
          if (p.parent && p.parent.fileName.match('node_modules')) {
            if (p.required) {
              return true;
            }
            return false;
          }
          return true;
        },
      },
    });
  }

  const cssIndex = config.module.rules.findIndex(
    r => r && r.test.test('test.css')
  );
  if (cssIndex > -1) {
    config.module.rules[cssIndex] = null;
  }

  config.module.rules = config.module.rules.filter(Boolean);
  const finalConfig = merge.smart(config, configToExtend);
  return finalConfig;
};
