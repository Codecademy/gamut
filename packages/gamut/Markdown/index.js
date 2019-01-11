import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MarkdownJSX from 'markdown-to-jsx';

import loose from './styles/theme-loose.scss';
import tight from './styles/theme-tight.scss';

import Iframe from './overrides/Iframe';

const CODE_BLOCK_FENCED = /(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)*/gim;

// Makes sure there is a leading newline on fenced code blocks
const ensureCodeBlockSpacing = str => str.replace(CODE_BLOCK_FENCED, '\n$&\n');

const themes = {
  loose,
  tight,
  none: {},
};

class Markdown extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(['loose', 'tight', 'none']),
    overrides: PropTypes.object,
    className: PropTypes.string,
    inline: PropTypes.bool,
    text: PropTypes.string,
  };

  render() {
    const {
      theme = 'tight',
      text = '',
      className,
      inline = false,
      overrides: userOverrides,
    } = this.props;

    const themeStyles = themes[theme];
    const classes = cx(themeStyles.theme, className);

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
