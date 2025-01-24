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
import cx from 'classnames';
import React from 'react';

import { VideoProps } from '..';
import styles from '../styles/index.module.scss';
import { keyboardShortcuts } from './utils/keyboardShortcuts';
import { vdsVariables } from './utils/variables';
import { VideoLayout } from './VideoLayout';

const VariableProvider = styled('div', styledOptions(['variables']))<{
  variables?: CSSObject;
}>(({ variables }) => variables, { width: '100%' });

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
}) => {
  const player = React.useRef<MediaPlayerInstance>(null);

  return (
    <VariableProvider
      variables={vdsVariables}
      className={cx(styles.vdsWrapper, className)}
      style={{ width, height }}
    >
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
        onCanPlay={() => {
          if (player?.current) onReady?.(player.current);
        }}
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
