import { PlayerSrc, TrackProps } from '@vidstack/react';
import {
  DefaultLayoutTranslations,
  ThumbnailSrc,
} from '@vidstack/react/types/vidstack';
import * as React from 'react';
import { useState } from 'react';
import { BaseReactPlayerProps } from 'react-player/base';

import { Box } from '../Box';
import { useIsMounted } from '../utils';
import { OverlayPlayButton, ReactVideoPlayer } from './lib/ReactPlayer';
import { VidstackPlayer } from './lib/VidstackPlayer';

export type VideoProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: () => void;
  width?: number;
  height?: number;
  videoTitle?: string;
  controls?: boolean;
  /**
   * Placeholder image for a poster/thumbnail.
   */
  placeholderImage?: string | boolean;
  /**
   * The main source for the video file or streaming URL.
   * @example
   * <Video videoUrl='https://example.com/video.mp4' />
   * Or with type
   * <Video videoUrl={{ src: 'https://example.com/video.mp4', type: 'video/mp4' }} />
   */
  videoUrl: PlayerSrc;
  /**
   * Optional text track data (subtitles, captions or chapters).
   * @example
   * <Video textTracks={[{ label: 'English', src: '/eng.vtt', kind: 'subtitles', language: 'en-US', }]} />
   *
   * @see https://vidstack.io/docs/player/api/text-tracks/?styling=default-theme#managing-tracks
   */
  textTracks?: TrackProps[];
  /**
   * Preview images for different time segments.
   */
  thumbnails?: ThumbnailSrc;
  /**
   * Translations for the player's default layout labels.
   * @example
   * <Video translations={{ Play: 'Play Video' }} />
   */
  translations?: Partial<DefaultLayoutTranslations>;
  /**
   * @TEMPORARY
   * Determines if an embedded player view is shown.
   */
  showPlayerEmbed?: boolean;
  /**
   * Determines if the default provider/browser controls are shown.
   */
  showDefaultProviderControls?: boolean;
};

export const Video: React.FC<VideoProps> = (props) => {
  const {
    autoplay = false,
    className,
    controls = true,
    loop = false,
    muted = false,
    onPlay,
    onReady,
    placeholderImage,
    videoTitle,
    videoUrl,
    showPlayerEmbed,
  } = props;
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

  /**
   * If showPlayerEmbed is true use ReactPlayer to render the video
   * Otherwise, use the Vidstack MediaPlayer. @TEMPORARY_FALLBACK
   * @TODO [https://skillsoftdev.atlassian.net/browse/GM-998]
   * Remove ReactPlayer once Vidstack is validated.
   */
  if (showPlayerEmbed) {
    return (
      <Box
        position="relative"
        width="100%"
        pt={'56.25%' as any}
        borderRadius="md"
        overflow="hidden"
        bg={loading ? 'black' : undefined}
        className={className}
      >
        {isMounted ? (
          <ReactVideoPlayer
            config={config}
            controls={controls === undefined ? true : controls}
            light={placeholderImage}
            loop={loop}
            muted={muted}
            playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
            playing={autoplay}
            title={videoTitle}
            url={videoUrl as BaseReactPlayerProps['url']}
            height="100%"
            width="100%"
            onReady={() => {
              onReady?.();
              setLoading(false);
            }}
            onPlay={onPlay}
          />
        ) : null}
      </Box>
    );
  }

  return (
    <>
      {isMounted && (
        <VidstackPlayer {...props} onLoad={() => setLoading(false)} />
      )}
    </>
  );
};
