import React from 'react';
import { get } from 'lodash';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';

export interface AttributesMap {
  [key: string]: string;
}

export interface Node {
  data: string;
  type: string;
  name?: string;
  children?: Node[];
  attribs?: any;
  next: Node;
  prev: Node;
  parent: Node;
}

// Mapping of html attributes to their camelCase variants
const attributeMap: AttributesMap = {
  ...camelCaseMap,
  for: 'htmlFor',
  class: 'className',
};

export interface OverrideSettings {
  component?: any;
  props?: any;
  processNode?: (node: Node, props: object) => any;
  shouldProcessNode?: (node: Node) => boolean;
  [i: string]: any;
}

// Convert html attributes to valid react props
export const processAttributes = (attributes: AttributesMap = {}) =>
  Object.keys(attributes).reduce((acc, attr) => {
    const key = attributeMap[attr.replace(/[-:]/, '')];
    return {
      ...acc,
      [key || attr]: attributes[attr],
    };
  }, {});

// generic html tag override
export const createTagOverride = (
  tagName: string,
  Override: OverrideSettings = {}
) => ({
  shouldProcessNode(node: Node) {
    const { next, prev, ...propz } = node;
    if (Override.shouldProcessNode) {
      return Override.shouldProcessNode(node);
    }
    return node.name === tagName.toLowerCase();
  },
  processNode(node: Node, children: Node[], key: any) {
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
  tagName: string,
  Override: OverrideSettings = {}
) =>
  createTagOverride(tagName, {
    shouldProcessNode(node: Node) {
      return (
        (node.name === 'code' && get(node, 'parent.name') === 'pre') ||
        node.name === tagName.toLowerCase()
      );
    },

    processNode(node: Node, props: any) {
      const language =
        props.className && props.className.replace('language-', '');

      return (
        <Override.component {...props} language={language}>
          {props.children && props.children[0]}
        </Override.component>
      );
    },
    ...Override,
  });
