/* eslint-disable jsx-a11y/iframe-has-title */
import { FunctionComponent, HTMLAttributes } from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  src?: string;
  title?: string;
  width?: number;
  height?: number;
}

const YOUTUBE_PATTERN = /youtu(be\.com|\.be)/;
const VIMEO_PATTERN = /player\.vimeo\.com/;

export const Iframe: FunctionComponent<IframeProps> = (props) => {
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
        className={styles.youtubeVideoWrapper}
        data-testid="yt-iframe"
        style={wrapperStyles}
      >
        <iframe {...props} />
      </div>
    );
  }
  return <iframe {...props} />;
};
