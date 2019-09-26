/**
 * @remarks
 * This could just use `extends`
 * but making a monorepo module a dependency in the root
 * causes an extra copy to be saved to node-modules that isn't
 * symlinked, which we don't want. This should eventually just
 * move to a shared private module instead of having this in the
 * project root
 */
const defaultConfig = require('./packages/eslint-config');

module.exports = {
  ...defaultConfig,
  rules: {
    ...defaultConfig.rules,
    'prefer-destructuring': 0,
    'react/default-props-match-prop-types': 0,
  },
};
