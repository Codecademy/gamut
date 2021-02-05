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
    'prettier/@typescript-eslint',
    'prettier/react',
  ],

  // ensure that ts eslint parser only runs for the correct files
  overrides: [
    {
      files: ['*.mdx'],
      parser: 'eslint-mdx',
    },
    {
      files: ['*.tsx', '*.ts'],
      parser: require.resolve('@typescript-eslint/parser'),
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

    strict: 'off',

    // These rules have been deprecated in their plugins or overridden but not yet removed from presets
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'no-unused-expressions': 'off',

    // These style rules conflict with Prettier but aren't disabled by its plugins
    '@typescript-eslint/quotes': 'off',

    'arrow-body-style': 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
