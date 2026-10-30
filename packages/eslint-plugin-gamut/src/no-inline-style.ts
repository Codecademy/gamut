import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import { createRule } from './createRule';

export default createRule({
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.type === AST_NODE_TYPES.JSXIdentifier &&
          node.name.name === 'style'
        ) {
          context.report({
            messageId: 'noInlineStyle',
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Disallow inline style props on JSX elements.',
    },
    messages: {
      noInlineStyle:
        'The use of inline styles is discouraged — consider using styled components, design system utilities, or CSS classes instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-inline-style',
});
