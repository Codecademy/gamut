/* eslint-disable jsx-a11y/iframe-has-title */
import { FunctionComponent, HTMLAttributes } from 'react';

import { Video } from '../../../../Video';
// eslint-disable-next-line gamut/no-css-standalone

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
    return (
      <Video
        height={props?.height}
        width={props?.width}
        videoUrl={props?.src}
        videoTitle={props?.title}
      />
    );
  }

  return <iframe {...props} />;
};
