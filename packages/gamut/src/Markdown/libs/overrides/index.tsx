import React from 'react';
import { get } from 'lodash';
import HtmlToReact from 'html-to-react';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();

export interface AttributesMap {
  [key: string]: string | boolean;
}

export interface HTMLToReactNode {
  data: string;
  type: string;
  name?: string;
  children?: HTMLToReactNode[];
  attribs?: any;
  next: HTMLToReactNode;
  prev: HTMLToReactNode;
  parent: HTMLToReactNode;
}

// Mapping of html attributes to their camelCase variants
const attributeMap: { [key: string]: string } = {
  ...camelCaseMap,
  for: 'htmlFor',
  class: 'className',
};

export type OverrideSettings = {
  component: React.ComponentType<any>;
  allowedAttributes?: string[];
  processNode?: (node: HTMLToReactNode, props: object) => React.ReactNode;
  shouldProcessNode?: (node: HTMLToReactNode) => boolean;
};

export type ManyOverrideSettings = {
  [i: string]: OverrideSettings;
};

const processAttributeValue = (value: string | boolean) => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return value || true;
};

// Convert html attributes to valid react props
export const processAttributes = (attributes: AttributesMap = {}) =>
  Object.keys(attributes).reduce((acc, attr) => {
    const reactAttr = attributeMap[attr.replace(/[-:]/, '')] || attr;

    return {
      ...acc,
      [reactAttr]: processAttributeValue(attributes[attr]),
    };
  }, {});

// generic html tag override
export const createTagOverride = (
  tagName: string,
  Override: OverrideSettings
) => ({
  shouldProcessNode(node: HTMLToReactNode) {
    if (!Override) return false;

    if (Override.shouldProcessNode) {
      return Override.shouldProcessNode(node);
    }
    return node.name === tagName.toLowerCase();
  },
  processNode(
    node: HTMLToReactNode,
    children: HTMLToReactNode[],
    key: React.Key
  ) {
    if (!Override) return null;

    const props = {
      ...processAttributes(node.attribs),
      children,
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
  Override: OverrideSettings
) =>
  createTagOverride(tagName, {
    shouldProcessNode(node: HTMLToReactNode) {
      return (
        (node.name === 'code' && get(node, 'parent.name') === 'pre') ||
        node.name === tagName.toLowerCase()
      );
    },

    processNode(node: HTMLToReactNode, props: any) {
      const [, language = undefined] =
        (props.className && props.className.match(/language-([^\s]+)/)) || [];

      return (
        <Override.component {...props} language={language}>
          {props.children && props.children[0]}
        </Override.component>
      );
    },
    ...Override,
  });

const processText = (text: string) => {
  // Replace &mdash; due to legacy markdown that didn't use smart dashes
  return text.replace(/&mdash;/g, '\u2014');
};

export const standardOverrides = [
  {
    shouldProcessNode(node: HTMLToReactNode) {
      // Parse text outside of code blocks
      if (node.parent && ['code', 'pre'].indexOf(node.parent.name) >= 0) {
        return false;
      }
      if (node.type === 'text') return true;
      return false;
    },
    processNode(node: HTMLToReactNode) {
      return processText(node.data);
    },
  },
  {
    shouldProcessNode() {
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
];
