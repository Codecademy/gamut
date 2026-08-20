import { TSESLint } from '@typescript-eslint/utils';

import rule from './no-css-standalone';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-css-standalone', rule, {
  valid: [
    ``,
    `import {namedImport} from 'fileName.tsx'`,
    `import {namedImport} from 'fileName.ts'`,
    `import {namedImport} from 'fileName.js'`,
    `import {namedImport} from 'fileName.yml'`,
    `import {namedImport} from 'fileName.json'`,
    `import {namedImport} from 'fileName.md'`,
    `import {namedImport} from 'fileName.mdx'`,
    `import defaultImport from 'fileName.svg'`,
    `import defaultImport from 'fileName.ts'`,
    `import defaultImport from 'fileName.tsx'`,
    `import defaultImport from 'fileName.js'`,
    `import defaultImport from 'fileName.yml'`,
    `import defaultImport from 'fileName.json'`,
    `import defaultImport from 'fileName.md'`,
    `import defaultImport from 'fileName.mdx'`,
    `import defaultImport from 'fileName.svg'`,
  ],
  invalid: [
    {
      code: `import {namedImport} from 'fileName.css'`,
      errors: [
        {
          messageId: 'noCssStandalone',
        },
      ],
    },
    {
      code: `import {namedImport} from 'fileName.scss'`,
      errors: [
        {
          messageId: 'noCssStandalone',
        },
      ],
    },
    {
      code: `import namedImport from 'fileName.css'`,
      errors: [
        {
          messageId: 'noCssStandalone',
        },
      ],
    },
    {
      code: `import namedImport from 'fileName.scss'`,
      errors: [
        {
          messageId: 'noCssStandalone',
        },
      ],
    },
  ],
});
