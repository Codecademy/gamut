import { ESLintUtils } from '@typescript-eslint/utils';

import rule from './no-inline-style';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-inline-style', rule, {
  valid: [
    `<div />`,
    `<div className="foo" />`,
    `<Component className="bar" />`,
    `<div styles={styles} />`,
    `<Component styleSheet={sheet} />`,
    `const style = { padding: 0 };`,
  ],
  invalid: [
    {
      code: `<div style={{ padding: 0 }} />`,
      errors: [
        {
          messageId: 'noInlineStyle',
        },
      ],
    },
    {
      code: `<Component style={{ margin: '10px' }} />`,
      errors: [
        {
          messageId: 'noInlineStyle',
        },
      ],
    },
    {
      code: `<button style={styles.button} />`,
      errors: [
        {
          messageId: 'noInlineStyle',
        },
      ],
    },
    {
      code: `<div className="foo" style={{ color: 'red' }} />`,
      errors: [
        {
          messageId: 'noInlineStyle',
        },
      ],
    },
    {
      code: `
        <Component
          style={{
            padding: 0,
            margin: 0,
          }}
        />
      `,
      errors: [
        {
          messageId: 'noInlineStyle',
        },
      ],
    },
  ],
});

