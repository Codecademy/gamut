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
    if (!key) {
      return {
        ...acc,
        [attr]: attributes[attr],
      };
    }

    return {
      ...acc,
      [key]: attributes[attr],
    };
  }, {});

// generic html tag override
export const createTagOverride = (tagName, Override = {}) => ({
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
export const createCodeBlockOverride = (tagName, Override = {}) =>
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
