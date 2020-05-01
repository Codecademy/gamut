const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const loaders = require('../loaders');
const ENV = require('../lib/env');
const PROD = ENV === 'production';

const cssExtracted = options => {
  const defaultExtractOptions = {
    filename: PROD ? '[name].[contenthash].css' : '[name].css',
    chunkFilename: PROD ? '[id].[contenthash].chunk.css' : '[id].chunk.css',
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
