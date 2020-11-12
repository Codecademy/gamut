/* eslint-disable global-require */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const ENV = require('../lib/env');

const PROD = ENV === 'production';
const CSS_MODULE_IDENT = PROD
  ? '[local]__[hash:base64]'
  : '[folder]__[local]__[hash:base64:5]';

const cssFilePattern = /\.css?$/;
const cssLoaderDefaults = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    esModule: true,
    sourceMap: true,
    modules: false,
  },
};

const cssModulesDefaults = {
  exportGlobals: true,
  localIdentName: CSS_MODULE_IDENT,
};

const postCssLoaderDefaults = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-focus-visible')({
          preserve: false,
          replaceWith: '[data-focus-visible-added]',
        }),
        require('autoprefixer')({ flexbox: 'no-2009' }),
        PROD && require('cssnano')({ preset: 'default' }),
      ].filter(Boolean),
    },
  },
};

const extractPluginDefaults = {
  loader: MiniCssExtractPlugin.loader,
};

const scssFilePattern = /\.scss?$/;
const scssLoaderDefaults = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const styleLoaderDefaults = {
  loader: 'style-loader',
  options: {
    esModule: true,
  },
};

const css = {
  default: {
    test: cssFilePattern,
    sideEffects: true,
    use: [styleLoaderDefaults, cssLoaderDefaults, postCssLoaderDefaults],
  },
  extracted: {
    test: cssFilePattern,
    sideEffects: true,
    use: [extractPluginDefaults, cssLoaderDefaults, postCssLoaderDefaults],
  },
  server: {
    test: cssFilePattern,
    sideEffects: true,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          modules: {
            exportOnlyLocals: true,
          },
        },
      }),
    ],
  },
};

const scss = {
  default: {
    test: scssFilePattern,
    sideEffects: true,
    use: [
      styleLoaderDefaults,
      merge(cssLoaderDefaults, {
        options: {
          modules: cssModulesDefaults,
          importLoaders: 2,
        },
      }),
      postCssLoaderDefaults,
      scssLoaderDefaults,
    ],
  },
  extracted: {
    test: scssFilePattern,
    sideEffects: true,
    use: [
      extractPluginDefaults,
      merge(cssLoaderDefaults, {
        options: {
          modules: cssModulesDefaults,
          importLoaders: 2,
        },
      }),
      postCssLoaderDefaults,
      scssLoaderDefaults,
    ],
  },
  server: {
    test: scssFilePattern,
    sideEffects: true,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          modules: {
            ...cssModulesDefaults,
            exportOnlyLocals: true,
          },
          importLoaders: 2,
        },
      }),
      postCssLoaderDefaults,
      scssLoaderDefaults,
    ],
  },
};

module.exports = {
  css,
  scss,
};
