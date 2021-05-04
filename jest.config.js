module.exports = {
  verbose: true,
  globals: {
    __DEV__: true,
  },
  setupFiles: ['<rootDir>/script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/script/jest/rtl-setup.ts'],
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
      '<rootDir>/script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/script/jest/styleMock',
    '^~styleguide/blocks(.*)$':
      '<rootDir>/packages/styleguide/.storybook/components$1',
    '^@codecademy\\/storybook-addon-variance(.*)$':
      '<rootDir>/packages/styleguide/.storybook/addons/system/components$1',
    '^@codecademy\\/gamut$': '<rootDir>/packages/gamut/src',
    '^@codecademy\\/gamut-labs$': '<rootDir>/packages/gamut-labs/src',
    '^@codecademy\\/gamut-styles$': '<rootDir>/packages/gamut-styles/src',
    '^@codecademy\\/gamut-system$': '<rootDir>/packages/gamut-system/src',
    '^@codecademy\\/gamut-tests$': '<rootDir>/packages/gamut-tests/src',
    '^@codecademy\\/variance$': '<rootDir>/packages/variance/src',
    '^@codecademy\\/gamut-illustrations$':
      '<rootDir>/packages/gamut-illustrations/src',
    '^@codecademy\\/macros$': '<rootDir>/packages/macros',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer',
    '\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.mdx$':
      '<rootDir>/packages/styleguide/node_modules/@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: '(\\.|-)(test|spec)\\.[jt]sx?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: ['packages/**/*.{js,jsx,ts,tsx}'],
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
};
