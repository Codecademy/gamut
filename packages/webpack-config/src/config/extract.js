const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaders = require('../loaders');
const merge = require('webpack-merge');

const extractConfig = (options) => {

  const defaultExtractOptions = {
    filename: '[name].css',
    allChunks: false
  };

  return {
    module: {
      rules: [
        loaders.css.extracted,
        loaders.scss.extracted
      ]
    },

    plugins: [
      new ExtractTextPlugin(merge(
        defaultExtractOptions,
        options
      ))
    ]
  };
};

module.exports = extractConfig;
