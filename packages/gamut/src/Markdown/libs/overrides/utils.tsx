import find from 'lodash/find';

import { HTMLToReactNode } from '.';

export const isCheckboxParent = (node: HTMLToReactNode, type: string) =>
  Boolean(
    type === 'checkbox' &&
      node.children &&
      node.children[0]?.name === 'input' &&
      node.children[0]?.attribs?.type === type
  );

export const isLabelText = (node: HTMLToReactNode, type: string) => {
  // we are using this text to create the accessible label, so are basically deduplicating it here
  return Boolean(
    (node?.prev?.name === 'input' && node?.prev?.attribs?.type === type) ||
      (node?.name === 'p' &&
        node?.parent?.name === 'li' &&
        node.parent.children &&
        node.parent.children[0]?.name === 'input')
  );
};

export const isInput = (node: HTMLToReactNode, type: string) =>
  node?.name === 'input' && node?.attribs?.type === type;

export const getLabel = (node: HTMLToReactNode) => {
  const vanillaLabel = node?.next?.data;
  if (vanillaLabel !== ' ' && vanillaLabel !== '\n') return vanillaLabel;

  const closestParagraphChild = find(
    node?.parent?.children,
    (o) => o.name === 'p'
  );
  const labelText = find(
    closestParagraphChild?.children,
    (o) => o.type === 'text'
  );

  return labelText?.data;
};
