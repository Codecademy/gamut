const plugin = (api) => {
  const vistor = {
    JSXElement(path) {
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }
      const emotionTag = api.types.jsxIdentifier('Svg');
      path.get('openingElement.name').replaceWith(emotionTag);
      path.get('closingElement.name').replaceWith(emotionTag);
    },
  };

  return {
    visitor: {
      Program(path) {
        path.traverse(vistor);
      },
    },
  };
};

module.exports = plugin;
