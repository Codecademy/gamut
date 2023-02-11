const plugin = (api) => {
  const vistor = {
    JSXElement(path) {
      // We only want to find SVG element
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }
      // Update the opening and closing tags to the styled component identifier
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
