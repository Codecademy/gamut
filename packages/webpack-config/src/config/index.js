/* eslint-disable global-require */

const configs = {
  common: require('./common'),
  devServer: require('./dev-server'),
  css: require('./css'),
  cssExtracted: require('./css-extracted'),
  cssServer: require('./css-server'),
  babel: require('./babel'),
};

module.exports = configs;
