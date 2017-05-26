const webpack = require('webpack');
const path = require('path');
const loaders = require('@codecademy/webpack-config').loaders;

const ENV = (process.env.NODE_ENV || 'development');

module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.scss', '.css', '.gscss', '.json'],
    root: [
      path.join(__dirname, '../'),
      path.join(__dirname, '../node_modules/@codecademy/')
    ]
  },
  module: {
    loaders: [
      loaders.css.default(),
      loaders.scss.default(),
      loaders.json()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + ENV + '"',
      '__DEV__': (ENV !== 'production')
    })
  ],
  postcss: {}
};
