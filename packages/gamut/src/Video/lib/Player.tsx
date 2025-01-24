/* eslint-disable gamut/no-css-standalone */
import '../styles/vds_base_theme.scss';

import { styledOptions } from '@codecademy/gamut-styles';
import styled, { CSSObject } from '@emotion/styled';
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  Track,
} from '@vidstack/react';
import React from 'react';

import { VideoProps } from '..';
import { keyboardShortcuts } from './utils/keyboardShortcuts';
import { vdsVariables } from './utils/variables';
import { VideoLayout } from './VideoLayout';

const VariableProvider = styled(
  'div',
  styledOptions(['variables'])
)<{ variables?: CSSObject }>(({ variables }) => variables);

type PlayerProps = VideoProps & {
  onLoad: () => void;
};

export const Player: React.FC<PlayerProps> = ({
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
}) => {
  const player = React.useRef<MediaPlayerInstance>(null);

  return (
    <VariableProvider variables={vdsVariables}>
      <MediaPlayer
        title={videoTitle}
        src={videoUrl}
        playsInline
        ref={player}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        onLoad={onLoad}
        onPlay={onPlay}
        onCanPlay={onReady}
        keyShortcuts={keyboardShortcuts}
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
