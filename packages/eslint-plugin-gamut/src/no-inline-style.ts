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
      recommended: 'recommended',
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
