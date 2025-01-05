/* eslint-disable gamut/no-css-standalone */
import './styles/_vds-variables.scss';

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster, Track, TrackProps } from '@vidstack/react';
import { ThumbnailSrc } from '@vidstack/react/types/vidstack';
import cx from 'classnames';
import * as React from 'react';
import { useState } from 'react';

import { useIsMounted } from '../utils';
import { VideoLayout } from './lib/VideoLayout';
import styles from './styles/index.module.scss';

export type VideoPlayerProps = {
  autoplay?: boolean;
  className?: string;
  controls?: boolean;
  height?: number;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: (player: any) => void;
  placeholderImage?: string;
  videoTitle?: string;
  videoUrl: string;
  width?: number;
  textTracks: TrackProps[];
  thumbnails?: ThumbnailSrc;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  autoplay = false,
  className,
  controls = false,
  loop = false,
  muted = false,
  onPlay,
  onReady,
  placeholderImage,
  videoTitle,
  videoUrl,
  textTracks,
  thumbnails
}) => {
  const [loading, setLoading] = useState(true);
  const [adActive, setAdActive] = useState(false);
  const player = React.useRef<MediaPlayerInstance>(null);
  const isMounted = useIsMounted();

  return (
    <div
      className={cx(styles.videoWrapper, loading && styles.loading, className)}
    >
      {isMounted && (
        <MediaPlayer
          title={videoTitle}
          src={videoUrl} 
          playsInline
          ref={player}
          aspectRatio='16:9'
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          onLoad={() => setLoading(false)}
          onPlay={onPlay}
          onCanPlay={onReady}
        >
          <MediaProvider>
            <Poster
              className="vds-poster"
              src={placeholderImage || null}
            />
            {textTracks?.map((track) => (
              <Track {...track} key={track.src} />
            ))}
          </MediaProvider>
          <VideoLayout
            controls={controls}
            thumbnails={thumbnails}
            adActive={adActive}
            setAdActive={setAdActive}
          />
        </MediaPlayer>
      )}
    </div>
  );
};
