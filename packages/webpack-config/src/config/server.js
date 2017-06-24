const loaders = require('../loaders');

const serverConfig = () => {
  return {
    output: {
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        loaders.css.server,
        loaders.scss.server
      ]
    }
  };
};

module.exports = serverConfig;
