const localExtends = ['./rules/typescript', './rules/mdx'].map(require.resolve);

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    ...localExtends,
  ],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // These off-by-default or configurable rules are good and we like having them on
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
    },
    // Stories generally have empty functions and other syntax shenanigans for code examples
    {
      files: ['*.stories.*'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    // JS and test files generally don't need quite the same level of 'any' scrutiny
    {
      files: [
        '*-test.*',
        '*.js',
        '*.spec.*',
        '*.test.*',
        '*.stories.mdx',
        '**/__fixtures__/*',
        '**/__tests__/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],

  plugins: [
    'import',
    'jest',
    'jest-react',
    'jsx-a11y',
    'no-only-tests',
    'react',
    'react-hooks',
    'simple-import-sort',
  ],

  rules: {
    // These off-by-default or configurable rules are good and we like having them on
    '@typescript-eslint/array-type': 'error',
    eqeqeq: 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-global-assign': 'error',
    'no-only-tests/no-only-tests': 'error',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
    'prefer-promise-reject-errors': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger': 'error',
    'react/no-unused-state': 'error',
    'react/prop-types': [
      'error',
      {
        ignore: ['children'],
        skipUndeclared: true,
      },
    ],
    'simple-import-sort/imports': 'error',

    // These functional rules are annoying and we generally don't want them on
    // Note that these are only the rules we don't want in *any* consuming repository
    // Rules to be temporarily disabled for convenience should be done so in those repositories
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/typedef': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'no-bitwise': 'off',
    'no-case-declarations': 'off',
    'no-continue': 'off',
    'no-empty': 'off',
    'no-fallthrough': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-sparse-arrays': 'off',
    'no-template-curly-in-string': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'prefer-template': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-es6-class': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/style-prop-object': 'off',
    strict: 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
