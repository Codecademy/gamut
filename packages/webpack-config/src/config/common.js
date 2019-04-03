const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const loaders = require('../loaders');
const ENV = require('../lib/env');

const commonConfig = (options = {}) => {
  const { env = ENV, uglifyOptions = {} } = options;
  const DEV = env !== 'production';

  let config = {
    context: options.context,

    mode: env,

    entry: path.resolve(options.context, 'src/main.js'),

    output: {
      filename: DEV ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: DEV ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
      path: path.resolve(options.context, 'dist'),
    },

    module: {
      strictExportPresence: true,
      rules: [loaders.files.default],
    },

    resolve: {
      extensions: [
        '.webpack.js',
        '.web.js',
        '.js',
        '.jsx',
        '.scss',
        '.css',
        '.json',
        '.ts',
        '.tsx',
      ],
      modules: ['node_modules', 'node_modules/@codecademy'],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${ENV}"`,
        __DEV__: DEV,
      }),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    ],
  };

  if (DEV) {
    config = merge.smart(config, {
      devtool: 'source-map',
      output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
      },
    });
  } else {
    config = merge.smart(config, {
      bail: true, // Don't try to continue through any errors
      devtool: 'source-map',
      optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
              compress: {
                inline: 1, // Fix for https://github.com/mishoo/UglifyJS2/issues/2842
              },
              ...uglifyOptions,
            },
          }),
        ],
      },
      plugins: [new webpack.HashedModuleIdsPlugin()],
    });
  }

  return config;
};

module.exports = commonConfig;
