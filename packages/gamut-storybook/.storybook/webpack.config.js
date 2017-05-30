const webpack = require('webpack');
const path = require('path');
const loaders = require('@codecademy/webpack-config').loaders;
const babelCodecademyPreset = require('babel-preset-codecademy');
const merge = require('webpack-merge');

const ENV = (process.env.NODE_ENV || 'development');


const config = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.scss', '.css', '.gscss', '.json'],
    root: [
      path.join(__dirname, '../'),
      path.join(__dirname, '../node_modules/@codecademy/')
    ]
  },
  module: {
    loaders: [
      loaders.babel({
        exclude: [/node_modules(?!(\/@codecademy))/]
      }),
      loaders.css.default(),
      loaders.scss.default(),
      loaders.json()
    ]
  },
  babel: {
    presets: [babelCodecademyPreset]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + ENV + '"',
      '__DEV__': (ENV !== 'production')
    })
  ],
  postcss: {}
};

module.exports = (defaultConfig) => {
  return merge.smart(defaultConfig, config);
};
