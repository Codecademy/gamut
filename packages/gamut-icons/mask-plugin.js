const plugin = (api) => {
  const { types } = api;

  const maskTag = types.jSXIdentifier('mask');
  const gTag = types.jSXIdentifier('g');
  const rectTag = types.jSXIdentifier('rect');

  const createUniqueAttributeId = (tag, value) => {
    const titleId = '${titleId}';
    const identifier = `${value}-${titleId ?? 'default'}`;
    const newId = tag === 'mask' ? `url(#${identifier})` : identifier;
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

  const normalizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
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

      const newId = createAttribute('id', createUniqueAttributeId('id', title));

      const ogOpen = path.get('openingElement').node;
      const ogClose = path.get('closingElement').node;

      const maskTagOpen = types.jsxOpeningElement(maskTag, [newId]);
      const maskTagClosed = types.jsxClosingElement(maskTag, []);

      const maskGAttr = createAttribute(
        'mask',
        createUniqueAttributeId('mask', title)
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
