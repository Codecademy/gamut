/* eslint-disable no-underscore-dangle */
const merge = require('webpack-merge');
const configs = require('./config');

class WebpackConfig {
  constructor(initialValue = {}) {
    this._configs = Object.assign({}, configs);
    Object.keys(this._configs).forEach((c) => {
      this[c] = (opts) => {
        this.merge(this._configs[c](opts, this));
        return this;
      };
    });
    this._value = Object.assign({}, initialValue);
  }

  get value() {
    return this._value;
  }

  set value(config) {
    this._value = config;
  }

  merge(config) {
    this.value = merge.smart(this.value, config);
    return this;
  }

  mergeLoader(loaderObject = {}) {
    if (!loaderObject.test) {
      throw new Error(
        'mergeLoader requires the test property to match loaders'
      );
    }

    const mergeableLoader = {
      module: {
        rules: [Object.assign({}, loaderObject)],
      },
    };

    this.value = merge({
      customizeArray(a, b, key) {
        if (key === 'module.rules') {
          return a.map((rule) => {
            const match = b.find((r) => String(r.test) === String(rule.test));
            if (match) return merge.unique(rule, match);
            return rule;
          });
        }
        return undefined;
      },
    })(this.value, mergeableLoader);

    return this;
  }

  if(condition, cb) {
    if (condition) return cb(this);
    return this;
  }

  toConfig() {
    return this.value;
  }
}

const createConfig = (options = {}) => new WebpackConfig(options);

module.exports = {
  merge,
  createConfig,
  WebpackConfig,
  configs,
};
