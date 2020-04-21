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
    sourceMap: true,
    localIdentName: CSS_MODULE_IDENT,
    modules: false,
  },
};

const postCssLoaderDefaults = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () =>
      [
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({ flexbox: 'no-2009' }),
        PROD && require('cssnano')({ preset: 'default' }),
      ].filter(Boolean),
  },
};

const extractPluginDefaults = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: !PROD,
  },
};

const scssFilePattern = /\.scss?$/;
const scssLoaderDefaults = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const css = {
  default: {
    test: cssFilePattern,
    sideEffects: true,
    use: [
      {
        loader: 'style-loader',
      },
      merge(cssLoaderDefaults),
      merge(postCssLoaderDefaults),
    ],
  },
  extracted: {
    test: cssFilePattern,
    sideEffects: true,
    use: [
      extractPluginDefaults,
      merge(cssLoaderDefaults),
      merge(postCssLoaderDefaults),
    ],
  },
  server: {
    test: cssFilePattern,
    sideEffects: true,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          exportOnlyLocals: true,
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
      {
        loader: 'style-loader',
      },
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
          importLoaders: 2,
        },
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults),
    ],
  },
  extracted: {
    test: scssFilePattern,
    sideEffects: true,
    use: [
      extractPluginDefaults,
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
          importLoaders: 2,
        },
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults),
    ],
  },
  server: {
    test: scssFilePattern,
    sideEffects: true,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
          exportOnlyLocals: true,
          importLoaders: 2,
        },
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults),
    ],
  },
};

module.exports = {
  css,
  scss,
};
