/* eslint-disable jsx-a11y/iframe-has-title */
import { HTMLAttributes } from 'react';

import { Video } from '../../../../Video';
// eslint-disable-next-line gamut/no-css-standalone

export interface MarkdownVideoProps extends HTMLAttributes<HTMLVideoElement> {}

export const MarkdownVideo: React.FC<MarkdownVideoProps> = ({
  src,
  title,
  ...rest
}) => {
  /// pass the props we want to the Video components, or else, render it the way it is

  return <Video videoUrl={src} videoTitle={title} />;
};
