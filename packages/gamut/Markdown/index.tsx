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

const htmlToReactParser = new HtmlToReact.Parser({
  xmlMode: true,
});
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();

const defaultSanitizationConfig = {
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

const processText = (text: string) => {
  // Replace &mdash; due to legacy markdown that didn't use smart dashes
  return text.replace('&mdash;', '--');
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

    const markedOptions = {
      smartypants: true,
    };

    const processedText = processText(text);

    // Render markdown to html
    const rawHtml = inline
      ? marked.inlineLexer(processedText, [], markedOptions)
      : marked(processedText, markedOptions);

    const sanitizationConfig = {
      ...defaultSanitizationConfig,
      allowedTags: [
        ...defaultSanitizationConfig.allowedTags,
        ...Object.keys(userOverrides).map(tagName => tagName.toLowerCase()),
      ],
      allowedAttributes: {
        ...defaultSanitizationConfig.allowedAttributes,
        ...Object.keys(userOverrides).reduce((acc, tagName) => {
          return {
            ...acc,
            [tagName.toLowerCase()]: (
              userOverrides[tagName].allowedAttributes || []
            ).map(attr => attr.toLowerCase()),
          };
        }, {}),
      },
    };

    const html = insane(rawHtml, sanitizationConfig);

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
