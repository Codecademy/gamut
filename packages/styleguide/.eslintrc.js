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
                name: '@codecademy/gamut-elements',
                message:
                  'Please import directly from the `gamut-elements/src` folder',
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
