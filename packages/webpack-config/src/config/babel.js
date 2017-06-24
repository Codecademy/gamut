const loaders = require('../loaders');
const merge = require('webpack-merge');

const babelConfig = (options) => {
  return {
    module: {
      rules: [
        merge(
          loaders.babel.default,
          options
        )
      ]
    }
  };
};

module.exports = babelConfig;
