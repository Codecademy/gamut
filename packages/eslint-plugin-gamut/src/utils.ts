import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';
import { ArrowFunctionExpression } from '@typescript-eslint/types/dist/ast-spec';

export const isNamedVariableTheme = (
  arrowExpression: ArrowFunctionExpression
) => {
  const argObject = arrowExpression.params[0];

  if (argObject?.type !== AST_NODE_TYPES.ObjectPattern) return false;
  const argumentVariable = argObject.properties[0].value;

  if (argumentVariable?.type !== AST_NODE_TYPES.Identifier) return false;
  const namedArgumentVariable = argumentVariable.name;

  return namedArgumentVariable === 'theme';
};

export const checkArrowFuncBodyTypesAndReturnThemeVars = (
  arrowFuncExpression: ArrowFunctionExpression
) => {
  if (
    arrowFuncExpression.body.type !== AST_NODE_TYPES.MemberExpression ||
    arrowFuncExpression.body.object.type !== AST_NODE_TYPES.MemberExpression ||
    arrowFuncExpression.body.property.type !== AST_NODE_TYPES.Identifier ||
    arrowFuncExpression.body.object.property.type !== AST_NODE_TYPES.Identifier
  )
    return false;

  const themeValueKey = arrowFuncExpression.body.property.name;
  const themeCategory = arrowFuncExpression.body.object.property.name;

  return { themeValueKey, themeCategory };
};
