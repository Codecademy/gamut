/**
 * Allowed types:
 *  build
 *  chore
 *  ci
 *  docs
 *  feat
 *  fix
 *  improvement
 *  perf
 *  refactor
 *  revert
 *  style
 *  test
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow empty subject for now
    'subject-empty': [0],
  },
};
