import { HTMLToReactNode } from './overrides';

export const preprocessingInstructions = [
  {
    // This will allow you to update ids in a shared instruction set
    shouldPreprocessNode: function(node: HTMLToReactNode) {
      return Boolean(node.name);
    },
    preprocessNode: function(node: HTMLToReactNode) {
      node.attribs = { class: classname };
    },
  },
];
