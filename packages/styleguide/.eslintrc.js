const path = require('path');

module.exports = {
  plugins: ['react', 'mdx', 'unused-imports'],
  extends: ['plugin:mdx/recommended'],

  overrides: [
    {
      files: ['*.mdx'],
      parser: 'eslint-mdx',
      // Add this for MDX specifically since we rely on TS in other
      rules: { 'unused-imports/no-unused-imports': 'error' },
    },
    {
      files: ['stories/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@codecademy/gamut',
                message: 'Import from `@codecademy/gamut/src` instead.',
              },
            ],
          },
        ],
        'react/no-unescaped-entities': 'off',
      },
    },
  ],
};
