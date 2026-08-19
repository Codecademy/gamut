import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './no-kbd-element';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('no-kbd-element', rule, {
  valid: [
    `<div />`,
    `<KeyboardKey />`,
    `<KeyboardKey>Ctrl</KeyboardKey>`,
    `<span>Press the key</span>`,
    `<code>some code</code>`,
  ],
  invalid: [
    {
      code: `<kbd>Ctrl</kbd>`,
      errors: [
        {
          messageId: 'noKbdElement',
        },
      ],
    },
    {
      code: `<kbd />`,
      errors: [
        {
          messageId: 'noKbdElement',
        },
      ],
    },
    {
      code: `<div><kbd>Enter</kbd></div>`,
      errors: [
        {
          messageId: 'noKbdElement',
        },
      ],
    },
    {
      code: `<kbd className="key">Shift</kbd>`,
      errors: [
        {
          messageId: 'noKbdElement',
        },
      ],
    },
  ],
});
