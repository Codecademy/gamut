import find from 'lodash/find';

import { HTMLToReactNode } from '.';

export const isCheckboxParent = (node: HTMLToReactNode, type: string) =>
  Boolean(
    type === 'checkbox' &&
      node.children &&
      node.children[0]?.name === 'input' &&
      node.children[0]?.attribs?.type === type
  );

// a <p> that only holds video tags, i.e. a single-line <video></video> that marked parsed as paragraph text
export const isVideoParent = (node: HTMLToReactNode, tagName: string) =>
  Boolean(
    node.name === 'p' &&
      node.children?.some((child) => child.name === tagName) &&
      node.children.every(
        (child) =>
          child.name === tagName ||
          (child.type === 'text' && !child.data.trim())
      )
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
