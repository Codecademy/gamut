import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MarkdownJSX from 'markdown-to-jsx';
import omitProps from '../utils/omitProps';
import s from './styles';

import Iframe from './overrides/Iframe';
import Pre from './overrides/Pre';
import Code from './overrides/Code';

const CODE_BLOCK_FENCED = /(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)*/gim;
// Matches html tags and self closing tags that aren't inline
const BLOCK_HTML_TAGS = /(?<=\n)<\/?([a-z][a-z0-9:]*)?(?:\s+((?:<.*?>|[^>])*))?\/?>/gi;
// Matches html tags and self closing tags that start inline but have significant whitespace (newlines)
const BROKEN_BLOCK_HTML_TAGS = /(?<!\n)<([A-Za-z][^ >/]*) ?([^>]*)\/{0}>\n+(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/gi;
const EXTRA_NEWLINES = /\n{2,}/g;

/**
 * 1. Add extra newlines before and after html tags
 *    - This fixes a rendering issue where HTML starting on a line
 *      with other text will not render correctly
 * 2. Add newlines before and after fenced code blocks
 *    - This fixes a rendering issue when a fenced codeblock doesn't
 *      have the required starting and ending newlines
 * 3. Remove excessive newlines and replaces it with 2 newlines
 *    - This fixes a rendering issue inside of html code blocks
 *      where markdown inside of a codeblock was treated as html
 */
const cleanupMarkdownFormatting = str =>
  str
    .replace(BLOCK_HTML_TAGS, '\n\n$&\n\n')
    .replace(BROKEN_BLOCK_HTML_TAGS, '\n\n$&\n\n')
    .replace(CODE_BLOCK_FENCED, '\n$&\n')
    .replace(EXTRA_NEWLINES, '\n\n');

class Markdown extends PureComponent {
  static propTypes = {
    spacing: PropTypes.oneOf(['loose', 'tight', 'none']),
    overrides: PropTypes.object,
    className: PropTypes.string,
    inline: PropTypes.bool,
    text: PropTypes.string,
  };

  render() {
    const {
      spacing = 'tight',
      text = '',
      className,
      inline = false,
      overrides: userOverrides = {},
    } = this.props;

    const spacingStyles = s[`spacing-${spacing}`];
    const classes = cx(spacingStyles, className);

    const defaultOverrides = {
      iframe: Iframe,
      pre: {
        component: Pre,
        props: {
          // User overrides are used in pre to determine
          // how to render Code blocks
          overrides: userOverrides,
        },
      },
      code: Code,
    };

    const options = {
      overrides: {
        ...defaultOverrides,
        ...userOverrides,
      },
      forceBlock: !inline,
      forceInline: inline,
    };

    const Wrapper = inline ? 'span' : 'div';

    return (
      <Wrapper
        {...omitProps(Object.keys(this.props), this.props)}
        className={classes}
      >
        <MarkdownJSX options={options}>
          {cleanupMarkdownFormatting(text)}
        </MarkdownJSX>
      </Wrapper>
    );
  }
}

export default Markdown;
