import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import { createRule } from './createRule';
import {
  checkArrowFuncBodyTypesAndReturnThemeVars,
  isNamedVariableTheme,
} from './utils';

export default createRule({
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (node.tag.type === AST_NODE_TYPES.MemberExpression) {
          if (node.tag.object.type !== 'Identifier') return;
          const expressionVariable = node.tag.object.name;
          const arrowFuncExpression = node.quasi.expressions[0];

          if (
            arrowFuncExpression?.type !== AST_NODE_TYPES.ArrowFunctionExpression
          )
            return;

          if (!isNamedVariableTheme(arrowFuncExpression)) return;

          if (expressionVariable === 'styled') {
            const { themeValueKey, themeCategory } =
              checkArrowFuncBodyTypesAndReturnThemeVars(arrowFuncExpression) ||
              {};

            if (!themeValueKey) return;

            context.report({
              fix: (fixer) => {
                return fixer.replaceText(
                  arrowFuncExpression,
                  `themed('${themeCategory}.${themeValueKey}')`
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
      recommended: 'recommended',
    },
    fixable: 'code',
    messages: {
      preferThemed:
        'Use the our variants API or themed style utility from gamut-styles instead.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'prefer-themed',
});
