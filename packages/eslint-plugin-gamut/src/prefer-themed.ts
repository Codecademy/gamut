import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

import { createRule } from './createRule';

export default createRule({
  // @to-do: create helper function to get node

  create(context) {
    return {
      TaggedTemplateExpression: function (node) {
        if (node.tag.type === AST_NODE_TYPES.MemberExpression) {
          if (node.tag.object.type === 'Identifier') {
            const expressionVariable = node.tag.object.name;
            const arrowFuncExpression = node.quasi.expressions[0];

            if (
              arrowFuncExpression.type ===
              AST_NODE_TYPES.ArrowFunctionExpression
            ) {
              const argObject = arrowFuncExpression.params[0];

              if (argObject.type === AST_NODE_TYPES.ObjectPattern) {
                const argumentVariable = argObject.properties[0].value;

                if (argumentVariable?.type === AST_NODE_TYPES.Identifier) {
                  const namedArgumentVariable = argumentVariable.name;
                  if (
                    expressionVariable === 'styled' &&
                    namedArgumentVariable === 'theme'
                  ) {
                    context.report({
                      fix: (fixer) => {
                        return fixer.replaceText(
                          arrowFuncExpression,
                          'themed(etc)'
                        );
                      },
                      messageId: 'preferThemed',
                      node,
                    });
                  }
                }
              }
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Prefer themed style utility',
      recommended: 'error',
    },
    fixable: 'code',
    messages: {
      preferThemed: 'Use the themed(url) style utility instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'prefer-themed',
});
