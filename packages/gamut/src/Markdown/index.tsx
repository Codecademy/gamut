import styled from '@emotion/styled';
import cx from 'classnames';
import HtmlToReact from 'html-to-react';
import { marked } from 'marked';
import { PureComponent } from 'react';
import * as React from 'react';
import sanitizeMarkdown from 'sanitize-markdown';

import { omitProps } from '../utils/omitProps';
import {
  createCodeBlockOverride,
  createInputOverride,
  createTagOverride,
  createVideoOverride,
  MarkdownOverrideSettings,
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
import { MarkdownVideo } from './libs/overrides/Video';
import { createPreprocessingInstructions } from './libs/preprocessing';
import { defaultSanitizationConfig } from './libs/sanitizationConfig';
import { markdownStyles } from './styles';

const htmlToReactParser = HtmlToReact.Parser({
  xmlMode: true,
});

const preprocessingInstructions = createPreprocessingInstructions();

const isValidNode = () => true;

const MarkdownWrapper = styled.div<{ spacing: 'loose' | 'tight' | 'none' }>`
  ${({ theme, spacing }) => {
    const spacingStyleFunction = markdownStyles[spacing];
    return spacingStyleFunction ? spacingStyleFunction(theme) : '';
  }}
`;

export type SkipDefaultOverridesSettings = {
  a?: boolean;
  checkbox?: boolean;
  details?: boolean;
  iframe?: boolean;
  table?: boolean;
  video?: boolean;
};

export type MarkdownProps = {
  className?: string;
  inline?: boolean;
  overrides?: MarkdownOverrideSettings;
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

    const overrides = Object.keys(userOverrides).map((tagName) => {
      if (tagName === 'CodeBlock') {
        return createCodeBlockOverride(tagName, userOverrides[tagName]);
      }
      return createTagOverride(tagName, userOverrides[tagName]);
    });

    const processingInstructions = [
      ...overrides,
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
            const { key: elementKey, ...rest } =
              props as MarkdownAnchorProps & { key?: React.Key };
            return (
              <MarkdownAnchor
                key={elementKey}
                onClick={onAnchorClick}
                {...rest}
              />
            );
          },
        }),
      !skipDefaultOverrides.table &&
        createTagOverride('table', {
          component: Table,
          allowedAttributes: ['style'],
        }),
      !skipDefaultOverrides.video &&
        createVideoOverride('video', {
          component: MarkdownVideo,
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
      ...standardOverrides,
    ].filter(Boolean);

    const markedOptions = {
      smartypants: true,
      headerIds,
      headerPrefix: 'heading-',
      mangle: false,
    };

    // Render markdown to html
    const rawHtml = inline
      ? marked.parseInline(text, markedOptions)
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
      <MarkdownWrapper
        as={inline ? 'span' : 'div'}
        {...omitProps(Object.keys(this.props), this.props)}
        className={cx(className)}
        spacing={spacing}
      >
        {react}
      </MarkdownWrapper>
    );
  }
}

export type {
  MarkdownOverrideSetting,
  MarkdownOverrideSettings,
} from './libs/overrides';
