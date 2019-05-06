module.exports = {
  parser: require.resolve('babel-eslint'),

  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ].map(require.resolve),

  plugins: ['react-hooks'],

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },

  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },

  globals: {
    // testcafe
    fixture: false,
    test: false,
  },

  rules: {
    'default-case': 0,
    'func-names': 0,
    'id-length': 0,
    'new-cap': 0,
    'no-new': 0,
    'max-len': 0,
    'jsx-quotes': 0,
    'lines-between-class-members': 0,
    'quote-props': 0,
    'no-debugger': 0,
    'no-param-reassign': 0,
    'object-shorthand': 0,
    'no-return-assign': ['error', 'except-parens'],
    'no-restricted-syntax': 0,
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'react/destructuring-assignment': 0,
    'react/sort-comp': 0,
    'react/no-did-update-set-state': 0,
    'react/no-did-mount-set-state': 0,
    'react/jsx-boolean-value': 0,
    'react/prefer-es6-class': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': [
      2,
      {
        ignore: ['children'],
        skipUndeclared: true,
      },
    ],
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'import/export': 0,
    'import/extensions': 0,
    'import/first': 0,
    'import/named': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    // See https://github.com/faceyspacey/babel-plugin-universal-import#caveat
    'import/no-useless-path-segments': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['*.json'],
      parser: 'json',
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 0,
      },
    },
  ],
};
