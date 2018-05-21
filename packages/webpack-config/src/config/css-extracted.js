const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loaders = require('../loaders');
const merge = require('webpack-merge');

const cssExtracted = options => {
  const defaultExtractOptions = {
    filename: '[name].css',
  };

  return {
    module: {
      rules: [loaders.css.extracted, loaders.scss.extracted],
    },

    plugins: [new MiniCssExtractPlugin(merge(defaultExtractOptions, options))],
  };
};

module.exports = cssExtracted;
