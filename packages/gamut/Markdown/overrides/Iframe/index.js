import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.scss';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
};

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
    return (
      <div
        className={s.youtubeVideoWrapper}
        data-testid="yt-iframe"
        style={wrapperStyles}
      >
        <iframe {...props} />
      </div>
    );
  }
  return <iframe {...props} />;
};

Iframe.propTypes = propTypes;

export default Iframe;
