module.exports = {
  verbose: true,
  globals: {
    __DEV__: true,
  },
  setupFiles: ['<rootDir>/script/jest/base-setup.js'],
  setupFilesAfterEnv: [
    '<rootDir>/script/jest/rtl-setup.ts',
    '<rootDir>/node_modules/jest-enzyme/lib/index.js',
  ],
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
      '<rootDir>/packages/styleguide/.storybook/Blocks$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer',
    '\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.mdx$':
      '<rootDir>/packages/styleguide/node_modules/@storybook/addon-docs/jest-transform-mdx',
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: '\\-test\\.(j|t)sx?$',
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
  ],
  coverageDirectory: './coverage',
};
