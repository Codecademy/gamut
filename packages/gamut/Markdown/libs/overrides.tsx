import React from 'react';
import { get } from 'lodash';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';

export interface AttributesMap {
  [key: string]: string;
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
const attributeMap: AttributesMap = {
  ...camelCaseMap,
  for: 'htmlFor',
  class: 'className',
};

export type OverrideSettings<
  TProps extends {} = {},
  TComponent extends React.ComponentType<TProps> = React.ComponentType<TProps>
> = {
  component: TComponent;
  props?: TProps;
  processNode?: (node: HTMLToReactNode, props: object) => any;
  shouldProcessNode?: (node: HTMLToReactNode) => boolean;
};

export type ManyOverrideSettings = {
  [i: string]: OverrideSettings;
};

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
  Override: OverrideSettings
) => ({
  shouldProcessNode(node: HTMLToReactNode) {
    if (!Override) return false;

    const { next, prev } = node;
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
