/* eslint-disable */
const base = require('../../jest.config.base.cjs');

module.exports = base('gamut', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@vidstack/react|@formatjs|@codecademy)/)',
  ],
});
