/* eslint-disable jsx-a11y/iframe-has-title */
import React, { HTMLAttributes, FunctionComponent } from 'react';
import s from './styles.module.scss';

export interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  src?: string;
  title?: string;
  width?: number;
  height?: number;
}

const Iframe: FunctionComponent<IframeProps> = (props) => {
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

export default Iframe;
