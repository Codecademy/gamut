/* eslint-disable */
import base from '../../jest.config.base';

export default base('gamut-icons', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/icons/**/*', // Excludes generated icon TSX files from coverage
  ],
});
