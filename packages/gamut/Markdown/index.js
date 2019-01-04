import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown/with-html';

import loose from './styles/theme-loose.scss';
import tight from './styles/theme-tight.scss';
import rendererStyles from './styles/renderer.scss';

const themes = {
  loose,
  tight,
  none: {},
};

const renderIframe = element => {
  const { props } = element;
  if (props.src && props.src.match(/youtu(be\.com|\.be)/)) {
    return <div className={rendererStyles.youtubeVideoWrapper}>{element}</div>;
  }
  return element;
};

const RENDERERS = {
  parsedHtml: props => {
    if (props.element.type === 'iframe') {
      return renderIframe(props.element);
    }
    return props.element;
  },
};

class Markdown extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(['loose', 'tight', 'none']),
    escapeHtml: PropTypes.bool,
    className: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const {
      theme = 'tight',
      text,
      escapeHtml = false,
      className,
      ...rest
    } = this.props;
    const themeStyles = themes[theme];
    const classes = cx(themeStyles.theme, className);
    console.log(escapeHtml);
    return (
      <div>
        <ReactMarkdown
          className={classes}
          source={text}
          renderers={RENDERERS}
          skipHtml={false}
          escapeHtml={escapeHtml}
          // astPlugins={[parseHtml]}
        />
      </div>
    );
  }
}

export default Markdown;
