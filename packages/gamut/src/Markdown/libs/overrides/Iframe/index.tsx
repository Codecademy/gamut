/* eslint-disable jsx-a11y/iframe-has-title */
import React, { HTMLAttributes, FunctionComponent } from 'react';
import s from './styles.module.scss';

export interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  src?: string;
  title?: string;
  width?: number;
  height?: number;
}

const YOUTUBE_PATTERN = /youtu(be\.com|\.be)/;
const VIMEO_PATTERN = /player\.vimeo\.com/;

const Iframe: FunctionComponent<IframeProps> = (props) => {
  if (
    props.src &&
    [YOUTUBE_PATTERN, VIMEO_PATTERN].some((pattern) => pattern.test(props.src!))
  ) {
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
