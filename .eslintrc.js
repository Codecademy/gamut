module.exports = {
  root: true,

  extends: [require.resolve('@codecademy/eslint-config')],

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
      files: ['**/jest/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
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
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
};
