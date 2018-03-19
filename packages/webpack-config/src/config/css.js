const loaders = require('../loaders');

const css = () => {
  return {
    module: {
      rules: [
        loaders.css.default,
        loaders.scss.default
      ]
    }
  };
};

module.exports = css;
