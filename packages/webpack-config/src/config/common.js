const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
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

    module: {
      strictExportPresence: true,
      rules: includeDefaults
        ? [
            {
              ...loaders.files.default,
              options: {
                name: DEV
                  ? '[name].[contenthash].[ext]'
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
    config = merge.smart(config, {
      output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
      },
      plugins: [new CaseSensitivePathsPlugin()],
    });
  } else {
    config = merge.smart(config, {
      bail: true, // Don't try to continue through any errors
      optimization: {
        moduleIds: 'hashed',
        minimize: true,
        minimizer: minimizer || [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
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
