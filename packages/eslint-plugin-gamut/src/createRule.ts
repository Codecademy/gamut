import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);
