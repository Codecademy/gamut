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
   * Determines if ReactPlayer is used to render youtube/vimeo videos.
   * @default true
   */
  showPlayerEmbed?: boolean;
  /**
   * Determines if the default provider/browser controls are shown.
   * @default false
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
    showPlayerEmbed = true,
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

  const isExternallyHostedVideoUrl = (url: string): boolean =>
    !!(url.match(/youtu(be\.com|\.be)/) || url.match(/vimeo\.com/));

  const isExternallyHostedVideo = (videoUrl: PlayerSrc): boolean => {
    if (!videoUrl) return false;

    if (typeof videoUrl === 'string') {
      return isExternallyHostedVideoUrl(videoUrl);
    }

    if (Array.isArray(videoUrl)) {
      return videoUrl.some(
        (url) => typeof url === 'string' && isExternallyHostedVideoUrl(url)
      );
    }

    return false;
  };

  // TextTracks can also have chapters/descriptions/metadata, So we need to specifically check for subtitles/captions
  const hasTracksWithCaptionOrSubtitle =
    props.textTracks?.length &&
    props.textTracks.some(
      (track) => track.kind === 'subtitles' || track.kind === 'captions'
    );

  /**
   * Render ReactPlayer if video is from youtube/vimeo and has no tracks with caption/subtitle.
   * Otherwise, use the Vidstack MediaPlayer.
   * @TODO [https://skillsoftdev.atlassian.net/browse/GM-998]
   * Remove ReactPlayer once Vidstack is validated.
   */
  if (
    isExternallyHostedVideo(videoUrl) &&
    !hasTracksWithCaptionOrSubtitle &&
    showPlayerEmbed
  ) {
    return (
      <Box
        bg={loading ? 'black' : undefined}
        borderRadius="md"
        className={className}
        overflow="hidden"
        position="relative"
        pt={'56.25%' as any}
        width="100%"
      >
        {isMounted ? (
          <ReactVideoPlayer
            config={config}
            controls={controls === undefined ? true : controls}
            height="100%"
            light={placeholderImage}
            loop={loop}
            muted={muted}
            playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
            playing={autoplay}
            title={videoTitle}
            url={videoUrl as BaseReactPlayerProps['url']}
            width="100%"
            onPlay={onPlay}
            onReady={() => {
              onReady?.();
              setLoading(false);
            }}
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
