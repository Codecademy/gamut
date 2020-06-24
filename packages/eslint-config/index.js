module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },

  extends: [
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],

  globals: {
    // testcafe
    fixture: false,
    test: false,
  },

  parser: require.resolve('@typescript-eslint/parser'),

  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },

  plugins: ['import', 'jsx-a11y', 'no-only-tests', 'react', 'react-hooks'],

  rules: {
    // These off-by-default or configurable rules are good and we like having them on
    eqeqeq: 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-global-assign': 'error',
    'no-underscore-dangle': 'error',
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

    // These rules could be useful, but we haven't gotten around to trying them out
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
    'react/display-name': 'off',

    // These functional rules are annoying and we generally don't want them on
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // https://github.com/bradzacher/eslint-plugin-typescript/issues/283
    '@typescript-eslint/typedef': 'off',

    // These rules have been deprecated in their plugins but not yet removed from presets
    'jsx-a11y/label-has-for': 'off',

    // These style rules conflict with Prettier but aren't disabled by its plugins
    '@typescript-eslint/quotes': 'off',

    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '@codecademy/gamut/src/*',
          '@codecademy/gamut/dist/deprecated/*',
        ],
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
