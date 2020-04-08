const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const loaders = require('../loaders');

const cssExtracted = options => {
  const defaultExtractOptions = {
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
    ignoreOrder: true,
  };

  return {
    module: {
      rules: [loaders.css.extracted, loaders.scss.extracted],
    },

    plugins: [new MiniCssExtractPlugin(merge(defaultExtractOptions, options))],
  };
};

module.exports = cssExtracted;
