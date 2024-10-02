import { PlayIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import cx from 'classnames';
import { useState } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';

import { useIsMounted } from '../utils';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';

const OverlayPlayButton = ({ videoTitle }: { videoTitle?: string }) => {
  return (
    <div
      className={styles.overlay}
      role="button"
      aria-label={`play video${videoTitle ? `: ${videoTitle}` : ''}`}
    >
      <PlayIcon className={styles.hoverButton} />
    </div>
  );
};

/**
 * @remarks ReactPlayer has optional key 'wrapper' that we require for the onReady callback
 */

const YOUTUBE_PATTERN = /youtu(be\.com|\.be)/;
const VIMEO_PATTERN = /player\.vimeo\.com/;

export type ReactPlayerWithWrapper = ReactPlayer & { wrapper: HTMLElement };

export type VideoProps = {
  autoplay?: boolean;
  className?: string;
  controls?: boolean;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: (player: ReactPlayerWithWrapper) => void;
  placeholderImage?: string | boolean;
  videoTitle?: string;
  videoUrl: string;
  width?: number;
};

export const Video: React.FC<VideoProps> = ({
  autoplay,
  className,
  controls,
  height,
  loop,
  muted,
  onPlay,
  onReady,
  placeholderImage,
  videoTitle,
  videoUrl,
  width,
}) => {
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();

  const config = {
    youtube: {
      playerVars: { color: 'white' },
    },
    vimeo: {
      title: videoTitle,
    },
  };

  return (
    <div
      className={cx(styles.videoWrapper, loading && styles.loading, className)}
    >
      {isMounted ? (
        <ReactPlayer
          className={styles.iframe}
          config={config}
          controls={controls === undefined ? true : controls}
          height={height}
          light={placeholderImage}
          loop={loop}
          muted={muted}
          playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
          playing={autoplay}
          title={videoTitle}
          url={videoUrl}
          width={width}
          onReady={(player: ReactPlayerWithWrapper) => {
            onReady?.(player);
            setLoading(false);
          }}
          onPlay={onPlay}
        />
      ) : null}
    </div>
  );
};
