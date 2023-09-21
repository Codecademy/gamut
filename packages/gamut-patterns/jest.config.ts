/* eslint-disable */
import base from '../../jest.config.base';

export default base('gamut-patterns', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});
