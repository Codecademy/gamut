import { PlayIcon } from '@codecademy/gamut-icons';
import { PlayerSrc, TrackProps } from '@vidstack/react';
import {
  DefaultLayoutTranslations,
  ThumbnailSrc,
} from '@vidstack/react/types/vidstack';
import cx from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { useIsMounted } from '../utils';
import { VidstackPlayer } from './lib/Player';
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
  autoplay?: boolean;
  className?: string;
  controls?: boolean;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: (player?: ReactPlayerWithWrapper) => void;
  placeholderImage?: string | boolean;
  videoTitle?: string;
  videoUrl: PlayerSrc;
  width?: number;
  textTracks?: TrackProps[];
  thumbnails?: ThumbnailSrc;
  translations?: Partial<DefaultLayoutTranslations>;
  showPlayerEmbed?: boolean;
};

export const Video: React.FC<VideoProps> = ({
  autoplay = false,
  className,
  controls = true,
  height,
  loop = false,
  muted = false,
  onPlay,
  onReady,
  placeholderImage,
  videoTitle,
  videoUrl,
  width,
  textTracks,
  thumbnails,
  translations,
  showPlayerEmbed,
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

  const hasExternallyHostedVideoAndEmbedEnabled =
    videoUrl &&
    typeof videoUrl === 'string' &&
    showPlayerEmbed &&
    (videoUrl.match(/youtu(be\.com|\.be)/) || videoUrl.match(/vimeo.com/));

  /**
   * If the video is externally hosted and showPlayerEmbed is true, use ReactPlayer to render the video
   * Otherwise, use the Vidstack MediaPlayer. This is because currently vidstack player has an issue with
   * youtube iframe embeds where it keeps pausing (only in case if yt iframe is used i.e with native yt controls)
   */
  if (hasExternallyHostedVideoAndEmbedEnabled) {
    return (
      <div
        className={cx(
          styles.videoWrapper,
          loading && styles.loading,
          className
        )}
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
  }

  return (
    <>
      {isMounted && (
        <VidstackPlayer
          autoplay={autoplay}
          controls={controls}
          loop={loop}
          muted={muted}
          onPlay={onPlay}
          onReady={onReady}
          placeholderImage={placeholderImage}
          videoTitle={videoTitle}
          videoUrl={videoUrl}
          textTracks={textTracks}
          thumbnails={thumbnails}
          translations={translations}
          onLoad={() => setLoading(false)}
          width={width}
          height={height}
          className={className}
        />
      )}
    </>
  );
};
