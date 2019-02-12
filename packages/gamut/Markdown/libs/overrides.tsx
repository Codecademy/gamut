import React from 'react';
import { get } from 'lodash';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';

// Mapping of html attributes to their camelCase variants
const attributeMap = {
  ...camelCaseMap,
  for: 'htmlFor',
  class: 'className',
};

// Convert html attributes to valid react props
export const processAttributes = (attributes = {}) =>
  Object.keys(attributes).reduce((acc, attr) => {
    const key = attributeMap[attr.replace(/[-:]/, '')];
    return {
      ...acc,
      [key || attr]: attributes[attr],
    };
  }, {});

export interface OverrideSettings {
  component?: any;
  props?: any;
  processNode?: (node, props) => any;
  shouldProcessNode?: (node) => boolean;
  [i: string]: any;
}

// generic html tag override
export const createTagOverride = (
  tagName: string,
  Override: OverrideSettings = {}
) => ({
  shouldProcessNode(node) {
    if (Override.shouldProcessNode) {
      return Override.shouldProcessNode(node);
    }
    return node.name === tagName.toLowerCase();
  },
  processNode(node, children, key) {
    const props = {
      ...processAttributes(node.attribs),
      children,
      ...Override.props,
      key,
    };
    if (Override.processNode) {
      return Override.processNode(node, props);
    }
    return <Override.component {...props} />;
  },
});

// Allows <CodeBlock></CodeBlock> override and overrides of standard fenced codeblocks
export const createCodeBlockOverride = (
  tagName,
  Override: OverrideSettings = {}
) =>
  createTagOverride(tagName, {
    shouldProcessNode(node) {
      return (
        (node.name === 'code' && get(node, 'parent.name') === 'pre') ||
        node.name === tagName.toLowerCase()
      );
    },

    processNode(node, props) {
      const language =
        props.className && props.className.replace('language-', ''); // eslint-disable-line react/prop-types
      return <Override.component {...props} language={language} />;
    },
    ...Override,
  });
