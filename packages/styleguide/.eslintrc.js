const path = require('path');

module.exports = {
  overrides: [
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
