import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import marked from 'marked';
import HtmlToReact from 'html-to-react';
import insane from 'insane';
import omitProps from '../utils/omitProps';
import {
  createTagOverride,
  createCodeBlockOverride,
  OverrideSettings,
} from './libs/overrides';
import s from './styles/index.scss';

import Iframe from './overrides/Iframe';

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();

const sanitizationConfig = {
  allowedAttributes: {
    ...insane.defaults.allowedAttributes,
    '*': ['class', 'title', 'accesskey'],
    source: ['src', 'type'],
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
  allowedClasses: ['narrative-table-container'],
  allowedTags: [
    ...insane.defaults.allowedTags,
    'video',
    'source',
    'pre',
    'code',
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
  overrides?: OverrideSettings;
  spacing?: 'loose' | 'tight' | 'none';
  text?: string;
}

class Markdown extends PureComponent<MarkdownProps> {
  static propTypes = {
    spacing: PropTypes.oneOf(['loose', 'tight', 'none']),
    overrides: PropTypes.objectOf(
      PropTypes.shape({
        component: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.shape({
            render: PropTypes.func.isRequired,
          }),
        ]),
        props: PropTypes.object,
        shouldProcessNode: PropTypes.func,
        processNode: PropTypes.func,
      })
    ),
    className: PropTypes.string,
    inline: PropTypes.bool,
    text: PropTypes.string,
  };

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
