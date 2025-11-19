import { createRule } from './createRule';

export default createRule({
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type === 'JSXIdentifier' && node.name.name === 'style') {
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
      recommended: 'error',
    },
    messages: {
      noInlineStyle:
        'Inline styles are not allowed. Use styled components, CSS classes, or design system utilities instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-inline-style',
});

