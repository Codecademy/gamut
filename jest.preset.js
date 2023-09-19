const nxPreset = require('@nx/jest/preset').default;
const { kebabCase } = require('lodash');

const targetProject = kebabCase(
  process.env.NX_TASK_TARGET_PROJECT || 'unknown'
);

module.exports = {
  ...nxPreset,
  coverageReporters: ['json', 'text', 'clover'],
  reporters: process.env.CI
    ? ['default', ['jest-junit', { outputName: `${targetProject}-report.xml` }]]
    : ['default'],
};
