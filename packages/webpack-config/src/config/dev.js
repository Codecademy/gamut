const loaders = require('../loaders');

const devConfig = () => {
  return {
    devtool: '#cheap-source-map',

    module: {
      rules: [
        loaders.css.default,
        loaders.scss.default
      ]
    },

    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    }
  };
};

module.exports = devConfig;
