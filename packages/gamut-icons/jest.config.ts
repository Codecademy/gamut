/* eslint-disable */
import base from '../../jest.config.base';

export default base('gamut-icons', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/../../script/jest/base-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/../../script/jest/rtl-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coveragePathIgnorePatterns: ['<rootDir>/src/icons/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/icons/**',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!tests/**',
  ],
});
