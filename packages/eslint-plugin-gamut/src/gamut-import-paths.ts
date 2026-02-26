import { TSESTree } from '@typescript-eslint/utils';

import { createRule } from './createRule';

export default createRule({
  create(context) {
    return {
      'ImportDeclaration[source.value=/(^@)codecademy(\\u002F)gamut/]':
        function (node: TSESTree.ImportDeclaration) {
          const filename = context.getFilename();
          const importPath = node.source.value;

          const fileDirectory = filename.split('/packages/')[1].split('/')[0];
          const importPackage = importPath
            .split('@codecademy/')[1]
            .split('/')[0];

          if (fileDirectory === importPackage) {
            context.report({
              messageId: 'useRelativeImport',
              node,
            });
            return;
          }

          if (importPath.includes('/src')) {
            const indexOfSrc = node.source.range[0] + importPath.search('/src');
            context.report({
              ...(importPath.endsWith('/src') && {
                fix: (fixer) => {
                  return fixer.removeRange([indexOfSrc + 1, node.range[1] - 2]);
                },
              }),
              messageId: 'removeSrc',
              node,
            });
            return;
          }
          if (importPath.includes('/dist')) {
            const indexOfDist =
              node.source.range[0] + importPath.search('/dist');
            context.report({
              ...(importPath.endsWith('/dist') && {
                fix: (fixer) => {
                  return fixer.removeRange([
                    indexOfDist + 1,
                    node.range[1] - 2,
                  ]);
                },
              }),
              messageId: 'removeDist',
              node,
            });
          }
        },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Ensure Gamut import statements have proper module paths.',
      recommended: 'recommended',
    },
    fixable: 'code',
    messages: {
      removeDist:
        'There is no need to append /dist to the end of this module path.',
      removeSrc:
        'There is no need to append /src to the end of this module path.',
      useRelativeImport: 'Use a relative path for this import statement.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'gamut-import-paths',
});
