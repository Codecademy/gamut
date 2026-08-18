/* eslint-disable */
const path = require('path');
const base = require('../../jest.config.base.cjs');

module.exports = base('gamut-styles', {
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        configFile: require.resolve(path.join(__dirname, './babel.config.cjs')),
      },
    ],
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});
