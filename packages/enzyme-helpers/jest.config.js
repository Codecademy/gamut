const path = require('path');

const rootNodeModules = '../../node_modules';
module.exports = {
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/test/setup.js'],
  setupFilesAfterEnv: [
    path.resolve(rootNodeModules, 'jest-enzyme/lib/index.js'),
  ],
  transform: {
    '\\.(js|jsx)$': path.resolve(rootNodeModules, 'babel-jest'),
  },
};
