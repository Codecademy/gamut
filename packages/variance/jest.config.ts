/* eslint-disable */
import base from '../../jest.config.base';

export default base('variance', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});
