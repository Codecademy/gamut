module.exports = {
  verbose: true,
  testURL: 'https://test.codecademy.com',
  globals: {
    __DEV__: true,
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  roots: ['<rootDir>/packages'],
  projects: ['<rootDir>/packages'],
  setupFiles: ['<rootDir>/script/jest/base-setup.js'],
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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/script/jest/styleMock',
  },
  transform: {
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: '\\-test\\.tsx?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
};
