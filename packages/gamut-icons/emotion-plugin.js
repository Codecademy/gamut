const plugin = (api) => {
  const { types } = api;

  const isParentSvg = (path) => {
    if (path.parent.openingElement && path.parent.openingElement.name) {
      console.log(path.parent.openingElement.name);
    }
    return (
      path.parent &&
      types.isJSXElement(path.parent) &&
      path.parent.openingElement.name === 'svg'
    );
  };
  const isParentMask = (path) => {
    return (
      path.parent &&
      types.isJSXIdentifier(path.parent.openingElement) &&
      path.parent.openingElement.name === 'mask'
    );
  };
  const maskTag = types.jSXIdentifier('mask');

  const createIdAttribute = (tag) =>
    types.jsxAttribute(
      types.jsxIdentifier('id'),
      types.jsxExpressionContainer(types.identifier(`"${tag}Id"`))
    );

  const vistor = {
    JSXElement(path) {
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return;
      }

      const tagElement: t.JSXExpressionContainer | null = null;

      const hasTitle = path.parentPath.openingElement;

      const title = hasTitle;
      const newId = createIdAttribute(title);

      const ogOpen = path.get('openingElement').node;
      const ogClose = path.get('closingElement').node;

      const maskTagOpen = types.jsxOpeningElement(maskTag, [newId]);
      const maskTagClosed = types.jsxClosingElement(maskTag, []);

      console.log(path.node.children);
      const newChildren = types.jsxElement(
        maskTagOpen,
        maskTagClosed,
        path.node.children
      );

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
