module.exports = {
  parser: 'babel-eslint',

  extends: ['airbnb', 'prettier', 'prettier/react'],

  plugins: ['react'],

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
    __DEV__: true,
  },

  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'id-length': 0,
    'new-cap': 0,
    'no-new': 0,
    'no-param-reassign': 0,
    'react/sort-comp': 0,
    'react/no-did-update-set-state': 0,
    'react/no-did-mount-set-state': 0,
    'react/jsx-boolean-value': 0,
    'react/prefer-es6-class': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
};
