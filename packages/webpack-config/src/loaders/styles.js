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
    modules: {
      localIdentName: CSS_MODULE_IDENT,
    },
  },
};

const ExtractedCSSLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: !PROD,
    esModule: true,
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
    use: [
      ExtractedCSSLoader,
      merge(cssLoaderDefaults),
      merge(postCssLoaderDefaults),
    ],
  },
  server: {
    test: cssFilePattern,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          onlyLocals: true,
        },
      }),
    ],
  },
};

const scss = {
  default: {
    test: scssFilePattern,
    use: [
      {
        loader: 'style-loader',
      },
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
        },
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults),
    ],
  },
  extracted: {
    test: scssFilePattern,
    use: [
      ExtractedCSSLoader,
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
        },
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults),
    ],
  },
  server: {
    test: scssFilePattern,
    use: [
      merge(cssLoaderDefaults, {
        options: {
          modules: true,
          onlyLocals: true,
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
