import { PlayIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import styles from './styles/index.module.scss';

const OverlayPlayButton = () => {
  return (
    <div className={styles.overlay}>
      <PlayIcon className={styles.hoverButton} />
    </div>
  );
};

/**
 * @remarks ReactPlayer has optional key 'wrapper' that we require for the onReady callback
 */

export type ReactPlayerWithWrapper = ReactPlayer & { wrapper: HTMLElement };

export type VideoProps = {
  videoUrl: string;
  videoTitle?: string;
  placeholderImage?: string | boolean;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  onReady?: (player: ReactPlayerWithWrapper) => void;
  onPlay?: () => void;
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
  onReady,
  onPlay,
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={cx(styles.videoWrapper, loading && styles.loading, className)}
    >
      <ReactPlayer
        url={videoUrl}
        light={placeholderImage}
        title={videoTitle}
        playing={autoplay}
        className={styles.iframe}
        controls={controls === undefined ? true : controls}
        loop={loop}
        muted={muted}
        playIcon={<OverlayPlayButton />}
        onReady={(player: ReactPlayerWithWrapper) => {
          onReady?.(player);
          setLoading(false);
        }}
        onPlay={onPlay}
      />
    </div>
  );
};
