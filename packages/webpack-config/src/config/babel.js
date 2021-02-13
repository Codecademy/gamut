const merge = require('webpack-merge');

const babelConfig = (options) => ({
  module: {
    rules: [
      merge(
        {
          test: /\.(j|t)sx?$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        options
      ),
    ],
  },
});

module.exports = babelConfig;
