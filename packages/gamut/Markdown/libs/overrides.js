import React from 'react';
import { get } from 'lodash';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';
import isValidComponent from '../../utils/isValidComponent';

// Mapping of html attributes to their camelCase variants
const attributeMap = {
  ...camelCaseMap,
  for: 'htmlFor',
  class: 'className',
};

export const normalizeOverride = (override = {}) => {
  if (isValidComponent(override)) {
    return {
      component: override,
      props: {},
      shouldProcessNode: null,
      processNode: null,
    };
  }

  return override;
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
export const createTagOverride = (tagName, override) => {
  const Override = normalizeOverride(override);

  return {
    shouldProcessNode(node) {
      const tagNameMatch = node.name === tagName.toLowerCase();
      return tagNameMatch;
    },
    processNode(node, children, key) {
      const props = {
        ...processAttributes(node.attribs),
        children,
        ...Override.props,
        key,
      };
      return <Override.component {...props} />;
    },
  };
};

// Allows <CodeBlock></CodeBlock> override and overrides of standard fenced codeblocks
export const createCodeBlockOverride = (tagName, override) => ({
  shouldProcessNode(node) {
    return (
      (node.name === 'code' && get(node, 'parent.name') === 'pre') ||
      node.name === tagName.toLowerCase()
    );
  },
  processNode(node, children, key) {
    const Override = normalizeOverride(override);
    const language =
      node.attribs.class && node.attribs.class.replace('language-', '');
    return (
      <Override.component
        key={key}
        {...processAttributes(node.attribs)}
        {...Override.props}
        language={language}
      >
        {children}
      </Override.component>
    );
  },
});
