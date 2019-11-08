import React, { PureComponent } from 'react';
import cx from 'classnames';
import marked from 'marked';
import insane from 'insane';
import HtmlToReact from 'html-to-react';
import omitProps from '../utils/omitProps';
import {
  createTagOverride,
  createCodeBlockOverride,
  ManyOverrideSettings,
  standardOverrides,
} from './libs/overrides';
import defaultSanitizationConfig from './libs/sanitizationConfig';
import { createPreprocessingInstructions } from './libs/preprocessing';
import s from './styles/index.scss';
import Iframe from './libs/overrides/Iframe';
import Anchor from './libs/overrides/Anchor';
import Table from './libs/overrides/Table';

const htmlToReactParser = new HtmlToReact.Parser({
  xmlMode: true,
});

export const preprocessingInstructions = createPreprocessingInstructions(s);

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

export class Markdown extends PureComponent<MarkdownProps> {
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
      createTagOverride('table', {
        component: props => (
          <Table maxHeight={spacing === 'tight' ? 180 : 500} {...props} />
        ),
        allowedAttributes: ['style'],
      }),
      ...overrides,
      ...standardOverrides,
    ];

    const markedOptions = {
      smartypants: true,
    };

    // Render markdown to html
    const rawHtml = inline
      ? marked.inlineLexer(text, [], markedOptions)
      : marked(text, markedOptions);

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
      processingInstructions,
      preprocessingInstructions
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
