const plugin = (api) => {
  const vistor = {
    JSXElement(path) {
      // We only want to find SVG element
      if (path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        // Update the opening and closing tags to the styled component identifier
        const emotionTag = api.types.jsxIdentifier('Svg');
        path.get('openingElement.name').replaceWith(emotionTag);
        path.get('closingElement.name').replaceWith(emotionTag);
      }
    },
    JSXAttribute(path) {
      const valuePath = path.get('value');
      const attrName = path.get('name').toString();
      if (attrName === 'id' && valuePath.isStringLiteral()) {
        const newId = `\`${valuePath
          .toString()
          .replace(/"/g, '')}-\${idPrefix}\``;

        valuePath.replaceWith(
          api.types.jsxExpressionContainer(api.template.ast(newId).expression)
        );
      }

      if (
        attrName === 'fill' &&
        valuePath.isStringLiteral() &&
        valuePath.toString().includes('url')
      ) {
        const newUrl = `\`${valuePath
          .toString()
          .replace(/"/g, '')
          .replace(')', '')}-\${idPrefix})\``;

        valuePath.replaceWith(
          api.types.jsxExpressionContainer(api.template.ast(newUrl).expression)
        );
      }
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
