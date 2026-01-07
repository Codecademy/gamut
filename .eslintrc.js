module.exports = {
  root: true,

  extends: [
    require.resolve('@codecademy/eslint-config'),
    'plugin:react/jsx-runtime',
  ],

  plugins: ['eslint-plugin-gamut'],

  rules: {
    'gamut/prefer-themed': 'error',
    'gamut/no-css-standalone': 'error',
    'gamut/no-inline-style': 'error',
    'gamut/import-paths': 'error',
    'import/no-extraneous-dependencies': 'off',
  },

  overrides: [
    {
      files: ['**/typings/*', '*.d.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
    {
      files: ['*.mdx'],
      rules: {
        'gamut/import-paths': 'off',
      },
    },
    {
      // We need to override them here, because as a result of the `extends` command pulling
      // in additional plugins, the base rules settings of turning this rules off were NOT
      // being respected. By moving them into this override definition, they are properly
      // being applied to subsequent plugin imports/extensions. Wild.
      files: ['*.tsx', '*.ts'],
      rules: {
        // These rules could be useful, but we haven't gotten around to enabling them here
        // See WEB-2 for general tracking.
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'import/no-cycle': 'off',
        'react/no-unknown-property': [
          'error',
          { ignore: ['mask-type', 'xmlns-x', 'xmlns-i', 'xmlns-graph'] },
        ],
        'react/jsx-sort-props': [
          1,
          {
            callbacksLast: true,
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      plugins: ['lodash'],
      rules: {
        'lodash/import-scope': ['error', 'method'],
      },
    },
    {
      files: ['packages/gamut-illustrations/**'],
      rules: {
        'gamut/no-inline-style': 'off',
      },
    },
    {
      files: ['packages/styleguide/**/*.mdx'],
      rules: {
        'gamut/no-kbd-element': 'error',
      },
    },
  ],
};
