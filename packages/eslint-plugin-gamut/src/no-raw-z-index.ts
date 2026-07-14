import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

import { createRule } from './createRule';

/**
 * True for a numeric literal, including a negated one like `-1`.
 */
const isNumericLiteral = (node: TSESTree.Node | null | undefined): boolean => {
  if (!node) return false;
  if (node.type === AST_NODE_TYPES.Literal && typeof node.value === 'number') {
    return true;
  }
  return (
    node.type === AST_NODE_TYPES.UnaryExpression &&
    (node.operator === '-' || node.operator === '+') &&
    isNumericLiteral(node.argument)
  );
};

const isZIndexKey = (key: TSESTree.Node): boolean =>
  (key.type === AST_NODE_TYPES.Identifier && key.name === 'zIndex') ||
  (key.type === AST_NODE_TYPES.Literal && key.value === 'zIndex') ||
  (key.type === AST_NODE_TYPES.Literal && key.value === 'z-index');

export default createRule({
  create(context) {
    return {
      // Style objects: `{ zIndex: 1 }` / `{ 'z-index': 1 }`
      Property(node) {
        if (isZIndexKey(node.key) && isNumericLiteral(node.value)) {
          context.report({ messageId: 'noRawZIndex', node: node.value });
        }
      },
      // JSX props: `<Box zIndex={1} />`
      JSXAttribute(node) {
        if (
          node.name.type === AST_NODE_TYPES.JSXIdentifier &&
          node.name.name === 'zIndex' &&
          node.value?.type === AST_NODE_TYPES.JSXExpressionContainer &&
          isNumericLiteral(node.value.expression as TSESTree.Node)
        ) {
          context.report({ messageId: 'noRawZIndex', node: node.value });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Discourage raw numeric z-index values which can lead to z-index stacking issues and encourage usage of semantic tokens from the `zIndexes` scale.',
      recommended: 'error',
    },
    messages: {
      noRawZIndex:
        'Semantic tokens from the `zIndexes` scale (e.g. `zIndexes.modal`) are recommendedinstead of a raw z-index number. For a deliberate in-between value, disable this rule inline with a justifying comment.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-raw-z-index',
});
