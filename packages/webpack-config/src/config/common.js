const path = require('path');
const loaders = require('../loaders');
const webpack = require('webpack');
const ENV = require('../lib/env');

const DEV = (ENV !== 'production');

const commonConfig = (options = {}) => {

  return {
    context: options.context,

    entry: path.resolve(options.context, 'src/main.js'),

    output: {
      filename: '[name].js',
      path: path.resolve(options.context, 'dist')
    },

    module: {
      rules: [
        loaders.babel.default,
        loaders.files.default
      ]
    },

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.scss', '.css', '.json'],
      modules: [
        'node_modules',
        'node_modules/@codecademy'
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${ENV}"`,
        '__DEV__': DEV
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]
  };
};

module.exports = commonConfig;
