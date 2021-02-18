const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
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
      filename: DEV ? '[name].js' : '[name].[contenthash:8].js',
      chunkFilename: DEV
        ? '[name].chunk.js'
        : '[name].[contenthash:8].chunk.js',
      path: path.resolve(options.context, 'dist'),
      assetModuleFilename: DEV ? '[path][name].[ext]' : '[contenthash:8].[ext]',
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
                name: DEV ? '[path][name].[ext]' : '[contenthash:8].[ext]',
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
      plugins: [new CaseSensitivePathsPlugin()],
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
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              keep_classnames: true,
              keep_fnames: true,
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
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
