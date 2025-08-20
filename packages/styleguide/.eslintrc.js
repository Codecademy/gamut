module.exports = {
  extends: ['plugin:@nx/react', '../../.eslintrc.json'],
  ignorePatterns: ['!**/*', 'dist'],
  overrides: [
    {
      files: ['*.mdx'],
      rules: {
        'gamut/import-paths': 'off',
      },
    },
  ],
};
