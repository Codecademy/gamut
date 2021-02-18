module.exports.default = {
  create(context) {
    return {
      'ImportDeclaration[source.value=/(^@)codecademy(\\u002F)gamut/]': function (
        node
      ) {
        const filename = context.getFilename();
        const importPath = node.source.value;

        const fileDirectory = filename.split('/packages/')[1].split('/')[0];
        const importPackage = importPath.split('@codecademy/')[1].split('/')[0];

        if (fileDirectory === importPackage) {
          context.report({
            messageId: 'useRelativeImport',
            node,
          });
          return;
        }

        if (filename.includes('/styleguide/stories')) {
          if (importPath.includes('/gamut-styles/src')) {
            context.report({
              messageId: 'removeSrc',
              node,
            });
          } else if (importPath.includes('/gamut-styles/dist')) {
            context.report({
              messageId: 'removeDist',
              node,
            });
          } else if (
            !importPath.includes('/gamut-styles') &&
            !importPath.includes('src')
          ) {
            context.report({
              messageId: 'includeSrc',
              node,
            });
          }
          return;
        }

        if (node.source.value.includes('/src')) {
          context.report({
            messageId: 'removeSrc',
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensure Gamut import statements have proper module paths.',
      recommended: 'error',
    },
    fixable: true,
    messages: {
      removeDist:
        'There is no need to append /dist to the end of this module path.',
      removeSrc:
        'There is no need to append /src to the end of this module path.',
      includeSrc: 'Append /src to the end of this module path.',
      useRelativeImport: 'Use a relative path for this import statement.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'gamut-import-paths',
};
