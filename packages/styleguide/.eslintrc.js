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
                message: 'Please import directly from the `gamut/src` folder',
              },
            ],
            patterns: [
              '@codecademy/*',
              '!@codecademy/gamut-icons',
              '../**/dist',
            ],
          },
        ],
      },
    },
  ],
};
