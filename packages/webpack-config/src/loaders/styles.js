const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const ENV = require('../lib/env');

const PROD = ENV === 'production';
const CSS_MODULE_IDENT = PROD
  ? '[local]__[hash:base64]'
  : '[folder]__[local]__[hash:base64:5]';
const SOURCEMAPS = !(process.env.NODE_ENV === 'production');

const cssFilePattern = /\.css?$/;
const cssLoaderDefaults = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: SOURCEMAPS,
    localIdentName: CSS_MODULE_IDENT,
  },
};

const postCssLoaderDefaults = {
  loader: 'postcss-loader',
  options: {
    sourceMap: SOURCEMAPS,
    plugins: () => [require('autoprefixer')()],
  },
};

const scssFilePattern = /\.scss?$/;
const scssLoaderDefaults = {
  loader: 'sass-loader',
  options: {
    sourceMap: SOURCEMAPS,
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
      MiniCssExtractPlugin.loader,
      merge(cssLoaderDefaults),
      merge(postCssLoaderDefaults),
    ],
  },
  server: {
    test: cssFilePattern,
    use: [
      merge(cssLoaderDefaults, {
        loader: 'css-loader/locals',
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
      MiniCssExtractPlugin.loader,
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
        loader: 'css-loader/locals',
        options: {
          modules: true,
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
