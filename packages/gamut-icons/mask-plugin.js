const plugin = (api) => {
  const { types } = api;

  const maskTag = types.jSXIdentifier('mask');
  const gTag = types.jSXIdentifier('g');
  const rectTag = types.jSXIdentifier('rect');

  const createAttribute = (tag, value) => {
    return types.jsxAttribute(
      types.jsxIdentifier(tag),
      types.jsxExpressionContainer(types.identifier(`'${value}'`))
    );
  };

  const vistor = {
    JSXElement(path) {
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }

      let title = '';

      path.node.children.forEach((child) => {
        if (
          child.openingElement.name.name === 'title' &&
          child.children[0].type === 'JSXText'
        ) {
          title = child.children[0].value;
        }
      });

      const newId = createAttribute('id', title);

      const ogOpen = path.get('openingElement').node;
      const ogClose = path.get('closingElement').node;

      const maskTagOpen = types.jsxOpeningElement(maskTag, [newId]);
      const maskTagClosed = types.jsxClosingElement(maskTag, []);

      const maskGAttr = createAttribute('mask', title);

      const gTagOpen = types.jsxOpeningElement(gTag, [maskGAttr]);

      const gTagClose = types.jsxClosingElement(gTag, []);

      const rectTagComplete = types.jsxElement(
        types.jsxOpeningElement(
          rectTag,
          [
            createAttribute('width', '24'),
            createAttribute('height', '24'),
            createAttribute('fill', 'currentColor'),
          ],
          true
        ),
        null,
        [],
        true
      );

      const newerChildren = types.jsxElement(gTagOpen, gTagClose, [
        rectTagComplete,
      ]);

      const newChildren = types.jsxElement(maskTagOpen, maskTagClosed, [
        ...path.node.children,
        newerChildren,
      ]);

      path.replaceWith(types.jsxElement(ogOpen, ogClose, [newChildren]));
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
