module.exports = {
  root: true,

  extends: [require.resolve('./packages/eslint-config')],

  plugins: ['local-rules'],

  overrides: [
    {
      files: ['**/typings/*', '*.d.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
    {
      files: ['*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
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
        'local-rules/gamut-import-paths': 'error',
      },
    },
  ],
};
