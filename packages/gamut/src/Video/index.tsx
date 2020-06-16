import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import PlayIcon from '../Icon/icons/PlayIcon';
import cx from 'classnames';
import styles from './styles/index.module.scss';

/** render the play button with an overlay */
const OverlayPlayButton = () => {
  return (
    <div className={styles.overlay}>
      <PlayIcon className={styles.hoverButton} />
    </div>
  );
};

type ContentfulAsset = {
  id: string;
  content_type?: string;
  title: string;
  url: string;
};
export type VideoProps = {
  videoUrl: string;
  videoTitle: string;
  placeholderImage?: ContentfulAsset;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  componentStyle?: string;
};

export const Video: React.FC<VideoProps> = ({
  videoUrl,
  videoTitle,
  placeholderImage,
  autoplay,
  controls,
  loop,
  muted,
  componentStyle,
}) => {
  const videoWrapper = useRef<HTMLDivElement>(null);
  const checkUrl = (url: string) => {
    if (url.length === 11) {
      url = `https://www.youtube.com/watch?v=${url}`;
    }
    return url;
  };
  /**
   * handle when the video loads; do it this way so we don't have a white flash
   * when the video loads and we remove the loading BG
   **/
  const clearBackground = () => {
    const el = videoWrapper.current;
    if (!el) {
      return;
    }
    el.className = cx([styles.videoWrapper, componentStyle]);
  };
  return (
    <div
      ref={videoWrapper}
      className={cx([styles.videoWrapper, styles.loading, componentStyle])}
    >
      <ReactPlayer
        url={checkUrl(videoUrl)}
        light={placeholderImage?.url}
        title={videoTitle}
        playing={autoplay}
        className={styles.iframe}
        controls={controls}
        loop={loop}
        muted={muted}
        playIcon={<OverlayPlayButton />}
        onReady={() => window.setTimeout(() => clearBackground(), 500)}
      />
    </div>
  );
};

Video.defaultProps = {
  controls: true,
};

export default Video;
