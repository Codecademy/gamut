/* eslint-disable */
const base = require('../../jest.config.base.cjs');

module.exports = base('variance', {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
});
