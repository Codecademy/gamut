/* eslint-disable jsx-a11y/iframe-has-title */
import { FunctionComponent, HTMLAttributes } from 'react';

import { Video } from '../../../../Video';

export interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
  allow?: string;
  src?: string;
  title?: string;
  width?: number;
  height?: number;
  showPlayerEmbed?: boolean;
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
        showPlayerEmbed={props?.showPlayerEmbed}
      />
    );
  }

  return <iframe {...props} />;
};
