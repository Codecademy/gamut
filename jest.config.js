module.exports = {
  verbose: true,
  testURL: 'https://test.codecademy.com',
  globals: {
    '__DEV__': true
  },
  roots: [
    '<rootDir>/packages'
  ],
  projects: [
    '<rootDir>/packages'
  ],
  setupFiles: [
    '<rootDir>/script/jest/base-setup.js'
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'css', 'scss'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/script/jest/styleMock'
  },
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
    '\\.(css|scss)$': '<rootDir>/script/jest/css-module-transformer'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  testRegex: '\\-test\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: [
    'node_modules'
  ]
};
