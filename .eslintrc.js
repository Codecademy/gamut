module.exports = {
  root: true,

  extends: [
    require.resolve('@codecademy/eslint-config'),
    'plugin:react/jsx-runtime',
  ],

  plugins: ['eslint-plugin-gamut'],

  ignorePatterns: ['packages/code-connect/**/*'],

  rules: {
    'gamut/prefer-themed': 'error',
    'gamut/no-css-standalone': 'error',
    'gamut/no-inline-style': 'error',
    'gamut/import-paths': 'error',
    'import/no-extraneous-dependencies': 'off',
    // Allow the idiomatic `== null` / `!= null` nullish checks.
    eqeqeq: ['error', 'always', { null: 'ignore' }],
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
        /*
         * These JS/TS rules misfire on MDX: import/namespace can't parse the
         * imported workspace packages, and no-unused-expressions flags inline
         * prose expressions like `{'>'}`. They aren't meaningful for MDX docs.
         */
        'import/namespace': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
    {
      // We need to override them here, because as a result of the `extends` command pulling
      // in additional plugins, the base rules settings of turning this rules off were NOT
      // being respected. By moving them into this override definition, they are properly
      // being applied to subsequent plugin imports/extensions. Wild.
      files: ['*.tsx', '*.ts'],
      rules: {
        'no-void': ['error', { allowAsStatement: true }],
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
        /*
         * typescript-eslint v8 successors of ban-types / no-empty-interface,
         * which the shared @codecademy/eslint-config already disables. mono
         * disables no-empty-object-type as well. Revisit if we adopt them.
         */
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-wrapper-object-types': 'off',
        /*
         * New v8 type-aware rule. It flags long-standing ReactNode -> string
         * coercions for aria labels / ids that are strings at runtime. Hardening
         * those is an a11y effort of its own, out of scope for the lint bump.
         */
        '@typescript-eslint/no-base-to-string': 'off',
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
