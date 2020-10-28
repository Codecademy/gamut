const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const loaders = require('../loaders');
const ENV = require('../lib/env');

const commonConfig = (options = {}) => {
  const {
    env = ENV,
    minimizer,
    minimizerOptions = {},
    fileLoaderOptions = {},
    includeDefaults = true,
  } = options;
  const DEV = env !== 'production';

  let config = {
    context: options.context,

    mode: env,

    devtool: 'source-map',

    entry: path.resolve(options.context, 'src/main.js'),

    output: {
      filename: DEV ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: DEV ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
      path: path.resolve(options.context, 'dist'),
    },

    optimization: {
      chunkIds: DEV ? 'named' : 'deterministic',
      moduleIds: DEV ? 'named' : 'deterministic',
    },

    module: {
      strictExportPresence: true,
      rules: includeDefaults
        ? [
            {
              ...loaders.files.default,
              options: {
                name: DEV
                  ? '[path][name].[contenthash].[ext]'
                  : '[contenthash].[ext]',
                ...fileLoaderOptions,
              },
            },
          ]
        : [],
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
      modules: ['node_modules'],
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
    config = merge(config, {
      output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
      },
    });
  } else {
    config = merge(config, {
      bail: true, // Don't try to continue through any errors
      optimization: {
        minimize: true,
        minimizer: minimizer || [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                inline: 1, // Fix for https://github.com/mishoo/UglifyJS2/issues/2842
              },
              keep_fnames: true,
              ...minimizerOptions.terserOptions,
            },
            ...minimizerOptions,
          }),
        ],
      },
    });
  }

  return config;
};

module.exports = commonConfig;
