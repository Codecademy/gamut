const {
  isString,
  attempt,
  isError,
  mergeWith,
  isArray,
  flatten,
  uniq,
} = require('lodash');

const keyBlacklist = ['version'];

const shallowMerge = (a, b) =>
  mergeWith(a, b, (aValue, bValue) => {
    if (isArray(aValue) && isArray(bValue)) {
      return uniq(aValue.concat(bValue));
    }
  });

// Janky method to find non-standard eslint extends
function parseEslintModule(mod) {
  if (!isString(mod)) return mod;
  const parts = mod.split(':');
  if (parts[0] === 'eslint') {
    // eslint:recommended
    return `eslint/conf/eslint-${parts[1]}`;
  }
  if (parts[0] === 'plugin') {
    // plugin:react/recommended
    const pluginParts = parts[1].split('/');
    const result = attempt(
      () => require(`eslint-plugin-${pluginParts[0]}`).configs[pluginParts[1]]
    );

    if (isError(result)) throw result;

    return result;
  }
  return mod;
}

function findEslintModule(modOrPath) {
  const mod = parseEslintModule(modOrPath);
  if (!isString(mod)) return mod;
  let modulePath;
  modulePath = attempt(() => require.resolve(mod));
  if (isError(modulePath)) {
    modulePath = attempt(() => require.resolve(`eslint-config-${mod}`));
  }

  if (isError(modulePath)) throw mod;

  return require(modulePath);
}

const eslintReduce = (_config, options) => {
  let config = Object.assign({}, _config);
  if (config.extends) {
    flatten([config.extends]).forEach(ext => {
      const mod = findEslintModule(ext);
      config = shallowMerge(eslintReduce(mod, options), config);
    });
    delete config.extends;
  }

  keyBlacklist.forEach(k => {
    if (config[k]) {
      delete config[k];
    }
  });

  return config;
};

module.exports = eslintReduce;
