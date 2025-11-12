/* eslint-disable jsx-a11y/iframe-has-title */
import { TrackProps } from '@vidstack/react';
import { DetailedHTMLProps, VideoHTMLAttributes } from 'react';

import { Video } from '../../../../Video';
// eslint-disable-next-line gamut/no-css-standalone

export type MarkdownVideoProps = DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> & {
  textTracks?: TrackProps[];
  showPlayerEmbed?: boolean;
};

export const MarkdownVideo: React.FC<MarkdownVideoProps> = (props) => {
  if (props?.src) {
    // Sanitize the props to pass to the Video component
    const videoProps = {
      autoplay: props?.autoPlay,
      controls: props?.controls,
      height: Number(props?.height),
      loop: props?.loop,
      muted: props?.muted,
      videoTitle: props?.title,
      videoUrl: props?.src,
      width: Number(props?.width),
      textTracks: props?.textTracks,
      showPlayerEmbed: props?.showPlayerEmbed,
    };

    return <Video {...videoProps} />;
  }
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video {...props} />;
};
