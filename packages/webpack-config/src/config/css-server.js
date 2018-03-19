const loaders = require('../loaders');

const cssServer = () => {
  return {
    module: {
      rules: [
        loaders.css.server,
        loaders.scss.server
      ]
    }
  };
};

module.exports = cssServer;
