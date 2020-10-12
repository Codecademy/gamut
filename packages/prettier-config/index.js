module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  semi: true,
  overrides: [
    {
      files: '*.{scss,css}',
      options: {
        parser: 'css',
        singleQuote: false,
        semi: true,
      },
    },
    {
      files: '*.{json}',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
