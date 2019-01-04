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
    const width = props.width || 16;
    const height = props.height || 9;
    const ratioPadding = (
      (Math.round(height) / Math.round(width)) *
      100
    ).toFixed(2);
    const wrapperStyles = {
      paddingBottom: `${ratioPadding}%`,
    };
    return (
      <div className={rendererStyles.youtubeVideoWrapper} style={wrapperStyles}>
        {element}
      </div>
    );
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
    renderers: PropTypes.object,
  };

  render() {
    const {
      theme = 'tight',
      text,
      escapeHtml = false,
      className,
      renderers,
    } = this.props;
    const themeStyles = themes[theme];
    const classes = cx(themeStyles.theme, className);
    const allRenderers = { ...RENDERERS, ...renderers };
    return (
      <ReactMarkdown
        className={classes}
        source={text}
        renderers={allRenderers}
        escapeHtml={escapeHtml}
      />
    );
  }
}

export default Markdown;
