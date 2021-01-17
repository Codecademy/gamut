const path = require('path');

module.exports = {
  plugins: ['react', 'mdx'],
  extends: ['plugin:mdx/recommended'],

  overrides: [
    { files: ['*.mdx'], parser: 'eslint-mdx' },
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
