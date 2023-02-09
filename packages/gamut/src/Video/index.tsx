import { PlayIcon } from '@codecademy/gamut-icons';
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
  const isMounted = useIsMounted();
  return (
    <div
      className={cx(styles.videoWrapper, loading && styles.loading, className)}
    >
      {isMounted ? (
        <ReactPlayer
          url={videoUrl}
          light={placeholderImage}
          title={videoTitle}
          playing={autoplay}
          className={styles.iframe}
          controls={controls === undefined ? true : controls}
          loop={loop}
          muted={muted}
          playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
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
