import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import { createRule } from './createRule';

export default createRule({
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type === AST_NODE_TYPES.JSXIdentifier &&
          node.name.name === 'kbd'
        ) {
          context.report({
            messageId: 'noKbdElement',
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Intended to be used in Storybook docs to disallow use of the `kbd` HTML element in favor of the `KeyboardKey` component for styling purposes.',
    },
    messages: {
      noKbdElement: 'Please use the `KeyboardKey` component instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-kbd-element',
});
