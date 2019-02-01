import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import marked from 'marked';
import HtmlToReact from 'html-to-react';
import omitProps from '../utils/omitProps';
import { createTagOverride, createCodeBlockOverride } from './libs/overrides';
import s from './styles';

import Iframe from './overrides/Iframe';

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();

const isValidNode = function() {
  return true;
};

class Markdown extends PureComponent {
  static propTypes = {
    spacing: PropTypes.oneOf(['loose', 'tight', 'none']),
    overrides: PropTypes.object,
    instructions: PropTypes.array,
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
      instructions = [],
      inline = false,
    } = this.props;

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
      createTagOverride('iframe', Iframe),
      ...overrides,
      ...instructions,
      {
        shouldProcessNode() {
          return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    // Render markdown to html
    const html = marked(text);

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
