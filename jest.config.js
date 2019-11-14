module.exports = {
  verbose: true,
  globals: {
    __DEV__: true,
  },
  setupFiles: ['<rootDir>/script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/node_modules/jest-enzyme/lib/index.js'],
  modulePaths: ['<rootDir>', '<rootDir>/workspaces/gamut-storybook'],
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
    // storybook gamut package aliases
    '^gamut$': '<rootDir>/packages/gamut/src',
    '^gamut/(.*)$': '<rootDir>/packages/gamut/src/$1',
    '^gamut-styles$': '<rootDir>/packages/gamut-styles',
    '^gamut-styles/(.*)$': '<rootDir>/packages/gamut-styles/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer',
    '\\.(j|t)sx?$': 'babel-jest',
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
  ],
  coverageDirectory: './coverage',
};
