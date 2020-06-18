import React, { useState } from 'react';
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

export type VideoProps = {
  videoUrl: string;
  videoTitle: string;
  placeholderImage?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
};

export const Video: React.FC<VideoProps> = ({
  videoUrl,
  videoTitle,
  placeholderImage,
  autoplay,
  controls,
  loop,
  muted,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={cx([
        styles.videoWrapper,
        { [styles.loading]: loading },
        className,
      ])}
    >
      <ReactPlayer
        url={videoUrl}
        light={placeholderImage}
        title={videoTitle}
        playing={autoplay}
        className={styles.iframe}
        controls={controls}
        loop={loop}
        muted={muted}
        playIcon={<OverlayPlayButton />}
        onReady={() => setLoading(false)}
      />
    </div>
  );
};

Video.defaultProps = {
  controls: true,
};

export default Video;
