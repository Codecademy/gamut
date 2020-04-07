module.exports = {
  verbose: true,
  globals: {
    __DEV__: true,
  },
  setupFiles: ['<rootDir>/script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'css',
    'scss',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$':
      '<rootDir>/script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/script/jest/styleMock',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer',
    '\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: '\\-test\\.(j|t)sx?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: ['packages/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/dist/',
    '/example/',
    '/gamut-icons/icons/',
    '/node_modules/',
    '/packages/styleguide/',
    '/stories/',
    '/tmp/',
    '/typings/',
    '/vendor/',
  ],
  coverageDirectory: './coverage',
};
