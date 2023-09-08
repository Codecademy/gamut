const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  coverageReporters: ['json', 'text', 'clover'],
  reporters: process.env.CI
    ? ['default', ['jest-junit', { outputName: `${packageName}-report.xml` }]]
    : ['default'],
};
