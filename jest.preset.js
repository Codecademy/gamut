const nxPreset = require('@nx/jest/preset').default;
const kebabCase = require('lodash/kebabCase');

const targetProject = kebabCase(
  process.env.NX_TASK_TARGET_PROJECT || 'unknown'
);

module.exports = {
  ...nxPreset,
  reporters: process.env.CI
    ? [
        'default',
        'github-actions',
        ['jest-junit', { outputName: `${targetProject}-report.xml` }],
      ]
    : ['default'],
};
