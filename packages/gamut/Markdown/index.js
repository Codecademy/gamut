import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MarkdownJSX from 'markdown-to-jsx';
import s from './styles';

import Iframe from './overrides/Iframe';

const CODE_BLOCK_FENCED = /(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)*/gim;

// Makes sure there is a leading newline on fenced code blocks
const ensureCodeBlockSpacing = str => str.replace(CODE_BLOCK_FENCED, '\n$&\n');

class Markdown extends PureComponent {
  static propTypes = {
    spacing: PropTypes.oneOf(['loose', 'tight', 'none']),
    theme: PropTypes.oneOf(['light', 'dark']),
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

    const spacingStyles = s[`spacing-${spacing}`];
    const classes = cx(spacingStyles, className);

    const options = {
      overrides: {
        iframe: Iframe,
        ...userOverrides,
      },
      forceBlock: !inline,
      forceInline: inline,
    };

    return (
      <MarkdownJSX className={classes} options={options}>
        {ensureCodeBlockSpacing(text)}
      </MarkdownJSX>
    );
  }
}

export default Markdown;
