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
        valuePath.replaceWith(
          api.types.jsxExpressionContainer(
            api.template.ast('patternId').expression
          )
        );
      }

      if (
        attrName === 'fill' &&
        valuePath.isStringLiteral() &&
        valuePath.toString().includes('url')
      ) {
        valuePath.replaceWith(
          api.types.jsxExpressionContainer(
            api.template.ast('`url(#${patternId})`').expression
          )
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
