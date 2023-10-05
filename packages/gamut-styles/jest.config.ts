/* eslint-disable */
import path from 'path';
import base from '../../jest.config.base';

export default base('gamut-styles', {
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        configFile: require.resolve(path.join(__dirname, './babel.config.js')),
      },
    ],
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});
