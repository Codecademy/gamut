/* eslint-disable gamut/no-css-standalone */
import '../styles/vds_base_theme.scss';

import { styledOptions } from '@codecademy/gamut-styles';
import styled, { CSSObject } from '@emotion/styled';
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Track,
  useMediaState,
} from '@vidstack/react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { Box } from '../../Box';
import { AudioHandle, AudioProps } from '..';
import { AudioLayout } from './AudioLayout';
import { keyboardShortcuts } from './utils/constants';
import { vdsVariables } from './utils/variables';

const VariableProvider = styled(Box, styledOptions(['variables']))<{
  variables?: CSSObject;
}>(({ variables }) => variables, {
  width: '100%',
  position: 'relative',
  // Pin the Vidstack player to the full wrapper width. Left to itself it sizes to
  // its content, so the control bar's width changes between play/pause states and
  // the whole card visibly jerks in a wide container.
  '& media-player': { width: '100%', maxWidth: '100%' },
});

export const VidstackAudioPlayer = forwardRef<AudioHandle, AudioProps>(
  (
    {
      autoplay = false,
      controls = true,
      loop = false,
      muted = false,
      onPlay,
      onReady,
      onTimeUpdate,
      audioTitle,
      audioUrl,
      textTracks,
      translations,
      width,
      height,
      className,
      showDefaultProviderControls = false,
    },
    ref
  ) => {
    const player = useRef<MediaPlayerInstance>(null);
    const currentTime = useMediaState('currentTime', player);

    // Fire only when the media time changes (not when the callback's identity does).
    const onTimeUpdateRef = useRef(onTimeUpdate);
    onTimeUpdateRef.current = onTimeUpdate;
    useEffect(() => {
      onTimeUpdateRef.current?.(currentTime);
    }, [currentTime]);

    useImperativeHandle(ref, () => ({
      seek: (seconds: number) => {
        if (player.current) player.current.currentTime = seconds;
      },
    }));

    return (
      <VariableProvider
        className={className}
        // eslint-disable-next-line gamut/no-inline-style
        style={{ width, height }}
        variables={vdsVariables}
      >
        <MediaPlayer
          autoPlay={autoplay}
          controls={showDefaultProviderControls}
          keyShortcuts={keyboardShortcuts}
          loop={loop}
          muted={muted}
          ref={player}
          src={audioUrl}
          title={audioTitle}
          viewType="audio"
          onCanPlay={onReady}
          onPlay={onPlay}
        >
          <MediaProvider>
            {textTracks?.map((track) => (
              <Track {...track} key={track.src} />
            ))}
          </MediaProvider>
          <AudioLayout controls={controls} translations={translations} />
        </MediaPlayer>
      </VariableProvider>
    );
  }
);

VidstackAudioPlayer.displayName = 'VidstackAudioPlayer';
