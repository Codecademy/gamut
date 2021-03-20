import { PlayIcon } from '@codecademy/gamut-icons';
import { pxRem, timing } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import { Anchor } from '../Anchor';
import { Box } from '../Box';

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

const ApspectRatio = styled(Box)<{ ratio: `${number}:${number}` }>`
  position: relative;
  width: 100%;
  padding-top: ${({ ratio }) => {
    const [w, h] = ratio.split(':');
    return `${(parseInt(h, 10) / parseInt(w, 10)) * 100}%`;
  }};

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const LoadingWall = styled(Box)<{ loaded: boolean }>`
  opacity: ${({ loaded }) => (loaded ? 0 : 1)};
  pointer-events: none;
  transition: opacity ${timing.fast} ease;
`;

const PlayerShroud = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: inherit;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const PlayButton = styled(Anchor)`
  width: 15%;
  height: 26.7%;
  min-width: ${pxRem(75)};
  min-height: ${pxRem(75)};
`.withComponent(PlayIcon);

export const Video: React.FC<VideoProps> = ({
  videoUrl,
  videoTitle,
  placeholderImage,
  autoplay,
  controls,
  loop,
  muted,
  onReady,
  onPlay,
  ...rest
}) => {
  const [initialized, setInitialized] = useState(Boolean(placeholderImage));
  const [loaded, setLoaded] = useState(false);
  const fadeIn = Boolean(
    (initialized && placeholderImage) || !placeholderImage
  );
  return (
    <ApspectRatio ratio="16:9" {...rest} textColor="white">
      <Box zIndex={placeholderImage && initialized ? 1 : 0}>
        <ReactPlayer
          width="100%"
          height="100%"
          url={videoUrl}
          light={placeholderImage}
          title={videoTitle}
          playing={autoplay}
          controls={controls === undefined || controls}
          loop={loop}
          muted={muted}
          playIcon={
            <PlayerShroud>
              <PlayButton mode="dark" />
            </PlayerShroud>
          }
          onReady={(player: ReactPlayerWithWrapper) => {
            onReady?.(player);
            setLoaded(true);
          }}
          onPlay={() => {
            setInitialized(true);
            onPlay?.();
          }}
        />
      </Box>
      {fadeIn && <LoadingWall loaded={loaded} backgroundColor="black" />}
    </ApspectRatio>
  );
};
