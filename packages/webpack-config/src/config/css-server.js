const loaders = require('../loaders');

const cssServer = () => ({
  module: {
    rules: [loaders.css.server, loaders.scss.server],
  },
});

module.exports = cssServer;
