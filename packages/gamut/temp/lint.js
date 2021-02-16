module.exports.default = {
  create(context) {
    return {
      'CallExpression[callee.name="useSelector"][arguments.length=1]': function (
        node
      ) {
        // logic here!
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      category: 'Best Practices /* ?? */',
      description: '// ...???',
      recommended: 'error',
    },
    fixable: true,
    messages: {
      // todo: ???
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'gamut-import-paths',
};
