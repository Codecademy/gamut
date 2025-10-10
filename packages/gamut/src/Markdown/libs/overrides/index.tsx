import styled from '@emotion/styled';
import HtmlToReact from 'html-to-react';
import camelCaseMap from 'html-to-react/lib/camel-case-attribute-names';
import get from 'lodash/get';
import * as React from 'react';

import { getLabel, isCheckboxParent, isInput, isLabelText } from './utils';

const processNodeDefinitions = HtmlToReact.ProcessNodeDefinitions();

const CheckboxParentLi = styled.li`
  &::before {
    display: none !important;
  }
`;

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

type OverrideSettingsBase = {
  component?: React.ComponentType<any>;
  allowedAttributes?: string[];
  processNode?: (node: HTMLToReactNode, props: object) => React.ReactNode;
  shouldProcessNode?: (node: HTMLToReactNode) => boolean;
};

interface OverrideSettingsComponent extends OverrideSettingsBase {
  component: React.ComponentType<any>;
}

interface OverrideSettingsProcessNode extends OverrideSettingsBase {
  processNode: (node: HTMLToReactNode, props: object) => React.ReactNode;
}

export type MarkdownOverrideSetting =
  | OverrideSettingsComponent
  | OverrideSettingsProcessNode;

export type MarkdownOverrideSettings = {
  [i: string]: MarkdownOverrideSetting;
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
  Override: MarkdownOverrideSetting
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
    };

    if (Override.processNode) {
      return Override.processNode(node, props);
    }

    if (!Override.component) return null;

    return <Override.component key={key} {...props} />;
  },
});

// generic video tag override
export const createVideoOverride = (
  tagName: string,
  Override: MarkdownOverrideSetting
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

    const { src, ...processedAttributes } = processAttributes(
      node.attribs
    ) as any;

    const altVideoSrc = [] as any;
    const textTracks = [] as any;

    if (children) {
      children.forEach((element: any) => {
        if (element.type === 'source' && element?.props?.src) {
          if (element.props?.type.includes('video')) {
            altVideoSrc.push({
              src: element?.props.src,
              type: element?.props.type,
            });
          }
        } // Once we enable captions in the Video component, we can add an additional check here - GM-909
        else if (element.type === 'track') {
          textTracks.push({
            src: element?.props.src,
            language: element?.props.srcLang,
            default: element?.props.default,
            kind: element?.props.kind,
            label: element?.props.label,
            type: element?.props.type,
          });
        }
      });
    }

    const props = {
      src: altVideoSrc.length > 0 ? altVideoSrc : src,
      textTracks,
      ...processedAttributes,
      children,
      key,
    };

    if (Override.processNode) {
      return Override.processNode(node, props);
    }

    if (!Override.component) return null;

    return <Override.component {...props} />;
  },
});

// Allows <CodeBlock></CodeBlock> override and overrides of standard fenced codeblocks
export const createCodeBlockOverride = (
  tagName: string,
  Override: MarkdownOverrideSetting
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
        props.className?.match(/language-([^\s]+)/) || [];

      if (!Override.component) return null;

      const { key, ...rest } = props;

      return (
        <Override.component key={key} {...rest} language={language}>
          {props.children?.[0]}
        </Override.component>
      );
    },
    ...Override,
  });

export const createInputOverride = (
  type: string,
  Override: MarkdownOverrideSetting
) =>
  createTagOverride('input', {
    shouldProcessNode(node: HTMLToReactNode) {
      return (
        isCheckboxParent(node, type) ||
        isInput(node, type) ||
        isLabelText(node, type)
      );
    },

    processNode(node: HTMLToReactNode, props: any) {
      const label = getLabel(node);

      if (!Override.component) return null;

      const { key, ...rest } = props;

      if (isCheckboxParent(node, type)) {
        return <CheckboxParentLi key={key} {...rest} />;
      }

      if (isLabelText(node, type)) return null;

      return <Override.component key={key} label={label} {...rest} />;
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
      if (node.parent && ['code', 'pre'].indexOf(node.parent.name!) >= 0) {
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
