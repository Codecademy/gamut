import cx from 'classnames';
import HtmlToReact from 'html-to-react';
import marked from 'marked';
import { PureComponent } from 'react';
import * as React from 'react';
import sanitizeMarkdown from 'sanitize-markdown';

import { omitProps } from '../utils/omitProps';
import {
  createCodeBlockOverride,
  createInputOverride,
  createTagOverride,
  ManyOverrideSettings,
  standardOverrides,
} from './libs/overrides';
import { MarkdownCheckbox } from './libs/overrides/Checkbox';
import { Details } from './libs/overrides/Details';
import { Iframe } from './libs/overrides/Iframe';
import {
  MarkdownAnchor,
  MarkdownAnchorProps,
} from './libs/overrides/MarkdownAnchor';
import { Table } from './libs/overrides/Table';
import { createPreprocessingInstructions } from './libs/preprocessing';
import { defaultSanitizationConfig } from './libs/sanitizationConfig';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';

const htmlToReactParser = new HtmlToReact.Parser({
  xmlMode: true,
});

const preprocessingInstructions = createPreprocessingInstructions(styles);

const isValidNode = () => true;

export type SkipDefaultOverridesSettings = {
  a?: boolean;
  checkbox?: boolean;
  details?: boolean;
  iframe?: boolean;
  table?: boolean;
};

export type MarkdownProps = {
  className?: string;
  inline?: boolean;
  overrides?: ManyOverrideSettings;
  skipDefaultOverrides?: SkipDefaultOverridesSettings;
  /**
   * Enables generated header ids for H1-6 tags
   * Can generate duplicate IDs if used on separate markdown components on the same page
   */
  headerIds?: boolean;
  spacing?: 'loose' | 'tight' | 'none';
  text?: string;
  /**
   * Callback when a markdown anchor tag is clicked
   */
  onAnchorClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export class Markdown extends PureComponent<MarkdownProps> {
  render() {
    const {
      spacing = 'tight',
      text = '',
      className,
      overrides: userOverrides = {},
      skipDefaultOverrides = {},
      inline = false,
      headerIds = true,
      onAnchorClick,
    } = this.props;

    if (!text) return null;

    const spacingStyles = styles[`spacing-${spacing}`];
    const classes = cx(spacingStyles, className);

    const Wrapper = inline ? 'span' : 'div';

    const overrides = Object.keys(userOverrides).map((tagName) => {
      if (tagName === 'CodeBlock') {
        return createCodeBlockOverride(tagName, userOverrides[tagName]);
      }
      return createTagOverride(tagName, userOverrides[tagName]);
    });

    const processingInstructions = [
      !skipDefaultOverrides.iframe &&
        createTagOverride('iframe', {
          component: Iframe,
        }),
      !skipDefaultOverrides.a &&
        createTagOverride('a', {
          component: MarkdownAnchor,
          processNode: (node, props) => {
            // Note: this processNode override is necessary because wrapping this component
            // in an anonymous functional component as with the Table below causes react rendering
            // to crash with some chrome translation features.
            // See https://codecademy.atlassian.net/browse/WEB-1214
            return (
              <MarkdownAnchor
                onClick={onAnchorClick}
                {...(props as MarkdownAnchorProps)}
              />
            );
          },
        }),
      !skipDefaultOverrides.table &&
        createTagOverride('table', {
          component: Table,
          allowedAttributes: ['style'],
        }),
      !skipDefaultOverrides.details &&
        createTagOverride('details', {
          component: Details,
          allowedAttributes: ['style', 'open'],
        }),
      !skipDefaultOverrides.checkbox &&
        createInputOverride('checkbox', {
          component: MarkdownCheckbox,
        }),
      ...overrides,
      ...standardOverrides,
    ].filter(Boolean);

    const markedOptions = {
      smartypants: true,
      headerIds,
      headerPrefix: 'heading-',
    };

    // Render markdown to html
    const rawHtml = inline
      ? marked.inlineLexer(text, [], markedOptions)
      : marked(text, markedOptions);

    const sanitizationConfig = {
      ...defaultSanitizationConfig,
      allowedTags: [
        ...defaultSanitizationConfig.allowedTags,
        ...Object.keys(userOverrides).map((tagName) => tagName.toLowerCase()),
      ],
      allowedAttributes: {
        ...defaultSanitizationConfig.allowedAttributes,
        ...Object.keys(userOverrides).reduce((acc, tagName) => {
          return {
            ...acc,
            [tagName.toLowerCase()]: (
              userOverrides[tagName].allowedAttributes || []
            ).map((attr) => attr.toLowerCase()),
          };
        }, {}),
      },
    };

    const html = sanitizeMarkdown(rawHtml, sanitizationConfig);

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
