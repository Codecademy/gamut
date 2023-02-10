const plugin = (api) => {
  const { types } = api;

  const isParentSvg = (path) => {
    return (
      path.parent &&
      types.isJSXIdentifier(path.parent.openingElement) &&
      path.parent.openingElement.name === 'svg'
    );
  };
  const maskTag = types.jSXIdentifier('mask');

  const vistor = {
    JSXElement(path) {
      if (isParentSvg(path)) {
        return;
      }

      if (path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }

      const maskTagOpen = types.jsxOpeningElement(maskTag, []);
      const maskTagClosed = types.jsxClosingElement(maskTag, []);

      path.replaceWith(
        types.jsxElement(maskTagOpen, maskTagClosed, [path.node])
      );

      path.skip();
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
