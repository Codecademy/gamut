import { TSESLint } from '@typescript-eslint/utils';

import rule from './no-raw-z-index';

const ruleTester = new TSESLint.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-raw-z-index', rule, {
  valid: [
    // Semantic tokens are the expected usage.
    `const styles = { zIndex: zIndexes.modal };`,
    `<Box zIndex={zIndexes.stickyHeader} />;`,
    // Arithmetic on a token is allowed (e.g. Tip's shadow).
    `const styles = { zIndex: zIndexes.foreground - 2 };`,
    `<Box zIndex={zIndexes.modal + 5} />;`,
    // Variables / non-literal expressions are not flagged.
    `<Box zIndex={zIndex} />;`,
    `const styles = { zIndex };`,
    // Unrelated properties.
    `const styles = { padding: 0 };`,
    `<Box top={0} />;`,
  ],
  invalid: [
    {
      code: `const styles = { zIndex: 1 };`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
    {
      code: `const styles = { zIndex: 0 };`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
    {
      code: `const styles = { zIndex: -1 };`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
    {
      code: `const styles = { 'z-index': 100 };`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
    {
      code: `<Box zIndex={2} />;`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
    {
      code: `<Box zIndex={-1} />;`,
      errors: [{ messageId: 'noRawZIndex' }],
    },
  ],
});
