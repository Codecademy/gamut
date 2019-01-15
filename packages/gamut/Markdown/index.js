import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MarkdownJSX from 'markdown-to-jsx';
import TextBlock from '../TextBlock';

import Iframe from './overrides/Iframe';

const CODE_BLOCK_FENCED = /(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)*/gim;

// Makes sure there is a leading newline on fenced code blocks
const ensureCodeBlockSpacing = str => str.replace(CODE_BLOCK_FENCED, '\n$&\n');

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
      overrides: userOverrides,
    } = this.props;

    const options = {
      overrides: {
        iframe: Iframe,
        ...userOverrides,
      },
      forceBlock: !inline,
      forceInline: inline,
    };

    return (
      <TextBlock className={className} spacing={spacing}>
        <MarkdownJSX options={options}>
          {ensureCodeBlockSpacing(text)}
        </MarkdownJSX>
      </TextBlock>
    );
  }
}

export default Markdown;
