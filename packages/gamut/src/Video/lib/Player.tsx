/* eslint-disable gamut/no-css-standalone */
import '../styles/vds_base_theme.scss';

import { styledOptions } from '@codecademy/gamut-styles';
import styled, { CSSObject } from '@emotion/styled';
import {
  isYouTubeProvider,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  Poster,
  Track,
  useMediaRemote,
  useMediaState,
} from '@vidstack/react';
import React, { useRef } from 'react';

import { Box } from '../../Box';
import { VideoProps } from '..';
import { keyboardShortcuts } from './utils/constants';
import { vdsVariables } from './utils/variables';
import { VideoLayout } from './VideoLayout';

const VariableProvider = styled(Box, styledOptions(['variables']))<{
  variables?: CSSObject;
}>(({ variables }) => variables, {
  width: '100%',
  height: '100%',
  position: 'relative',
});

type VidstackPlayerProps = VideoProps & {
  onLoad: () => void;
};
export const VidstackPlayer: React.FC<VidstackPlayerProps> = ({
  autoplay,
  controls,
  loop,
  muted,
  onPlay,
  onReady,
  onLoad,
  placeholderImage,
  videoTitle,
  videoUrl,
  textTracks,
  thumbnails,
  translations,
  width,
  height,
  className,
  showDefaultProviderControls = false,
}) => {
  const player = useRef<MediaPlayerInstance>(null);
  const paused = useMediaState('paused', player);
  const mediaRemote = useMediaRemote(player);

  /**
   * !Workaround for Vidstack Youtube Provider issue with native controls!
   * (Not needed with Custom Controls i.e when controls props is not set to true in <MediaPlayer>)
   * When the provider changes or player is in waiting state, we need to force re-play the video.
   * This is because of an issue in Vidstack where Youtube videos with native controls keeps pausing.
   */
  const onProviderChange = async (provider: MediaProviderAdapter | null) => {
    if (isYouTubeProvider(provider)) {
      await provider.play();
    }
  };
  const onPlayerWaiting = () => {
    if (isYouTubeProvider(player.current?.provider) && paused) {
      mediaRemote?.togglePaused();
    }
  };

  return (
    <VariableProvider
      variables={vdsVariables}
      className={className}
      style={{ width, height }}
    >
      <MediaPlayer
        controls={showDefaultProviderControls}
        ref={player}
        title={videoTitle}
        src={videoUrl}
        playsInline
        autoPlay={autoplay}
        loop={loop}
        muted={
          autoplay && isYouTubeProvider(player?.current?.provider)
            ? true
            : muted
        }
        keyShortcuts={keyboardShortcuts}
        onLoad={onLoad}
        onPlay={() => {
          onPlay?.();
        }}
        onCanPlay={() => {
          onReady?.();
        }}
        onProviderChange={onProviderChange}
        onWaiting={onPlayerWaiting}
      >
        <MediaProvider>
          {placeholderImage && (
            <Poster
              className="vds-poster"
              alt={videoTitle}
              src={placeholderImage as string}
            />
          )}
          {textTracks?.map((track) => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>
        <VideoLayout
          controls={controls}
          thumbnails={thumbnails}
          translations={translations}
        />
      </MediaPlayer>
    </VariableProvider>
  );
};
