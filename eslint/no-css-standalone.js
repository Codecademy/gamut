module.exports.default = {
  create(context) {
    return {
      'ImportDeclaration[source.value=/.*\\.s?css/]': function (node) {
        context.report({
          messageId: 'noStyleSheets',
          node,
        });
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Ensure no standalone .css or .scss files.',
      recommended: 'error',
    },
    fixable: true,
    messages: {
      noStyleSheets:
        "Don't create anymore stylesheets, please see (insert url here) for current best practices`.",
    },
    schema: [],
  },
  name: 'no-css-standalone',
};
