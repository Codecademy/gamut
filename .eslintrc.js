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
const { merge } = require('lodash');

module.exports = {
  ...defaultConfig,
  root: true,

  overrides: merge(defaultConfig.overrides, [
    {
      files: ['*.mdx'],
      parser: 'eslint-mdx',
    },
    {
      files: ['**/typings/*', '*.d.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ]),
};
