import { HTMLToReactNode } from '.';

export const isCheckboxParent = (node: HTMLToReactNode, type: string) =>
  type === 'checkbox' &&
  node.children &&
  node.children[0]?.name === 'input' &&
  node.children[0]?.attribs?.type === type;

export const isLabelText = (node: HTMLToReactNode, type: string) =>
  // we are using this text to create the accessible label, so are basically deduplicating it here
  node?.prev?.name === 'input' && node?.prev?.attribs?.type === type;

export const isInput = (node: HTMLToReactNode, type: string) =>
  node?.name === 'input' && node?.attribs?.type === type;
