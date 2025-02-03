import { PlayIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { PlayerSrc, TrackProps } from '@vidstack/react';
import {
  DefaultLayoutTranslations,
  ThumbnailSrc,
} from '@vidstack/react/types/vidstack';
import * as React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';

import { Box, FlexBox } from '../Box';
import { useIsMounted } from '../utils';
import { VidstackPlayer } from './lib/Player';
// eslint-disable-next-line gamut/no-css-standalone

const ReactVideoPlayer = styled(ReactPlayer)`
  width: 100% !important;
  height: 100% !important;
  border: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  & :focus-visible {
    outline-offset: 3px;
  }
  video::-webkit-media-controls-panel {
    background-image: linear-gradient(
      transparent 15%,
      ${theme.colors['navy-900']} 55%
    );
  }
`;

const OverlayPlayButton = ({ videoTitle }: { videoTitle?: string }) => {
  return (
    <FlexBox
      role="button"
      aria-label={`play video${videoTitle ? `: ${videoTitle}` : ''}`}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      color="white"
      width="100%"
      height="100%"
      opacity="0.5"
      bg="black"
    >
      <PlayIcon minWidth="75px" minHeight="75px" color="white" />
    </FlexBox>
  );
};

/**
 * @remarks ReactPlayer has optional key 'wrapper' that we require for the onReady callback
 */

export type ReactPlayerWithWrapper = ReactPlayer & { wrapper: HTMLElement };

export type VideoProps = {
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onReady?: (player?: ReactPlayerWithWrapper) => void;
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
   * Determines if an embedded player view is shown for youtube/vimeo.
   */
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

  /**
   * If showPlayerEmbed is true and Video Url is a string, use ReactPlayer to render the video
   * Otherwise, use the Vidstack MediaPlayer. This is because currently vidstack player has an issue with
   * youtube iframe embeds where it keeps pausing (only in case if yt iframe is used i.e with native yt controls)
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
            height={height}
            light={placeholderImage}
            loop={loop}
            muted={muted}
            playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
            playing={autoplay}
            title={videoTitle}
            url={videoUrl as BaseReactPlayerProps['url']}
            width={width}
            onReady={(player: ReactPlayerWithWrapper) => {
              onReady?.(player);
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
