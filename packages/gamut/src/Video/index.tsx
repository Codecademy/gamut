import { PlayIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';

import { Box, FlexBox } from '../Box';
import { useIsMounted } from '../utils';

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
    >
      <PlayIcon
        width="15%"
        height="26.7%"
        minWidth="75px"
        minHeight="75px"
        color="white"
      />
    </FlexBox>
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
  onReady?: (player: ReactPlayerWithWrapper) => void;
  placeholderImage?: string | boolean;
  videoTitle?: string;
  videoUrl: string;
  width?: number;
};

export const Video: React.FC<VideoProps> = ({
  autoplay,
  controls,
  height,
  loop,
  muted,
  onPlay,
  onReady,
  placeholderImage,
  videoTitle,
  videoUrl,
  width,
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

  return (
    <Box
      position="relative"
      width="100%"
      pt={'56.25%' as any}
      borderRadius="md"
      overflow="hidden"
      bg={loading ? 'black' : undefined}
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
          url={videoUrl}
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
};
