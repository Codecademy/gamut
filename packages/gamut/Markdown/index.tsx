import React, { PureComponent } from 'react';
import cx from 'classnames';
import marked from 'marked';
import HtmlToReact from 'html-to-react';
import insane from 'insane';
import omitProps from '../utils/omitProps';
import {
  createTagOverride,
  createCodeBlockOverride,
  ManyOverrideSettings,
} from './libs/overrides';
import s from './styles/index.scss';

import Iframe from './overrides/Iframe';
import Anchor from './overrides/Anchor';

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();

const sanitizationConfig = {
  allowedAttributes: {
    ...insane.defaults.allowedAttributes,
    span: ['class'],
    code: ['class'],
    pre: ['class'],
    source: ['src', 'type'],
    img: ['src', 'alt', 'height', 'width', 'title', 'aria-label', 'style'],
    video: ['width', 'height', 'align', 'style', 'controls'],
    iframe: [
      'src',
      'width',
      'height',
      'frameborder',
      'gesture',
      'allow',
      'allowfullscreen',
    ],
  },
  allowedClasses: {
    div: 'narrative-table-container',
  },
  allowedTags: [
    ...insane.defaults.allowedTags,
    'video',
    'source',
    'font',
    'pre',
    'code',
    'kbd',
    'br',
    'iframe',
    'codeblock',
  ],
};

const isValidNode = function() {
  return true;
};

export interface MarkdownProps {
  className?: string;
  inline?: boolean;
  overrides?: ManyOverrideSettings;
  spacing?: 'loose' | 'tight' | 'none';
  text?: string;
}

class Markdown extends PureComponent<MarkdownProps> {
  render() {
    const {
      spacing = 'tight',
      text = '',
      className,
      overrides: userOverrides = {},
      inline = false,
    } = this.props;

    if (!text) return null;

    const spacingStyles = s[`spacing-${spacing}`];
    const classes = cx(spacingStyles, className);

    const Wrapper = inline ? 'span' : 'div';

    const overrides = Object.keys(userOverrides).map(tagName => {
      if (tagName === 'CodeBlock') {
        return createCodeBlockOverride(tagName, userOverrides[tagName]);
      }
      return createTagOverride(tagName, userOverrides[tagName]);
    });

    const processingInstructions = [
      createTagOverride('iframe', {
        component: Iframe,
      }),
      createTagOverride('a', {
        component: Anchor,
      }),
      ...overrides,
      {
        shouldProcessNode() {
          return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    // Render markdown to html
    const rawHtml = inline ? marked.inlineLexer(text, []) : marked(text);

    const html = insane(rawHtml, {
      ...sanitizationConfig,
      allowedTags: [
        ...sanitizationConfig.allowedTags,
        ...Object.keys(userOverrides).map(key => key.toLowerCase()),
      ],
    });

    // Render html to a react tree
    const react = htmlToReactParser.parseWithInstructions(
      html,
      isValidNode,
      processingInstructions
    );

    return (
      <Wrapper
        {...omitProps(Object.keys(this.props), this.props)}
        className={classes}
      >
        {react}
      </Wrapper>
    );
  }
}

export default Markdown;
