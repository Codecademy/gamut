const plugin = (api) => {
  const { types } = api;

  const visitor = {
    JSXAttribute(path) {
      if (path.get('name').isJSXIdentifier({ name: 'strokeWidth' })) {
        const inherit = types.stringLiteral('inherit');
        path.get('value').replaceWith(inherit);
      }
    },
  };

  return {
    visitor: {
      Program(path) {
        path.traverse(visitor);
      },
    },
  };
};

module.exports = plugin;
