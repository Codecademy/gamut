import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

import { createRule } from './createRule';

export default createRule({
  // @to-do: create helper function to get node

  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (node.tag.type === AST_NODE_TYPES.MemberExpression) {
          if (node.tag.object.type !== 'Identifier') return;
          const expressionVariable = node.tag.object.name;
          const arrowFuncExpression = node.quasi.expressions[0];

          if (
            arrowFuncExpression.type !== AST_NODE_TYPES.ArrowFunctionExpression
          )
            return;
          const argObject = arrowFuncExpression.params[0];

          if (argObject.type !== AST_NODE_TYPES.ObjectPattern) return;
          const argumentVariable = argObject.properties[0].value;

          if (argumentVariable?.type !== AST_NODE_TYPES.Identifier) return;
          const namedArgumentVariable = argumentVariable.name;

          if (
            expressionVariable === 'styled' &&
            namedArgumentVariable === 'theme'
          ) {
            // TURN INTO UTILITY FUNCTION
            if (
              arrowFuncExpression.body.type !== AST_NODE_TYPES.MemberExpression
            )
              return;
            if (
              arrowFuncExpression.body.object.type !==
              AST_NODE_TYPES.MemberExpression
            )
              return;
            if (
              arrowFuncExpression.body.property.type !==
              AST_NODE_TYPES.Identifier
            )
              return;
            if (
              arrowFuncExpression.body.object.property.type !==
              AST_NODE_TYPES.Identifier
            )
              return;
            const themeValueKey = arrowFuncExpression.body.property.name;
            const themeCategory = arrowFuncExpression.body.object.property.name;

            context.report({
              fix: (fixer) => {
                return fixer.replaceText(
                  arrowFuncExpression,
                  `themed(${themeCategory}.${themeValueKey})`
                );
              },
              messageId: 'preferThemed',
              node,
            });
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
