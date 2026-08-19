import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './prefer-themed';

const ruleTester = new RuleTester();

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
