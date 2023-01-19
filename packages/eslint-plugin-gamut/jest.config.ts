/* eslint-disable */
import base from '../../jest.config.base';

export default base('eslint-plugin-gamut', {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  setupFiles: [],
  setupFilesAfterEnv: [],
});
