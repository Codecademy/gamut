import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import SimpleMarkdown from 'simple-markdown';

import loose from './styles/theme-loose.scss';
import tight from './styles/theme-tight.scss';

import defaultRules from './rules';

const themes = {
  loose,
  tight,
  none: {},
};

class Markdown extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(['loose', 'tight', 'none']),
    rules: PropTypes.object,
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
      rules: userRules,
    } = this.props;

    const themeStyles = themes[theme];
    const classes = cx(themeStyles.theme, className);

    const rules = {
      ...defaultRules,
      ...userRules,
    };

    const rawBuiltParser = SimpleMarkdown.parserFor(rules);
    const parse = function(rawSource) {
      const source = `${rawSource}${inline ? '' : '\n\n'}`;
      return rawBuiltParser(source, { inline: Boolean(inline) });
    };
    const reactOutput = SimpleMarkdown.reactFor(
      SimpleMarkdown.ruleOutput(rules, 'react')
    );
    const syntaxTree = parse(text);
    const output = reactOutput(syntaxTree);
    console.log(output);
    return output;
    // return (
    //   <MarkdownJSX className={classes} options={options}>
    //     {text}
    //   </MarkdownJSX>
    // );
  }
}

export default Markdown;
