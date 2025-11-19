import { createRule } from './createRule';

export default createRule({
  create(context) {
    return {
      'ImportDeclaration[source.value=/.*\\.s?css/]': function (node) {
        context.report({
          messageId: 'noCssStandalone',
          node,
        });
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Ensure no standalone .css or .scss files.',
      recommended: 'error',
    },
    messages: {
      noCssStandalone:
        "Do not create anymore stylesheets, please see Gamut's Storybook documentation for current best practices.",
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-css-standalone',
});
