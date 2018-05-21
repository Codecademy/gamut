const loaders = require('../loaders');

const css = () => ({
  module: {
    rules: [loaders.css.default, loaders.scss.default],
  },
});

module.exports = css;
