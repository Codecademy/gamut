/**
 * @jest-environment node
 */

import { ESLintUtils } from '@typescript-eslint/experimental-utils';

import rule from './prefer-themed';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('prefer-themed', rule, {
  valid: [
    ``,
    `styled.div\`
  color: \${themed('colors.wat')};
\``,
    `styled(Box)\`
  color: \${themed('colors.wat')};
\``,
    `
export const AppWrapper = styled.div\`
  position: relative;
  z-index: 1;
\`;
`,
  ],
  invalid: [
    {
      code: `styled.div\`
  color: \${({ theme }) => theme.colors.wat};
\``,
      errors: [
        {
          messageId: 'preferThemed',
        },
      ],
      output: `styled.div\`
  color: \${themed('colors.wat')};
\``,
    },
  ],
});
