const plugin = (api) => {
  const { types } = api;

  const clipPathTag = types.jSXIdentifier('clipPath');
  const gTag = types.jSXIdentifier('g');
  const rectTag = types.jSXIdentifier('rect');

  const normalizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };
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
          (child.children[0].type === 'JSXText' ||
            child.children[0].type === 'StringLiteral' ||
            child.children[0].type === 'JSXExpressionContainer')
        ) {
          title = normalizeTitle(child.children[0].expression.value);
        }
      });

      const newId = createAttribute('id', `${title}`);

      const ogOpen = path.get('openingElement').node;
      const ogClose = path.get('closingElement').node;

      const maskTagOpen = types.jsxOpeningElement(clipPathTag, [newId]);
      const maskTagClosed = types.jsxClosingElement(clipPathTag, []);

      const maskGAttr = createAttribute('clip-path', `url(#${title})`);
      const idGAttr = createAttribute('id', `${title}-path`);

      const gTagOpen = types.jsxOpeningElement(gTag, [idGAttr, maskGAttr]);

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
      ]);

      path.replaceWith(
        types.jsxElement(ogOpen, ogClose, [newChildren, newerChildren])
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
