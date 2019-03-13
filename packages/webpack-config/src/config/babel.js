const merge = require('webpack-merge');
const loaders = require('../loaders');

const babelConfig = options => ({
  module: {
    rules: [merge(loaders.babel.default, options)],
  },
});

module.exports = babelConfig;
