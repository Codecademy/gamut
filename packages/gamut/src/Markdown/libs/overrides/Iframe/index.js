/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import s from './styles.scss';
const Iframe = props => {
  if (props.src && props.src.match(/youtu(be\.com|\.be)/)) {
    const { width = 16, height = 9 } = props;
    const ratioPadding = (
      (Math.round(height) / Math.round(width)) *
      100
    ).toFixed(2);
    const wrapperStyles = {
      paddingBottom: `${ratioPadding}%`,
    };
    return React.createElement(
      'div',
      {
        className: s.youtubeVideoWrapper,
        'data-testid': 'yt-iframe',
        style: wrapperStyles,
      },
      React.createElement('iframe', Object.assign({}, props))
    );
  }
  return React.createElement('iframe', Object.assign({}, props));
};
export default Iframe;
//# sourceMappingURL=index.js.map
