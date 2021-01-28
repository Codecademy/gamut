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
const TYPE_AWARE = process.env.ESLINT_TYPE_AWARE !== 'false';

module.exports = {
  ...defaultConfig,
  root: true,

  overrides: [
    ...defaultConfig.overrides,
    {
      files: ['*.mdx'],
      parser: 'eslint-mdx',
    },
    {
      files: ['**/typings/*', '*.d.ts'],
      parserOptions: {
        tsconfigRootDir: TYPE_AWARE && __dirname,
        project: TYPE_AWARE && [
          './tsconfig.json',
          './packages/*/tsconfig.json',
        ],
      },
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
    {
      files: ['*.tsx'],
      parserOptions: {
        tsconfigRootDir: TYPE_AWARE && __dirname,
        project: TYPE_AWARE && [
          './tsconfig.json',
          './packages/*/tsconfig.json',
        ],
      },
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            message:
              "Don't import stylesheets that don't end with `module.scss`, rename them to end with `module.scss` like `style.module.scss`.",
            selector:
              'ImportDeclaration[source.value=/^((?!module.scss).)*(.scss)$/]',
          },
        ],
      },
    },
  ],
};
