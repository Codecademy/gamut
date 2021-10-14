const path = require('path');

module.exports = (packageName) => ({
  clearMocks: true,
  verbose: true,
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'css',
    'scss',
    'ts',
    'tsx',
    'd.ts',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/../../script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/../../script/jest/styleMock',
    '^~styleguide/blocks(.*)$':
      '<rootDir>/../styleguide/.storybook/components$1',
    '^@codecademy\\/storybook-addon-variance(.*)$':
      '<rootDir>/../styleguide/.storybook/addons/system/components$1',
    '^@codecademy\\/gamut$': '<rootDir>/../gamut/src',
    '^@codecademy\\/gamut-labs$': '<rootDir>/../gamut-labs/src',
    '^@codecademy\\/gamut-styles$': '<rootDir>/../gamut-styles/src',
    '^@codecademy\\/gamut-tests$': '<rootDir>/../gamut-tests/src',
    '^@codecademy\\/variance$': '<rootDir>/../variance/src',
    '^@codecademy\\/gamut-illustrations$':
      '<rootDir>/../gamut-illustrations/src',
    '^@codecademy\\/macros$': '<rootDir>/../macros',
    '^@codecademy\\/gamut-patterns$': '<rootDir>/../gamut-patterns/src',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(css|scss)$': '<rootDir>/../../script/jest/css-module-transformer',
    '\\.(j|t)sx?$': [
      'babel-jest',
      {
        configFile: require.resolve(path.join(__dirname, './babel.config.js')),
      },
    ],
    '^.+\\.mdx$':
      '<rootDir>/../styleguide/node_modules/@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: `packages\\/${packageName}\\/.+(\\.|-)test\\.[jt]sx?$`,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/stories/',
    '/vendor/',
    '/dist/',
    '/gamut-icons/icons/',
    '/tmp/',
    '/example/',
    '/typings/',
    '/.storybook/',
  ],
  reporters: process.env.CI ? ['default', 'jest-junit'] : ['default'],
  coverageReporters: ['json', 'text', 'clover'],
  coverageDirectory: process.env.CI ? '/tmp/test-results/jest' : './coverage',
  collectCoverage: !!process.env.CI,
});
