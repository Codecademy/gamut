const plugin = (api) => {
  const { types } = api;

  const maskTag = types.jSXIdentifier('mask');
  const gTag = types.jSXIdentifier('g');
  const rectTag = types.jSXIdentifier('rect');

  const createUniqueAttributeId = (tag) => {
    const titleId = '${maskId}';
    const newId = tag === 'mask' ? `url(#${titleId})` : titleId;
    return newId;
  };

  const createAttribute = (tag, value) => {
    const backtick = '`';
    return types.jsxAttribute(
      types.jsxIdentifier(tag),
      types.jsxExpressionContainer(
        types.identifier(`${backtick}${value}${backtick}`)
      )
    );
  };

  const vistor = {
    JSXElement(path) {
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }
      let titleNode;

      path.get('children').some((childPath) => {
        // we want to delete the title and reinsert it so it lands outside the mask. this fixes some issues with svgr's built-in titleProp parsing.
        if (!childPath.isJSXElement()) return false;
        const name = childPath.get('openingElement').get('name');
        if (name.node.name === 'title') {
          titleNode = childPath.node;
          childPath.remove();
        }
        return false;
      });

      const newId = createAttribute('id', createUniqueAttributeId('id'));

      const ogOpen = path.get('openingElement').node;
      const ogClose = path.get('closingElement').node;

      const maskTagOpen = types.jsxOpeningElement(maskTag, [newId]);
      const maskTagClosed = types.jsxClosingElement(maskTag, []);

      const maskGAttr = createAttribute(
        'mask',
        createUniqueAttributeId('mask')
      );

      const gTagOpen = types.jsxOpeningElement(gTag, [maskGAttr]);

      const gTagClose = types.jsxClosingElement(gTag, []);

      const rectTagComplete = types.jsxElement(
        types.jsxOpeningElement(
          rectTag,
          [
            createAttribute('width', '100%'),
            createAttribute('height', '100%'),
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

      path.node.children.unshift(titleNode);
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
