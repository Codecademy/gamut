module.exports = {
  extends: ['eslint:recommended'],
  plugins: ['local-rules', 'react', 'react-hooks', 'simple-import-sort'],
  rules: {
    'local-rules/prefer-use-selector-with': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'simple-import-sort/imports': 'error',
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      parser: '@typescript-eslint/parser',
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
