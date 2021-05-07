/**
 * @remarks
 * This is the ESLint configuration used *internally* for client-modules.
 * See the eslint-config package for the shared config used in consuming repositories.
 */
module.exports = {
  root: true,

  extends: [require.resolve('./packages/eslint-config')],

  plugins: ['local-rules'],

  overrides: [
    {
      files: ['**/typings/*', '*.d.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
    {
      files: ['*.tsx'],
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
        'local-rules/gamut-import-paths': 'error',
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
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  rules: {
    // These rules could be useful, but we haven't gotten around to enabling them here
    // See WEB-2 for general tracking.
    '@typescript-eslint/no-empty-function': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-multi-assign': 'off',
    'no-plusplus': 'off',
    'no-template-curly-in-string': 'off',
    'no-unused-expressions': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unused-prop-types': 'off',
    'react/sort-comp': 'off',
  },
};
